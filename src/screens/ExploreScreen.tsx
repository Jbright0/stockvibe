import { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import { spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import { bookmarks } from '../store/bookmarks';
import { NewsItem } from '../data/mockData';
import { userInterestsService } from '../services/userInterests.service';

interface ThematicCollection {
  id: string;
  title: string;
  subtitle: string;
  image: any; // ImageSourcePropType for require()
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
  const [followedStocks, setFollowedStocks] = useState<string[]>([]);
  const [followedSectors, setFollowedSectors] = useState<string[]>([]);

  // Mock data
  const thematicCollections: ThematicCollection[] = [
    {
      id: '1',
      title: 'Clean Energy',
      subtitle: 'Infrastructure & Renewables',
      image: require('../../assets/thematic/Clean Energy - Infrastructure & Renewables.webp'),
    },
    {
      id: '2',
      title: 'Aging',
      subtitle: 'Healthcare',
      image: require('../../assets/thematic/Aging - Healthcare.webp'),
    },
    {
      id: '3',
      title: 'Artificial Intelligence',
      subtitle: 'Tech & Automation',
      image: require('../../assets/thematic/Artificial Intelligence - Tech & Automation.webp'),
    },
    {
      id: '4',
      title: 'Digital Payments',
      subtitle: 'FinTech Revolution',
      image: require('../../assets/thematic/Digital Payments - FinTech Revolution.jpg'),
    },
    {
      id: '5',
      title: 'Electric Vehicles',
      subtitle: 'Mobility Transformation',
      image: require('../../assets/thematic/Electric Vehicles - Mobility Transformation.webp'),
    },
    {
      id: '6',
      title: 'Cloud Computing',
      subtitle: 'Enterprise Digitalization',
      image: require('../../assets/thematic/Cloud Computing - Enterprise Digitalization.jpg'),
    },
    {
      id: '7',
      title: 'Biotechnology',
      subtitle: 'Medical Innovation',
      image: require('../../assets/thematic/Biotechnology - Medical Innovation.webp'),
    },
    {
      id: '8',
      title: 'Cybersecurity',
      subtitle: 'Digital Defense',
      image: require('../../assets/thematic/Cybersecurity - Digital Defense.webp'),
    },
    {
      id: '9',
      title: 'E-Commerce',
      subtitle: 'Retail Evolution',
      image: require('../../assets/thematic/E-Commerce - Retail Evolution.jpg'),
    },
    {
      id: '10',
      title: 'Infrastructure',
      subtitle: 'Smart Cities & Transport',
      image: require('../../assets/thematic/Infrastructure - Smart Cities & Transport.jpg'),
    },
    {
      id: '11',
      title: 'Semiconductors',
      subtitle: 'Chip Manufacturing',
      image: require('../../assets/thematic/Semiconductors - Chip Manufacturing.webp'),
    },
    {
      id: '12',
      title: 'Sustainable Finance',
      subtitle: 'ESG Investing',
      image: require('../../assets/thematic/Sustainable Finance - ESG Investing.jpg'),
    },
    {
      id: '13',
      title: 'Defense',
      subtitle: 'Vehicle, UAV & Drones',
      image: require('../../assets/thematic/defense.jpg'),
    },
  ];

  // All available stocks (matching what users can select)
  const allStocks: InsightItem[] = [
    {
      id: '1',
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      tag: 'Opportunity',
      description: 'Strong services revenue growth and expanding market share in premium smartphone segment.',
    },
    {
      id: '2',
      companyName: 'Microsoft Corp.',
      ticker: 'MSFT',
      tag: 'Opportunity',
      description: 'AI integration across cloud services driving renewed enterprise adoption and revenue growth.',
    },
    {
      id: '3',
      companyName: 'Berkshire Hathaway',
      ticker: 'BRK.B',
      tag: 'Neutral',
      description: 'Diversified portfolio showing resilience, with insurance operations providing stable cash flow.',
    },
    {
      id: '4',
      companyName: 'Johnson & Johnson',
      ticker: 'JNJ',
      tag: 'Neutral',
      description: 'Healthcare division remains strong, with pharmaceutical pipeline showing promising developments.',
    },
    {
      id: '5',
      companyName: 'Alphabet Inc.',
      ticker: 'GOOGL',
      tag: 'Opportunity',
      description: 'Search advertising revenue stable, with cloud and AI initiatives gaining momentum.',
    },
    {
      id: '6',
      companyName: 'Amazon.com Inc.',
      ticker: 'AMZN',
      tag: 'Opportunity',
      description: 'AWS growth accelerating, e-commerce margins improving with logistics optimization.',
    },
  ];

  // All available sectors (matching what users can select)
  const allSectors: SectorItem[] = [
    {
      id: '1',
      sectorName: 'Technology',
      tag: 'Opportunity',
      description: 'AI and cloud computing driving renewed capital expenditure and enterprise software adoption.',
    },
    {
      id: '2',
      sectorName: 'Healthcare',
      tag: 'Neutral',
      description: 'Regulatory environment stable, with biotech innovation continuing to drive pipeline development.',
    },
    {
      id: '3',
      sectorName: 'Financial Services',
      tag: 'Neutral',
      description: 'Interest rate environment stabilizing, with credit quality remaining strong across major institutions.',
    },
    {
      id: '4',
      sectorName: 'Consumer Cyclical',
      tag: 'Risk',
      description: 'Consumer spending patterns shifting, with discretionary purchases showing signs of moderation.',
    },
    {
      id: '5',
      sectorName: 'Energy',
      tag: 'Neutral',
      description: 'Supply and demand dynamics balanced, with renewable energy transition continuing steadily.',
    },
    {
      id: '6',
      sectorName: 'Utilities',
      tag: 'Neutral',
      description: 'Regulated returns stable, with infrastructure investment supporting long-term growth.',
    },
    {
      id: '7',
      sectorName: 'Real Estate',
      tag: 'Risk',
      description: 'Commercial real estate facing headwinds from remote work trends and rising interest rates.',
    },
    {
      id: '8',
      sectorName: 'Industrials',
      tag: 'Neutral',
      description: 'Manufacturing activity steady, with supply chain normalization supporting operational efficiency.',
    },
  ];

  // Load user interests using service
  const loadUserInterests = useCallback(async () => {
    try {
      const interests = await userInterestsService.getInterests();
      setFollowedStocks(interests.stocks || []);
      setFollowedSectors(interests.sectors || []);
    } catch (error) {
      console.error('Error loading user interests:', error);
    }
  }, []);

  useEffect(() => {
    loadUserInterests();
  }, [loadUserInterests]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadUserInterests();
    }, [loadUserInterests])
  );

  // Filter stocks and sectors based on followed items
  const filteredInsightFeed = useMemo(() => {
    if (followedStocks.length === 0) return [];
    return allStocks.filter(item => followedStocks.includes(item.ticker));
  }, [followedStocks]);

  const filteredSectorWatch = useMemo(() => {
    if (followedSectors.length === 0) return [];
    return allSectors.filter(item => followedSectors.includes(item.sectorName));
  }, [followedSectors]);


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
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>THEMATIC COLLECTIONS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {thematicCollections.map((collection) => (
              <Pressable key={collection.id} style={[styles.collectionCard, { marginRight: spacing.md }]}>
                <View style={styles.collectionImageContainer}>
                  <Image 
                    source={collection.image} 
                    style={styles.collectionImage}
                    resizeMode="cover"
                  />
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
          {filteredInsightFeed.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>
                No followed stocks. Add stocks in Profile to see them here.
              </Text>
            </View>
          ) : (
            filteredInsightFeed.map((item) => {
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
                  navigation.navigate('StockWatch', { stock: item.ticker });
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
            })
          )}
        </View>

        {/* Sector Watch */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>SECTOR WATCH</Text>
          {filteredSectorWatch.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>
                No followed sectors. Add sectors in Profile to see them here.
              </Text>
            </View>
          ) : (
            filteredSectorWatch.map((item) => {
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
                  navigation.navigate('SectorWatch', { sector: item.sectorName });
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
            })
          )}
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
  },
  collectionImage: {
    width: '100%',
    height: '100%',
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
  emptyState: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
