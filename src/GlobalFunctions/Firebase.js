import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';

// Note: Firebase is auto-initialized from google-services.json (Android) / GoogleService-Info.plist (iOS)
// No need to call firebase.initializeApp() manually

export async function requestUserPermission() {
  try {
    if (Platform.OS === 'android') {
      // Request Android notification permission (Android 13+)
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
          return false;
        }
      }
    }

    // Request Firebase messaging permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    return enabled;
  } catch (error) {
    console.log('Error requesting permission:', error);
    return false;
  }
}

// -------------------- FCM Token --------------------
export async function getFcmToken() {
  try {
    // Request permission first
    const hasPermission = await requestUserPermission();
    if (!hasPermission) {
      console.log('FCM permission not granted');
      return null;
    }

    // Get FCM token
    const fcmToken = await messaging().getToken();
    console.log('FCM Token retrieved:', fcmToken);

    if (fcmToken) {
      return fcmToken;
    } else {
      console.log('No FCM token available');
      return null;
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
    return null;
  }
}
