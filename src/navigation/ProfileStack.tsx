import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OnboardingStocks from '../screens/onboarding/OnboardingStocks';
import OnboardingSectors from '../screens/onboarding/OnboardingSectors';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          color: theme.colors.textPrimary,
          fontWeight: '600',
        },
        headerBackTitleVisible: false,
        headerBackTitle: '',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="ProfileHome" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="OnboardingStocks" 
        component={OnboardingStocks}
        options={{ 
          headerShown: true, 
          title: 'Followed Stocks',
        }}
      />
      <Stack.Screen 
        name="OnboardingSectors" 
        component={OnboardingSectors}
        options={{ 
          headerShown: true, 
          title: 'Followed Sectors',
        }}
      />
    </Stack.Navigator>
  );
}

