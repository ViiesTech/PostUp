import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Routes from './src/routes/Routes';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import Toast from './src/components/Toast';
import NoInternetBanner from './src/components/NoInternetBanner';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setupNotifications} from './src/services/LocationService';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {requestUserPermission} from './src/GlobalFunctions/Firebase';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {requestLocationPermission} from './src/config/Location';

GoogleSignin.configure({
  webClientId:
    '551548744324-vad6673s1althae8g0hgsoaid3nv9450.apps.googleusercontent.com',
  iosClientId:
    '551548744324-bap6bf1kjaoc84qlmog34339dfigbt0d.apps.googleusercontent.com',
  offlineAccess: true,
});

const App = () => {
  useEffect(() => {
    // hide nav bar when app loads
    SystemNavigationBar.stickyImmersive();
  }, []);
  useEffect(() => {
    const initApp = async () => {
      try {
        // Request location permission
        await requestLocationPermission();

        // Request notification permission
        await requestUserPermission();

        // Setup Notifee channel
        await setupNotifications();
      } catch (error) {
        console.log('[App] Init error:', error);
      }
    };

    initApp();
  }, []);

  useEffect(() => {
    // 🔥 Foreground Message Handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground FCM:', remoteMessage);

      await notifee.displayNotification({
        title: (remoteMessage.notification?.title ||
          remoteMessage.data?.title ||
          'Notification') as string,
        body: (remoteMessage.notification?.body ||
          remoteMessage.data?.body ||
          '') as string,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          largeIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // 🔥 Notification click listener (foreground)
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <Routes />
            <NoInternetBanner />
          </SafeAreaView>
        </NavigationContainer>
        <Toast position={'top'} />
      </PersistGate>
    </Provider>
  );
};

export default App;
