import { SafeAreaView, View, StyleSheet } from 'react-native';
import { spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

export default function Screen({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
});
