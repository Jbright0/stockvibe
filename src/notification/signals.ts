import * as Notifications from 'expo-notifications';

export async function triggerSignalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Stock Vibe Signal',
      body: 'New long-term opportunity detected in Technology sector.',
    },
    trigger: null, // immediate (simulation)
  });
}
