import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';
import SplashScreen from '../screens/SplashScreen';
import { checkAuthStatus } from '../utils/auth';

export default function RootNavigator() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkOnboarding = async () => {
    const value = await AsyncStorage.getItem('onboarding_complete');
    const isOnboarded = value === 'true';
    setOnboarded(isOnboarded);
    return isOnboarded;
  };

  const checkAuth = async () => {
    const isAuthenticated = await checkAuthStatus();
    setAuthenticated(isAuthenticated);
    return isAuthenticated;
  };

  const initialize = async () => {
    const isOnboarded = await checkOnboarding();
    
    // Only check auth if user has completed onboarding
    if (isOnboarded) {
      await checkAuth();
    }
    
    setReady(true);
  };

  useEffect(() => {
    initialize();
    
    // Check onboarding and auth status periodically to catch updates
    intervalRef.current = setInterval(async () => {
      const isOnboarded = await checkOnboarding();
      if (isOnboarded) {
        // Check auth status for returning users
        await checkAuth();
        // Keep interval running to catch auth changes (login/register)
      }
    }, 500);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!ready) return <SplashScreen />;

  return (
    <NavigationContainer>
      {onboarded ? (
        // Returning user flow: Check authentication
        authenticated ? <MainTabs /> : <AuthNavigator />
      ) : (
        // First-run user flow: Show onboarding
        <OnboardingNavigator />
      )}
    </NavigationContainer>
  );
}
