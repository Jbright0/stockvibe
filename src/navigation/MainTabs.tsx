import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BriefStack from './BriefStack';
import SavedStack from './SavedStack';
import ProfileStack from './ProfileStack';
import BriefIcon from '../components/icons/BriefIcon';
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
          if (route.name === 'Brief') {
            return <BriefIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          } else if (route.name === 'Saved') {
            return <BookmarkIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          } else if (route.name === 'Profile') {
            return <ProfileIcon color={focused ? theme.colors.primary : theme.colors.textSecondary} size={24} />;
          }
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '400',
        },
      })}
    >
      <Tab.Screen name="Brief" component={BriefStack} />
      <Tab.Screen name="Saved" component={SavedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

