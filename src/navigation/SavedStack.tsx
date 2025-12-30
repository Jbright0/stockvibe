import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedScreen from '../screens/SavedScreen';
import InsightScreen from '../screens/InsightScreen';
import StockWatchScreen from '../screens/StockWatchScreen';
import SectorWatchScreen from '../screens/SectorWatchScreen';
import { useTheme } from '../theme/ThemeContext';
import CustomBackButton from '../components/CustomBackButton';

const Stack = createNativeStackNavigator();

export default function SavedStack() {
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
        name="SavedHome"
        component={SavedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insight"
        component={InsightScreen}
        options={{ 
          title: 'Insight',
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen 
        name="StockWatch" 
        component={StockWatchScreen}
        options={{ 
          title: 'Stock History',
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen 
        name="SectorWatch" 
        component={SectorWatchScreen}
        options={{ 
          title: 'Sector History',
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack.Navigator>
  );
}

