import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius } from '../theme/tokens';
import { bookmarks } from '../store/bookmarks';
import BookmarkIcon from './icons/BookmarkIcon';
import { useTheme } from '../theme/ThemeContext';

export default function SavedCard({ item }: any) {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Risk':
        return colors.risk;
      case 'Opportunity':
        return colors.oppty;
      case 'Neutral':
        return colors.neutral;
      default:
        return colors.neutral;
    }
  };

  const getTagTextColor = (tag: string) => {
    return tag === 'Opportunity' ? '#FFFFFF' : theme.colors.textPrimary;
  };

  const handleBookmarkPress = (e: any) => {
    e.stopPropagation();
    bookmarks.toggle(item);
  };

  // Format date from "2h ago" to "Oct 12" format
  const formatDate = () => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate() - Math.floor(Math.random() * 7); // Random day for variety
    return `${month} ${day}`;
  };

  // Mock read time
  const readTime = `${Math.floor(Math.random() * 10) + 3} min read`;

  return (
    <Pressable
      onPress={() => navigation.navigate('Insight', { item })}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.tagsContainer}>
            <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.tag) }]}>
              <Text style={[styles.tagText, { color: getTagTextColor(item.tag) }]}>
                {item.tag}
              </Text>
            </View>
            <Text style={[styles.sectorTag, { color: theme.colors.textSecondary }]}>{item.sector}</Text>
          </View>
          <Pressable onPress={handleBookmarkPress} style={styles.bookmark}>
            <BookmarkIcon color={theme.colors.textSecondary} size={20} />
          </Pressable>
        </View>

        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.title}</Text>
        <Text style={[styles.summary, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {item.summary}
        </Text>

        <View style={styles.footerRow}>
          <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>
            {item.source} • {formatDate()} • {readTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  tagBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectorTag: {
    fontSize: 12,
  },
  bookmark: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
  },
});

