import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BriefScreen from '../screens/BriefScreen';
import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BriefIcon from '../components/icons/BriefIcon';
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
          if (route.name === 'Brief') {
            return <BriefIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          } else if (route.name === 'Explore') {
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
      <Tab.Screen name="Brief" component={BriefScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

