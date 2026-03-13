import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';
import {HeadlessTask} from './src/services/LocationService';

// Register BackgroundFetch HeadlessTask (Android)
BackgroundFetch.registerHeadlessTask(HeadlessTask);

// Notifee background event listener
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('[Notifee] Background Event:', type, detail);
});

// FCM background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM] Background Message:', remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || remoteMessage.data?.title || 'Notification',
    body: remoteMessage.notification?.body || remoteMessage.data?.body || '',
    android: {channelId: 'default', pressAction: {id: 'default'}},
  });
});

AppRegistry.registerComponent(appName, () => App);