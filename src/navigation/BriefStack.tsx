import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BriefScreen from '../screens/BriefScreen';
import InsightScreen from '../screens/InsightScreen';
import StockDetailScreen from '../screens/StockDetailScreen';
import SectorDetailScreen from '../screens/SectorDetailScreen';
import { useTheme } from '../theme/ThemeContext';
import CustomBackButton from '../components/CustomBackButton';

const Stack = createNativeStackNavigator();

export default function BriefStack() {
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
        name="BriefHome"
        component={BriefScreen}
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
        name="StockDetail" 
        component={StockDetailScreen}
        options={{ 
          title: 'Stock History',
          headerLeft: () => <CustomBackButton />,
        }}
      />
      <Stack.Screen 
        name="SectorDetail" 
        component={SectorDetailScreen}
        options={{ 
          title: 'Sector History',
          headerLeft: () => <CustomBackButton />,
        }}
      />
    </Stack.Navigator>
  );
}
