import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import { bookmarks } from '../store/bookmarks';
import { NewsItem } from '../data/mockData';

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
  const [bookmarkUpdateKey, setBookmarkUpdateKey] = useState(0); // Force re-render on bookmark changes

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

        {/* Stock Watch */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>STOCK WATCH</Text>
          {insightFeed.map((item) => {
            // Convert InsightItem to NewsItem format for bookmarking
            const newsItem: NewsItem = {
              title: `${item.companyName} - ${item.ticker}`,
              summary: item.description,
              stock: item.ticker,
              sector: item.companyName,
              tag: item.tag,
              source: 'Stock Vibe',
              time: 'Just now',
            };
            
            return (
              <Pressable 
                key={item.id} 
                style={[styles.insightCard, { backgroundColor: theme.colors.surface }]}
                onPress={() => {
                  navigation.navigate('StockDetail', { stock: item.ticker });
                }}
              >
                <View style={styles.insightHeader}>
                  <View style={styles.insightHeaderLeft}>
                    <View style={styles.headingRow}>
                      <Text style={[styles.companyName, { color: theme.colors.textPrimary }]}>{item.companyName}</Text>
                      <View style={[styles.newTag, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.newTagText}>NEW</Text>
                      </View>
                    </View>
                    <Text style={[styles.ticker, { color: theme.colors.textSecondary }]}>{item.ticker}</Text>
                  </View>
                  <Pressable 
                    onPress={(e) => {
                      e.stopPropagation();
                      bookmarks.toggle(newsItem);
                      setBookmarkUpdateKey(prev => prev + 1); // Force re-render
                    }}
                    style={styles.bookmarkButton}
                  >
                    <BookmarkIcon 
                      color={bookmarks.isBookmarked(newsItem) ? theme.colors.primary : theme.colors.textSecondary} 
                      size={12} 
                    />
                  </Pressable>
                </View>
                <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{item.description}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Sector Watch */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>SECTOR WATCH</Text>
          {sectorWatch.map((item) => {
            // Convert SectorItem to NewsItem format for bookmarking
            const newsItem: NewsItem = {
              title: item.sectorName,
              summary: item.description,
              stock: '',
              sector: item.sectorName,
              tag: item.tag,
              source: 'Stock Vibe',
              time: 'Just now',
            };
            
            return (
              <Pressable 
                key={item.id} 
                style={[styles.sectorCard, { backgroundColor: theme.colors.surface }]}
                onPress={() => {
                  navigation.navigate('SectorDetail', { sector: item.sectorName });
                }}
              >
                <View style={styles.sectorHeader}>
                  <View style={styles.headingRow}>
                    <Text style={[styles.sectorName, { color: theme.colors.textPrimary }]}>{item.sectorName}</Text>
                    <View style={[styles.newTag, { backgroundColor: theme.colors.primary }]}>
                      <Text style={styles.newTagText}>NEW</Text>
                    </View>
                  </View>
                  <Pressable 
                    onPress={(e) => {
                      e.stopPropagation();
                      bookmarks.toggle(newsItem);
                      setBookmarkUpdateKey(prev => prev + 1); // Force re-render
                    }}
                    style={styles.bookmarkButton}
                  >
                    <BookmarkIcon 
                      color={bookmarks.isBookmarked(newsItem) ? theme.colors.primary : theme.colors.textSecondary} 
                      size={12} 
                    />
                  </Pressable>
                </View>
                <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{item.description}</Text>
              </Pressable>
            );
          })}
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
  insightHeaderLeft: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  ticker: {
    fontSize: 12,
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
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  sectorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookmarkButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  newTag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
