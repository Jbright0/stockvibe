import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_AUTHENTICATED = 'user_authenticated';

export async function checkAuthStatus(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(USER_AUTHENTICATED);
    return value === 'true';
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

export async function setAuthenticated(value: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_AUTHENTICATED, value.toString());
  } catch (error) {
    console.error('Error setting auth status:', error);
  }
}

export async function clearAuth(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_AUTHENTICATED);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
}

