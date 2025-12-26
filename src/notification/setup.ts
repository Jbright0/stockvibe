import * as Notifications from 'expo-notifications';

export async function registerForNotifications() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}
