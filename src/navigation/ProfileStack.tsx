import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OnboardingStocks from '../screens/onboarding/OnboardingStocks';
import OnboardingSectors from '../screens/onboarding/OnboardingSectors';
import { useTheme } from '../theme/ThemeContext';
import CustomBackButton from '../components/CustomBackButton';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
          height: 30,
        },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: {
          color: theme.colors.textPrimary,
          fontWeight: '600',
          fontSize: 14,
        },
        headerBackTitle: '',
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      } as any}
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
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen 
        name="OnboardingSectors" 
        component={OnboardingSectors}
        options={{ 
          headerShown: true, 
          title: 'Followed Sectors',
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack.Navigator>
  );
}

