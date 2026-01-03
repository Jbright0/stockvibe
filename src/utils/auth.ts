import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth.service';

const USER_AUTHENTICATED = 'user_authenticated';

export async function checkAuthStatus(): Promise<boolean> {
  try {
    // Check if we have a valid token
    return await authService.isAuthenticated();
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

export async function setAuthenticated(value: boolean): Promise<void> {
  try {
    // This is kept for backward compatibility
    // The actual auth state is managed by token storage in authService
    await AsyncStorage.setItem(USER_AUTHENTICATED, value.toString());
  } catch (error) {
    console.error('Error setting auth status:', error);
  }
}

export async function clearAuth(): Promise<void> {
  try {
    await authService.logout();
    await AsyncStorage.removeItem(USER_AUTHENTICATED);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
}

