import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';
import {Platform} from 'react-native';

let isBackgroundFetchInitialized = false;
let locationWatcherId = null;

// Setup Notifee channel
export const setupNotifications = async () => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default', // MUST match FCM handlers
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  console.log('[Notifee] Channel created:', channelId);
  return channelId;
};

// Notification hash helper
const getNotificationHash = (title, body) => {
  const str = `${title}::${body}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `notif_${hash}`;
};

const DUPLICATE_WINDOW_MS = 10 * 1000; // 10s dedup window — increase to 2-5 min in production

const shouldDisplayNotification = async hash => {
  try {
    const raw = await AsyncStorage.getItem('sent_notifications');
    const list = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const fresh = list.filter(entry => now - entry.ts < DUPLICATE_WINDOW_MS);
    const exists = fresh.some(entry => entry.hash === hash);
    if (exists) return false;
    fresh.push({hash, ts: now});
    await AsyncStorage.setItem('sent_notifications', JSON.stringify(fresh));
    return true;
  } catch (err) {
    console.log('[LocationService] shouldDisplayNotification error:', err);
    return true;
  }
};

// ─── Core API call — accepts real GPS coords ──────────────────────────────────
export const sendLocationUpdate = async (latitude, longitude) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.log('[LocationService] No auth token — skipping');
      return;
    }

    console.log(
      `[LocationService] Sending location: ${latitude}, ${longitude}`,
    );

    const response = await axios.post(
      'https://postup.apiforapp.link/api/notifications/notifyUserForNearbyPlaces',
      JSON.stringify({latitude, longitude}),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      },
    );

    console.log(
      '[LocationService] API Response:',
      JSON.stringify(response.data),
    );

    const notifications = response?.data?.notifications;
    if (!notifications?.length) {
      console.log('[LocationService] No notifications in response');
      return;
    }

    for (const notification of notifications) {
      const title = notification.title || 'PostUp Notification';
      const body = notification.message || notification.body || '';
      const hashId = getNotificationHash(title, body);

      const ok = await shouldDisplayNotification(hashId);
      if (!ok) {
        console.log('[LocationService] Skipping duplicate:', title);
        continue;
      }

      await notifee.displayNotification({
        id: hashId,
        title,
        body,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          largeIcon: 'ic_launcher',
          pressAction: {id: 'default'},
        },
        ios: {sound: 'default'},
      });
    }
  } catch (err) {
    console.log(
      '[LocationService] sendLocationUpdate error:',
      err?.message || err,
    );
  }
};

// ─── Get a one-shot GPS fix then call the API ─────────────────────────────────
// Used by BackgroundFetch callbacks (background + killed state)
const fetchLocationAndNotify = () =>
  new Promise(resolve => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        await sendLocationUpdate(latitude, longitude);
        resolve();
      },
      err => {
        console.log('[LocationService] getCurrentPosition error:', err.message);
        resolve();
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: false,
      },
    );
  });

// ─── watchPosition — fires on real movement (foreground + background) ─────────
export const startLocationWatcher = () => {
  if (locationWatcherId !== null) {
    console.log('[LocationService] Watcher already running');
    return;
  }

  locationWatcherId = Geolocation.watchPosition(
    async position => {
      const {latitude, longitude} = position.coords;
      console.log(
        `[LocationService] Position changed: ${latitude}, ${longitude}`,
      );
      await sendLocationUpdate(latitude, longitude);
    },
    err => {
      console.log('[LocationService] watchPosition error:', err.message);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // TEST: 10m — change to 50-100m in production
      interval: 10000, // Android: poll every 10s at most
      fastestInterval: 5000, // Android: fastest possible update
      forceRequestLocation: true,
      showLocationDialog: false,
    },
  );

  console.log(
    '[LocationService] Location watcher started, id:',
    locationWatcherId,
  );
};

export const stopLocationWatcher = () => {
  if (locationWatcherId !== null) {
    Geolocation.clearWatch(locationWatcherId);
    locationWatcherId = null;
    console.log('[LocationService] Location watcher stopped');
  }
};

// ─── BackgroundFetch — handles background + killed state ──────────────────────
export const initBackgroundFetch = async () => {
  if (isBackgroundFetchInitialized) return;
  console.log('[LocationService] Initializing BackgroundFetch...');

  try {
    // Fire once immediately on login
    await fetchLocationAndNotify();

    const status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // OS minimum — 15 min; used when killed
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      },
      async taskId => {
        console.log('[BackgroundFetch] Task fired:', taskId);
        await fetchLocationAndNotify();
        BackgroundFetch.finish(taskId);
      },
      taskId => {
        console.log('[BackgroundFetch] Timeout:', taskId);
        BackgroundFetch.finish(taskId);
      },
    );

    console.log('[BackgroundFetch] Status:', status);

    // Some versions of `react-native-background-fetch` don't expose
    // `requestPermission`. Guard the call to avoid a runtime TypeError.
    if (
      Platform.OS === 'android' &&
      typeof BackgroundFetch.requestPermission === 'function'
    ) {
      try {
        await BackgroundFetch.requestPermission();
      } catch (reqErr) {
        console.log('[BackgroundFetch] requestPermission error:', reqErr);
      }
    }

    await BackgroundFetch.start();
    isBackgroundFetchInitialized = true;
    console.log('[LocationService] BackgroundFetch initialized');
  } catch (error) {
    console.log('[LocationService] initBackgroundFetch error:', error);
  }
};

// ─── Headless task — called when app is killed ────────────────────────────────
export const HeadlessTask = async event => {
  const {taskId} = event;
  console.log('[BackgroundFetch HeadlessTask] start:', taskId);
  await fetchLocationAndNotify();
  BackgroundFetch.finish(taskId);
};

// ─── Stop everything on logout ────────────────────────────────────────────────
export const stopBackgroundFetch = () => {
  stopLocationWatcher();
  BackgroundFetch.stop();
  isBackgroundFetchInitialized = false;
  console.log('[LocationService] All location services stopped');
};
