import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/tokens';
import Tag from './Tag';

export default function Card({ item }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>

      <View style={styles.tags}>
        <View style={styles.tagWrapper}>
          <Tag label={item.stock} />
        </View>
        <View style={styles.tagWrapper}>
          <Tag label={item.sector} />
        </View>
        <View style={styles.tagWrapper}>
          <Tag label={item.type} />
        </View>
      </View>

      <Text style={styles.meta}>{item.source} • {item.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  summary: { marginTop: spacing.xs, color: colors.muted },
  tags: { flexDirection: 'row', marginTop: spacing.sm },
  tagWrapper: { marginRight: spacing.xs },
  meta: { marginTop: spacing.sm, fontSize: 12, color: colors.muted },
});

