import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreStack from './ExploreStack';
import SavedStack from './SavedStack';
import ProfileStack from './ProfileStack';
import HomeIcon from '../components/icons/HomeIcon';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import ProfileIcon from '../components/icons/ProfileIcon';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
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
      <Tab.Screen name="Home" component={ExploreStack} />
      <Tab.Screen name="Saved" component={SavedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

