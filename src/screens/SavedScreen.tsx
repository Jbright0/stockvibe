import { useState, useCallback, useMemo } from 'react';
import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import { bookmarks } from '../store/bookmarks';
import SavedCard from '../components/SavedCard';
import { colors, spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

type FilterType = 'All' | 'Stocks' | 'Sectors';

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

  const filteredItems = useMemo(() => {
    if (filter === 'All') {
      return bookmarkedItems;
    }
    if (filter === 'Stocks') {
      // Filter items that have a stock ticker
      return bookmarkedItems.filter(item => item.stock && item.stock.trim() !== '');
    }
    if (filter === 'Sectors') {
      // Filter items that have a sector
      return bookmarkedItems.filter(item => item.sector && item.sector.trim() !== '');
    }
    return bookmarkedItems;
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
        {(['All', 'Stocks', 'Sectors'] as FilterType[]).map((filterType) => {
          const isActive = filter === filterType;
          const isAll = filterType === 'All';
          
          return (
            <Pressable
              key={filterType}
              onPress={() => setFilter(filterType)}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isActive
                    ? (isAll ? theme.colors.primary : theme.colors.textPrimary)
                    : 'transparent',
                  borderColor: isAll ? theme.colors.primary : theme.colors.textPrimary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: isActive
                      ? (isAll ? '#FFFFFF' : '#FFFFFF')
                      : (isAll ? theme.colors.primary : theme.colors.textPrimary),
                  },
                ]}
              >
                {filterType}
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
    borderRadius: radius.sm,
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
