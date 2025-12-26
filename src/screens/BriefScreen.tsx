import { useState, useMemo } from 'react';
import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';
import Screen from '../components/Screen';
import NewsCard from '../components/NewsCard';
import { newsData } from '../data/mockData';
import { colors, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

type FilterType = 'All' | 'Risk' | 'Opportunity' | 'Neutral';

export default function BriefScreen() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<FilterType>('All');

  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${dayName}, ${month} ${day}`;
  };

  const filteredData = useMemo(() => {
    if (filter === 'All') {
      return newsData;
    }
    return newsData.filter(item => item.tag === filter);
  }, [filter]);

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

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={[styles.checkmarkCircle, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
      </View>
      <Text style={[styles.footerTitle, { color: theme.colors.textPrimary }]}>You're all caught up</Text>
      <Text style={[styles.footerSubtitle, { color: theme.colors.textSecondary }]}>Check back tomorrow for the next briefing.</Text>
    </View>
  );

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.colors.textPrimary }]}>Today's Brief</Text>
        <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{getCurrentDate()}</Text>
      </View>

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
        data={filteredData}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <NewsCard item={item} />}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 14,
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
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg * 2,
  },
  checkmarkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  checkmark: {
    fontSize: 24,
    fontWeight: '600',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  footerSubtitle: {
    fontSize: 14,
  },
});
