import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETE = 'onboarding_complete';
const USER_INTERESTS = 'user_interests';

export async function getOnboardingStatus(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE);
    return value === 'true';
  } catch (error) {
    console.error('Error reading onboarding status:', error);
    return false;
  }
}

export async function setOnboardingCompleted(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE, 'true');
  } catch (error) {
    console.error('Error saving onboarding status:', error);
  }
}

export async function saveUserInterests(stocks: string[], sectors: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(
      USER_INTERESTS,
      JSON.stringify({ stocks, sectors })
    );
  } catch (error) {
    console.error('Error saving user interests:', error);
  }
}

export async function getUserInterests(): Promise<{ stocks: string[]; sectors: string[] } | null> {
  try {
    const value = await AsyncStorage.getItem(USER_INTERESTS);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error('Error reading user interests:', error);
    return null;
  }
}

