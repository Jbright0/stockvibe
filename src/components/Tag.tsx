import { Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/tokens';

export default function Tag({ label }: { label: string }) {
  return <Text style={styles.tag}>{label}</Text>;
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    fontSize: 12,
    color: colors.text,
  },
});

