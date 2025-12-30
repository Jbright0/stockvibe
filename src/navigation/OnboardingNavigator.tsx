import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import ChooseSectorScreen from '../screens/onboarding/ChooseSectorScreen';
import ChooseStocksScreen from '../screens/onboarding/ChooseStocksScreen';
import FreeMemberScreen from '../screens/onboarding/FreeMemberScreen';
import ProAddsScreen from '../screens/onboarding/ProAddsScreen';
import HowItWorksScreen from '../screens/onboarding/HowItWorksScreen';
import CreateAccountScreen from '../screens/onboarding/CreateAccountScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      {/* Step 1: Welcome Screen */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      {/* Step 2: Choose Your Intelligence Scope (selecting sector) */}
      <Stack.Screen name="ChooseSector" component={ChooseSectorScreen} />
      
      {/* Step 3: Choose Your Intelligence Scope (selecting stocks) */}
      <Stack.Screen name="ChooseStocks" component={ChooseStocksScreen} />
      
      {/* Step 4: What You Get as a Free Member */}
      <Stack.Screen name="FreeMember" component={FreeMemberScreen} />
      
      {/* Step 5: What Pro Adds */}
      <Stack.Screen name="ProAdds" component={ProAddsScreen} />
      
      {/* Step 6: How StockVibe Works */}
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} />
      
      {/* Step 7: Create Account (Sign up / Log in) */}
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

