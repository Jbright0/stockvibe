import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BriefScreen from '../screens/BriefScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import StockDetailScreen from '../screens/StockDetailScreen';
import SectorDetailScreen from '../screens/SectorDetailScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function BriefStack() {
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
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="BriefHome"
        component={BriefScreen}
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
        options={{ title: 'Stock Detail' }}
      />
      <Stack.Screen 
        name="SectorDetail" 
        component={SectorDetailScreen}
        options={{ title: 'Sector Detail' }}
      />
    </Stack.Navigator>
  );
}
