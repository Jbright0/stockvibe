import { useState, useMemo } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';
import { colors, spacing, radius, darkTheme } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

type FilterType = 'All' | 'Risk' | 'Opportunity' | 'Neutral';

interface RelatedNewsItem {
  date: string;
  tag: 'Risk' | 'Opportunity' | 'Neutral';
  headline: string;
  summary: string;
}

export default function StockDetailScreen() {
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { stock } = route.params;
  const [filter, setFilter] = useState<FilterType>('All');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock stock data
  const stockData: Record<string, { name: string; categories: string[] }> = {
    AAPL: {
      name: 'Apple Inc.',
      categories: ['Consumer Electronics', 'USA', 'Mega Cap'],
    },
    MSFT: {
      name: 'Microsoft Corporation',
      categories: ['Software', 'USA', 'Mega Cap'],
    },
    TSLA: {
      name: 'Tesla, Inc.',
      categories: ['Automotive', 'USA', 'Large Cap'],
    },
    NVDA: {
      name: 'NVIDIA Corporation',
      categories: ['Semiconductors', 'USA', 'Large Cap'],
    },
  };

  const currentStock = stockData[stock] || {
    name: `${stock} Corporation`,
    categories: ['Technology', 'USA', 'Large Cap'],
  };

  // Mock related news data
  const relatedNews: RelatedNewsItem[] = [
    {
      date: 'OCT 12, 2023',
      tag: 'Risk',
      headline: 'Supply chain constraints reported in SE Asia assembly hubs',
      summary: 'Production forecasts for the upcoming quarter have been lowered by 5% due to component shortages affecting key assembly partners in Vietnam and India.',
    },
    {
      date: 'SEP 28, 2023',
      tag: 'Opportunity',
      headline: 'Services revenue surpasses expectations in Q3',
      summary: 'The services division continues to show double-digit growth, reducing reliance on hardware cycles and improving overall gross margins significantly.',
    },
    {
      date: 'SEP 15, 2023',
      tag: 'Neutral',
      headline: 'Executive leadership changes announced for 2024',
      summary: 'Long-time hardware chief is set to retire. The transition plan appears stable with an internal promotion filling the role, signaling continuity.',
    },
    {
      date: 'AUG 04, 2023',
      tag: 'Opportunity',
      headline: 'Strategic partnership with AI chip manufacturer',
      summary: 'A multi-year agreement secures priority access to next-gen silicon, potentially accelerating the roadmap for upcoming vision products.',
    },
  ];

  const filteredNews = useMemo(() => {
    if (filter === 'All') {
      return relatedNews;
    }
    return relatedNews.filter(item => item.tag === filter);
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

  return (
    <>
      <StatusBar style={theme.colors.background === darkTheme.colors.background ? 'light' : 'dark'} />
      {Platform.OS === 'android' && (
        <RNStatusBar backgroundColor={theme.colors.background} barStyle={theme.colors.background === darkTheme.colors.background ? 'light-content' : 'dark-content'} />
      )}
      <Screen>
        <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.stockInfo}>
            <Text style={[styles.ticker, { color: theme.colors.textPrimary }]}>{stock}</Text>
            <Text style={[styles.companyName, { color: theme.colors.textPrimary }]}>{currentStock.name}</Text>
          </View>
          <Pressable
            style={[
              styles.followButton,
              { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
              isFollowing && { backgroundColor: theme.colors.textPrimary, borderColor: theme.colors.textPrimary }
            ]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[styles.followText, { color: theme.colors.textPrimary }, isFollowing && { color: '#FFFFFF' }]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
            <Text style={[styles.plusIcon, { color: theme.colors.textPrimary }, isFollowing && { color: '#FFFFFF' }]}>
              {isFollowing ? '✓' : '+'}
            </Text>
          </Pressable>
        </View>

        {/* Category Tags */}
        <View style={styles.categoriesContainer}>
          {currentStock.categories.map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={[styles.categoryText, { color: theme.colors.textPrimary }]}>{category}</Text>
            </View>
          ))}
        </View>

        {/* Related Developments Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Related Developments</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Qualitative decision memory</Text>

          {/* Filter Buttons */}
          <View style={styles.filtersContainer}>
            {(['All', 'Opportunity', 'Risk', 'Neutral'] as FilterType[]).map((tag) => {
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

          {/* News Items List */}
          <View style={styles.newsList}>
            {filteredNews.map((item, index) => (
              <View key={index} style={styles.newsItem}>
                <View style={styles.newsItemContent}>
                  <View style={styles.timelineIndicator} />
                  <View style={styles.newsItemText}>
                    <View style={styles.newsHeader}>
                      <Text style={[styles.newsDate, { color: theme.colors.textSecondary }]}>{item.date}</Text>
                      <View style={[styles.newsTag, { backgroundColor: getTagColor(item.tag) }]}>
                        <Text style={[styles.newsTagText, { color: getTagTextColor(item.tag) }]}>{item.tag}</Text>
                      </View>
                    </View>
                    <Text style={[styles.newsHeadline, { color: theme.colors.textPrimary }]}>{item.headline}</Text>
                    <Text style={[styles.newsSummary, { color: theme.colors.textPrimary }]}>{item.summary}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stockInfo: {
    flex: 1,
  },
  ticker: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '400',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  followText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: spacing.xs,
  },
  plusIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  categoryTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.card,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: spacing.md,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
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
  newsList: {
    marginLeft: spacing.md,
  },
  newsItem: {
    marginBottom: spacing.lg,
  },
  newsItemContent: {
    flexDirection: 'row',
  },
  timelineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.muted,
    marginRight: spacing.md,
    marginTop: spacing.xs,
  },
  newsItemText: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  newsDate: {
    fontSize: 12,
    color: colors.muted,
  },
  newsTag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newsTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  newsHeadline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  newsSummary: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
