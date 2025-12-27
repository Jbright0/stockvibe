import { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';
import { colors, spacing, radius, darkTheme } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface RelatedNewsItem {
  date: string;
  tag: 'Risk' | 'Opportunity' | 'Neutral';
  headline: string;
  summary: string;
  source: string;
}

export default function StockDetailScreen() {
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { stock } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // TODO: Connect to actual premium membership system
  const [isAISummaryCollapsed, setIsAISummaryCollapsed] = useState(false);

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
              {/* Blurred Content Preview */}
              <View style={styles.blurredContent}>
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
                </View>
              </View>

              {/* Locked Overlay */}
              <View style={[styles.lockedOverlay, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.lockedContentInner}>
                  <Text style={[styles.unlockTitle, { color: theme.colors.textPrimary }]}>Unlock AI Insights</Text>
                  <Text style={[styles.unlockDescription, { color: theme.colors.textSecondary }]}>
                    Get instant, aggregated insights derived from multiple articles to see the bigger picture.
                  </Text>
                  <Pressable 
                    style={[styles.upgradeButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => {
                      // TODO: Navigate to upgrade/pricing screen
                      console.log('Upgrade to Pro');
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
            </View>
          )}
          </View>
        )}

        {/* Recent Developments Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Recent Developments</Text>

          {/* News Items List */}
          <View style={styles.newsList}>
            {relatedNews.map((item, index) => (
              <View key={index} style={[styles.newsItemCard, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.newsItemContent}>
                  <View style={styles.newsHeader}>
                    <Text style={[styles.newsDate, { color: theme.colors.textSecondary }]}>{item.date}</Text>
                    <Text style={[styles.newsSource, { color: theme.colors.textSecondary }]}>{item.source}</Text>
                  </View>
                  <Text style={[styles.newsHeadline, { color: theme.colors.textPrimary }]}>{item.headline}</Text>
                  <Text style={[styles.newsSummary, { color: theme.colors.textPrimary }]}>{item.summary}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Sector History Button */}
        <Pressable style={[styles.sectorHistoryButton, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.sectorHistoryText}>View {currentStock.sector} Sector</Text>
        </Pressable>
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
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  newsDate: {
    fontSize: 12,
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
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
  sectorHistoryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  sectorHistoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  lockedContent: {
    position: 'relative',
    minHeight: 200,
    alignItems: 'center',
  },
  blurredContent: {
    opacity: 0.3,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
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
});
