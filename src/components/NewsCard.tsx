import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius } from '../theme/tokens';
import { bookmarks } from '../store/bookmarks';
import BookmarkIcon from './icons/BookmarkIcon';
import { useTheme } from '../theme/ThemeContext';

export default function NewsCard({ item }: any) {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.isBookmarked(item));

  useEffect(() => {
    setIsBookmarked(bookmarks.isBookmarked(item));
  }, [item]);

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
    const newBookmarkState = bookmarks.toggle(item);
    setIsBookmarked(newBookmarkState);
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('NewsDetail', { item })}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.leftHeader}>
            <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.tag) }]}>
              <Text style={[styles.tagText, { color: getTagTextColor(item.tag) }]}>
                {item.tag}
              </Text>
            </View>
            <Text style={[styles.ticker, { color: theme.colors.textPrimary }]}>{item.stock}</Text>
          </View>
          <Text style={[styles.sector, { color: theme.colors.textSecondary }]}>{item.sector}</Text>
        </View>

        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.title}</Text>
        <Text style={[styles.summary, { color: theme.colors.textSecondary }]}>{item.summary}</Text>

        <View style={styles.footerRow}>
          <Text style={[styles.source, { color: theme.colors.textSecondary }]}>
            {item.source} • {item.time}
          </Text>
          <Pressable onPress={handleBookmarkPress} style={styles.bookmark}>
            <BookmarkIcon 
              color={isBookmarked ? theme.colors.primary : theme.colors.textSecondary} 
              size={20} 
            />
          </Pressable>
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
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
  ticker: {
    fontSize: 12,
    fontWeight: '500',
  },
  sector: {
    fontSize: 12,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
  },
  bookmark: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
