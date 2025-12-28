import { useState, useCallback, useMemo } from 'react';
import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import { bookmarks } from '../store/bookmarks';
import SavedCard from '../components/SavedCard';
import { colors, spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

type FilterType = 'All' | 'Risk' | 'Opportunity' | 'Neutral';

export default function SavedScreen() {
  const { theme } = useTheme();
  const [bookmarkedItems, setBookmarkedItems] = useState(bookmarks.getAll());
  const [filter, setFilter] = useState<FilterType>('All');

  useFocusEffect(
    useCallback(() => {
      // Refresh bookmarks when screen comes into focus
      setBookmarkedItems([...bookmarks.getAll()]);
    }, [])
  );

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

  const filteredItems = useMemo(() => {
    if (filter === 'All') {
      return bookmarkedItems;
    }
    return bookmarkedItems.filter(item => item.tag === filter);
  }, [bookmarkedItems, filter]);

  if (bookmarkedItems.length === 0) {
    return (
      <Screen>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Saved</Text>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.textPrimary }]}>No saved articles yet</Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>Bookmark articles to view them here</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Saved</Text>

      {/* Filter Buttons */}
      <View style={styles.filtersContainer}>
        {(['All', 'Risk', 'Opportunity', 'Neutral'] as FilterType[]).map((tag) => {
          const isActive = filter === tag;
          const isAll = tag === 'All';
          
          return (
            <Pressable
              key={tag}
              onPress={() => setFilter(tag)}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isActive
                    ? (isAll ? theme.colors.primary : getTagColor(tag))
                    : 'transparent',
                  borderColor: isAll ? theme.colors.primary : getTagColor(tag),
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: isActive
                      ? (isAll ? '#FFFFFF' : getTagTextColor(tag))
                      : (isAll ? theme.colors.primary : getTagColor(tag)),
                  },
                ]}
              >
                {tag}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item, i) => `${item.title}-${item.stock}-${i}`}
        renderItem={({ item }) => <SavedCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    paddingTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.lg * 2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
  },
});
