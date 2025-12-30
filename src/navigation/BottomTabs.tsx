import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ExploreIcon from '../components/icons/ExploreIcon';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <ExploreIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          } else if (route.name === 'Saved') {
            return <BookmarkIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          } else if (route.name === 'Profile') {
            return <ProfileIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          }
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={ExploreScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

