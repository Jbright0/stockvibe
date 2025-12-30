import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Platform, StatusBar as RNStatusBar, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { colors, spacing, radius, darkTheme } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import { bookmarks } from '../store/bookmarks';
import { NewsItem } from '../data/mockData';
import { isProMember } from '../utils/membership';
import UpgradeToProModal from '../components/UpgradeToProModal';

interface RelatedNewsItem {
  date: string;
  tag: 'Risk' | 'Opportunity' | 'Neutral';
  headline: string;
  summary: string;
  source: string;
}

export default function StockWatchScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { stock } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isAISummaryCollapsed, setIsAISummaryCollapsed] = useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = useState<RelatedNewsItem | null>(null);
  const [bookmarkUpdateKey, setBookmarkUpdateKey] = useState(0);
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

  useEffect(() => {
    loadMembershipStatus();
  }, []);

  const loadMembershipStatus = async () => {
    try {
      const isPro = await isProMember();
      setIsPremium(isPro);
    } catch (error) {
      console.error('Error loading membership status:', error);
    }
  };

  // Mock stock data
  const stockData: Record<string, { name: string; categories: string[]; sector: string }> = {
    AAPL: {
      name: 'Apple Inc.',
      categories: ['Consumer Electronics', 'USA', 'Mega Cap'],
      sector: 'Technology',
    },
    MSFT: {
      name: 'Microsoft Corporation',
      categories: ['Software', 'USA', 'Mega Cap'],
      sector: 'Technology',
    },
    TSLA: {
      name: 'Tesla, Inc.',
      categories: ['Automotive', 'USA', 'Large Cap'],
      sector: 'Automotive',
    },
    NVDA: {
      name: 'NVIDIA Corporation',
      categories: ['Semiconductors', 'USA', 'Large Cap'],
      sector: 'Technology',
    },
  };

  const currentStock = stockData[stock] || {
    name: `${stock} Corporation`,
    categories: ['Technology', 'USA', 'Large Cap'],
    sector: 'Technology',
  };

  // Mock related news data
  const relatedNews: RelatedNewsItem[] = [
    {
      date: 'OCT 12, 2023',
      tag: 'Risk',
      headline: 'Supply chain constraints reported in SE Asia assembly hubs',
      summary: 'Production forecasts for the upcoming quarter have been lowered by 5% due to component shortages affecting key assembly partners in Vietnam and India.',
      source: 'BLOOMBERG',
    },
    {
      date: 'SEP 28, 2023',
      tag: 'Opportunity',
      headline: 'Services revenue surpasses expectations in Q3',
      summary: 'The services division continues to show double-digit growth, reducing reliance on hardware cycles and improving overall gross margins significantly.',
      source: 'REUTERS',
    },
    {
      date: 'SEP 15, 2023',
      tag: 'Neutral',
      headline: 'Executive leadership changes announced for 2024',
      summary: 'Long-time hardware chief is set to retire. The transition plan appears stable with an internal promotion filling the role, signaling continuity.',
      source: 'WALL STREET JOURNAL',
    },
    {
      date: 'AUG 04, 2023',
      tag: 'Opportunity',
      headline: 'Strategic partnership with AI chip manufacturer',
      summary: 'A multi-year agreement secures priority access to next-gen silicon, potentially accelerating the roadmap for upcoming vision products.',
      source: 'TECHCRUNCH',
    },
  ];

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

        {/* AI Summary Section */}
        {isAISummaryCollapsed ? (
          <Pressable 
            style={[styles.aiSummaryCard, { backgroundColor: theme.colors.primary }]}
            onPress={() => setIsAISummaryCollapsed(false)}
          >
            <Text style={[styles.collapsedText, { color: '#FFFFFF' }]}>AI Summary of Stock History</Text>
          </Pressable>
        ) : (
          <View style={[styles.aiSummaryCard, { backgroundColor: theme.colors.surface }]}>
            {isPremium ? (
              <View style={styles.aiSummaryHeader}>
                <Text style={[styles.aiSummaryTitle, styles.aiSummaryTitlePremium, { color: theme.colors.textPrimary }]}>AI Summary of Stock History</Text>
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>PRO</Text>
                </View>
              </View>
            ) : (
              <View style={styles.aiSummaryHeaderLocked}>
                <View style={styles.proBadgeTop}>
                  <Text style={styles.proBadgeText}>PRO</Text>
                </View>
                <Text style={[styles.aiSummaryTitle, { color: theme.colors.textPrimary }]}>AI Summary of Stock History</Text>
              </View>
            )}

          {isPremium ? (
            <>
              {/* Active Drivers */}
              <View style={styles.aiSummarySection}>
                <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>ACTIVE DRIVERS</Text>
                <View style={styles.driverItem}>
                  <View style={[styles.driverDot, { backgroundColor: colors.oppty }]} />
                  <Text style={[styles.driverText, { color: theme.colors.textPrimary }]}>Services revenue growth accelerating despite hardware slowdown.</Text>
                </View>
                <View style={styles.driverItem}>
                  <View style={[styles.driverDot, { backgroundColor: colors.risk }]} />
                  <Text style={[styles.driverText, { color: theme.colors.textPrimary }]}>Regulatory pressure in EU markets impacting App Store margins.</Text>
                </View>
                <View style={styles.driverItem}>
                  <View style={[styles.driverDot, { backgroundColor: colors.neutral }]} />
                  <Text style={[styles.driverText, { color: theme.colors.textPrimary }]}>Neutral impact from recent Vision Pro launch announcements.</Text>
                </View>
              </View>

              {/* Current Signals */}
              <View style={styles.aiSummarySection}>
                <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>CURRENT SIGNALS</Text>
                <View style={[styles.mixedSignalsBadge, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.mixedSignalsText, { color: theme.colors.textPrimary }]}>Mixed Signals</Text>
                </View>
                <Text style={[styles.signalDescription, { color: theme.colors.textPrimary }]}>Strong fundamentals currently offset by short-term regulatory headwinds.</Text>
              </View>

              {/* External Context */}
              <View style={styles.aiSummarySection}>
                <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>EXTERNAL CONTEXT</Text>
                <View style={styles.contextItem}>
                  <Text style={styles.contextIcon}>🌍</Text>
                  <Text style={[styles.contextText, { color: theme.colors.textPrimary }]}>Geopolitics</Text>
                </View>
                <View style={styles.contextItem}>
                  <Text style={styles.contextIcon}>⚖️</Text>
                  <Text style={[styles.contextText, { color: theme.colors.textPrimary }]}>Regulation</Text>
                </View>
                <View style={styles.contextItem}>
                  <Text style={styles.contextIcon}>📈</Text>
                  <Text style={[styles.contextText, { color: theme.colors.textPrimary }]}>Inflation</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.lockedContent}>
              <View style={styles.lockedContentInner}>
                <Text style={[styles.unlockTitle, { color: theme.colors.textPrimary }]}>Unlock AI Insights</Text>
                <Text style={[styles.unlockDescription, { color: theme.colors.textSecondary }]}>
                  Get instant, aggregated insights derived from multiple articles to see the bigger picture.
                </Text>
                <Pressable 
                  style={[styles.upgradeButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => {
                    setIsUpgradeModalVisible(true);
                  }}
                >
                  <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
                </Pressable>
                <Pressable 
                  style={styles.maybeLaterButton}
                  onPress={() => {
                    setIsAISummaryCollapsed(true);
                  }}
                >
                  <Text style={[styles.maybeLaterText, { color: theme.colors.textSecondary }]}>Maybe later</Text>
                </Pressable>
              </View>
            </View>
          )}
          </View>
        )}

        {/* Recent Developments Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Recent Developments</Text>

          {/* News Items List */}
          <View style={styles.newsList}>
            {relatedNews.map((item, index) => {
              // Convert RelatedNewsItem to NewsItem format for bookmarking
              const newsItem: NewsItem = {
                title: item.headline,
                summary: item.summary,
                stock: stock,
                sector: currentStock.sector,
                tag: item.tag,
                source: item.source,
                time: item.date,
              };

              return (
                <Pressable
                  key={index}
                  style={[styles.newsItemCard, { backgroundColor: theme.colors.surface }]}
                  onPress={() => setSelectedNewsItem(item)}
                >
                  <View style={styles.newsItemContent}>
                    <View style={styles.newsHeader}>
                      <View style={styles.newsHeaderLeft}>
                        <Text style={[styles.newsDate, { color: theme.colors.textSecondary }]}>{item.date}</Text>
                        <Text style={[styles.newsSource, { color: theme.colors.textSecondary }]}>{item.source}</Text>
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
                    <Text style={[styles.newsHeadline, { color: theme.colors.textPrimary }]}>{item.headline}</Text>
                    <Text style={[styles.newsSummary, { color: theme.colors.textPrimary }]}>{item.summary}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* News Article Modal */}
      <Modal
        visible={selectedNewsItem !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedNewsItem(null)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setSelectedNewsItem(null)} style={styles.modalCloseButton}>
              <Text style={[styles.modalCloseText, { color: theme.colors.textPrimary }]}>✕</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.modalContent} contentContainerStyle={styles.modalContentContainer}>
            {selectedNewsItem && (
              <>
                <View style={styles.modalHeaderInfo}>
                  <Text style={[styles.modalDate, { color: theme.colors.textSecondary }]}>{selectedNewsItem.date}</Text>
                  <Text style={[styles.modalSource, { color: theme.colors.textSecondary }]}>{selectedNewsItem.source}</Text>
                </View>
                <Text style={[styles.modalHeadline, { color: theme.colors.textPrimary }]}>{selectedNewsItem.headline}</Text>
                <Text style={[styles.modalSummary, { color: theme.colors.textPrimary }]}>{selectedNewsItem.summary}</Text>
                <Text style={[styles.modalFullArticle, { color: theme.colors.textPrimary }]}>
                  {selectedNewsItem.summary} This represents a significant development in the market landscape. Analysts are closely monitoring the situation as it unfolds. The implications extend beyond immediate market reactions, potentially affecting long-term strategic decisions for stakeholders across the industry.
                </Text>
              </>
            )}
          </ScrollView>
          <View style={[styles.modalFooter, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
            <Pressable
              style={[styles.getInsightButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                if (selectedNewsItem) {
                  setSelectedNewsItem(null);
                  // Create a news item format for navigation
                  const newsItem = {
                    title: selectedNewsItem.headline,
                    summary: selectedNewsItem.summary,
                    stock: stock,
                    sector: currentStock.sector,
                    tag: selectedNewsItem.tag,
                    source: selectedNewsItem.source,
                    time: selectedNewsItem.date,
                  };
                  navigation.navigate('Insight', { item: newsItem });
                }
              }}
            >
              <Text style={styles.getInsightButtonText}>View Insight</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Upgrade to Pro Modal */}
      <UpgradeToProModal
        visible={isUpgradeModalVisible}
        onClose={() => setIsUpgradeModalVisible(false)}
        onStartMembership={async () => {
          // Membership is upgraded in the modal
          setIsUpgradeModalVisible(false);
          // Reload membership status to reflect the change
          await loadMembershipStatus();
        }}
      />
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
    marginBottom: spacing.md,
  },
  aiSummaryCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  aiSummaryHeaderLocked: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  aiSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  aiSummaryTitlePremium: {
    flex: 1,
    textAlign: 'left',
  },
  proBadge: {
    backgroundColor: '#60A5FA',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: spacing.sm,
  },
  proBadgeTop: {
    backgroundColor: '#60A5FA',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: spacing.xs,
    alignSelf: 'center',
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  aiSummarySection: {
    marginBottom: spacing.md,
  },
  aiSummarySectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  driverItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  driverDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.sm,
    marginTop: 6,
  },
  driverText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  mixedSignalsBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  mixedSignalsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  signalDescription: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  contextItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  contextIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  contextText: {
    fontSize: 14,
  },
  newsList: {
    gap: spacing.md,
  },
  newsItemCard: {
    padding: spacing.md,
    borderRadius: radius.md,
  },
  newsItemContent: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  newsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  newsDate: {
    fontSize: 12,
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bookmarkButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  newsHeadline: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  newsSummary: {
    fontSize: 14,
    lineHeight: 20,
  },
  lockedContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    minHeight: 200,
  },
  lockedContentInner: {
    alignItems: 'center',
    width: '100%',
  },
  unlockTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  unlockDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  upgradeButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.md,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  maybeLaterButton: {
    paddingVertical: spacing.sm,
  },
  maybeLaterText: {
    fontSize: 14,
  },
  collapsedText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    padding: spacing.md,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
    paddingTop: Platform.OS === 'ios' ? spacing.lg : spacing.md,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 24,
    fontWeight: '300',
  },
  modalContent: {
    flex: 1,
  },
  modalContentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg * 2,
  },
  modalHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  modalDate: {
    fontSize: 12,
  },
  modalSource: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  modalHeadline: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  modalSummary: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  modalFullArticle: {
    fontSize: 15,
    lineHeight: 24,
  },
  modalFooter: {
    padding: spacing.md,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.md,
  },
  getInsightButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  getInsightButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
