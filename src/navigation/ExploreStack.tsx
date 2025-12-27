import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/ExploreScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import StockDetailScreen from '../screens/StockDetailScreen';
import SectorDetailScreen from '../screens/SectorDetailScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
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
        name="ExploreHome"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ title: 'Insight' }}
      />
      <Stack.Screen 
        name="StockDetail" 
        component={StockDetailScreen}
        options={{ title: 'Stock History' }}
      />
      <Stack.Screen 
        name="SectorDetail" 
        component={SectorDetailScreen}
        options={{ title: 'Sector History' }}
      />
    </Stack.Navigator>
  );
}

