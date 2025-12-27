import { useState, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { colors, spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

type FilterType = 'All' | 'Risk' | 'Opportunity' | 'Neutral';

interface ThematicCollection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface InsightItem {
  id: string;
  companyName: string;
  ticker: string;
  tag: 'Opportunity' | 'Risk' | 'Neutral';
  description: string;
}

interface SectorItem {
  id: string;
  sectorName: string;
  tag: 'Opportunity' | 'Risk' | 'Neutral';
  description: string;
}

export default function ExploreScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('All');

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

  // Mock data
  const thematicCollections: ThematicCollection[] = [
    {
      id: '1',
      title: 'Clean Energy',
      subtitle: 'Infrastructure & Renewables',
      image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400',
    },
    {
      id: '2',
      title: 'Aging',
      subtitle: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    },
  ];

  const insightFeed: InsightItem[] = [
    {
      id: '1',
      companyName: 'ASML Holding',
      ticker: 'ASML',
      tag: 'Opportunity',
      description: 'Dominant market share in EUV lithography systems essential for advanced chipmaking capabilities globally.',
    },
    {
      id: '2',
      companyName: 'Consumer Staples Select',
      ticker: 'XLP',
      tag: 'Risk',
      description: 'Margin compression expected due to rising input costs and shifting consumer preference to generic brands.',
    },
    {
      id: '3',
      companyName: 'Global Copper',
      ticker: 'COPX',
      tag: 'Neutral',
      description: 'Demand remains steady, balanced by supply chain normalization in South American mining regions.',
    },
  ];

  const sectorWatch: SectorItem[] = [
    {
      id: '1',
      sectorName: 'Automotive',
      tag: 'Neutral',
      description: 'EV transition costs impacting short-term free cash flow across legacy OEMs.',
    },
    {
      id: '2',
      sectorName: 'Cloud Computing',
      tag: 'Opportunity',
      description: 'AI workload demand driving renewed capital expenditure in data center infrastructure.',
    },
    {
      id: '3',
      sectorName: 'Commercial Real Estate',
      tag: 'Risk',
      description: 'Office vacancy rates in major metropolitan areas continue to pressure valuations.',
    },
  ];

  const filteredInsights = useMemo(() => {
    if (filter === 'All') return insightFeed;
    return insightFeed.filter(item => item.tag === filter);
  }, [filter]);

  const filteredSectors = useMemo(() => {
    if (filter === 'All') return sectorWatch;
    return sectorWatch.filter(item => item.tag === filter);
  }, [filter]);

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { color: theme.colors.textPrimary }]}>Explore</Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.textPrimary }]}
            placeholder="Search companies or sectors..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

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

        {/* Thematic Collections */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>THEMATIC COLLECTIONS</Text>
            <Pressable>
              <Text style={[styles.viewAll, { color: theme.colors.primary }]}>View All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {thematicCollections.map((collection) => (
              <Pressable key={collection.id} style={[styles.collectionCard, { marginRight: spacing.md }]}>
                <View style={[styles.collectionImageContainer, { backgroundColor: theme.colors.surface }]}>
                  <Text style={styles.collectionImagePlaceholder}>🌍</Text>
                </View>
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionTitle}>{collection.title}</Text>
                  <Text style={styles.collectionSubtitle}>{collection.subtitle}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Insight Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>INSIGHT FEED</Text>
          {filteredInsights.map((item) => (
            <Pressable 
              key={item.id} 
              style={[styles.insightCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => {
                // Create a news item format for navigation
                const newsItem = {
                  title: item.description,
                  summary: item.description,
                  stock: item.ticker,
                  sector: item.companyName,
                  tag: item.tag,
                  source: 'Stock Vibe',
                  time: 'Just now',
                };
                navigation.navigate('NewsDetail', { item: newsItem });
              }}
            >
              <View style={styles.insightHeader}>
                <View>
                  <Text style={[styles.companyName, { color: theme.colors.textPrimary }]}>{item.companyName}</Text>
                  <Text style={[styles.ticker, { color: theme.colors.textSecondary }]}>{item.ticker}</Text>
                </View>
                <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.tag) }]}>
                  <Text style={[styles.tagText, { color: getTagTextColor(item.tag) }]}>
                    {item.tag}
                  </Text>
                </View>
              </View>
              <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{item.description}</Text>
            </Pressable>
          ))}
        </View>

        {/* Sector Watch */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>SECTOR WATCH</Text>
          {filteredSectors.map((item) => (
            <Pressable 
              key={item.id} 
              style={[styles.sectorCard, { backgroundColor: theme.colors.surface }]}
              onPress={() => {
                navigation.navigate('SectorDetail', { sector: item.sectorName });
              }}
            >
              <View style={styles.sectorHeader}>
                <Text style={[styles.sectorName, { color: theme.colors.textPrimary }]}>{item.sectorName}</Text>
                <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.tag) }]}>
                  <Text style={[styles.tagText, { color: getTagTextColor(item.tag) }]}>
                    {item.tag}
                  </Text>
                </View>
              </View>
              <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{item.description}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg * 2,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  viewAll: {
    fontSize: 12,
    fontWeight: '500',
  },
  horizontalScroll: {
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
  },
  collectionCard: {
    width: 200,
    height: 120,
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  collectionImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionImagePlaceholder: {
    fontSize: 48,
  },
  collectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  collectionSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  insightCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  ticker: {
    fontSize: 12,
  },
  tagBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectorCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  sectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectorName: {
    fontSize: 16,
    fontWeight: '600',
  },
});
