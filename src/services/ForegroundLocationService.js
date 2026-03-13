import BackgroundService from 'react-native-background-actions';
import {sendLocationUpdate} from './LocationService';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const task = async taskData => {
  const delay = taskData.delay || 10000;

  console.log('[ForegroundService] Running every', delay, 'ms');

  while (BackgroundService.isRunning()) {
    try {
      await sendLocationUpdate();
    } catch (err) {
      console.log('[ForegroundService] Error:', err);
    }

    await sleep(delay);
  }
};

export const startForegroundService = async (delayMs = 10000) => {
  const options = {
    taskName: 'PostUpLocationService',
    taskTitle: 'PostUp is running',
    taskDesc: 'Tracking location for nearby alerts',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    parameters: {
      delay: delayMs,
    },
  };

  const isRunning = await BackgroundService.isRunning();
  if (isRunning) {
    console.log('[ForegroundService] Already running');
    return;
  }

  await BackgroundService.start(task, options);
  console.log('[ForegroundService] Started');
};

export const stopForegroundService = async () => {
  const isRunning = await BackgroundService.isRunning();
  if (!isRunning) return;

  await BackgroundService.stop();
  console.log('[ForegroundService] Stopped');
};