import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import InterestScreen from '../screens/onboarding/InterestScreen';
import HowItWorksScreen from '../screens/onboarding/HowItWorksScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      {/* Step 1: Welcome Screen */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      {/* Step 2: Interest Selection (Stocks & Sectors) */}
      <Stack.Screen name="Interest" component={InterestScreen} />
      
      {/* Step 3: How It Works (Final onboarding screen) */}
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
    </Stack.Navigator>
  );
}

