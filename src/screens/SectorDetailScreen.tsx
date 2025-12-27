import { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';
import { colors, spacing, radius, darkTheme } from '../theme/tokens';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import { useTheme } from '../theme/ThemeContext';

interface DevelopmentItem {
  date: string;
  source: string;
  headline: string;
  content: string;
}

interface StockAffected {
  name: string;
  ticker: string;
  status: 'Beneficiary' | 'At Risk' | 'Neutral';
}

interface ActiveDriver {
  type: 'Policy-driven' | 'Demand-driven' | 'Technology-driven' | 'Cost-driven';
  description: string;
}

export default function SectorDetailScreen() {
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { sector } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock sector data
  const sectorData: Record<string, { description: string; status: string; stocksAffected: StockAffected[] }> = {
    'Semiconductors': {
      description: 'The sector faces a divergence between surging AI-driven demand and a cyclical downturn in consumer electronics. Geopolitical friction continues to reshape global supply chains, creating structural volatility.',
      status: 'Under Pressure',
      stocksAffected: [
        { name: 'Nvidia Corp', ticker: 'NVDA', status: 'Beneficiary' },
        { name: 'Intel Corporation', ticker: 'INTC', status: 'At Risk' },
        { name: 'Texas Instruments', ticker: 'TXN', status: 'Neutral' },
      ],
    },
    'Clean Energy': {
      description: 'Companies involved in the production of renewable energy sources, including solar, wind, and hydroelectric power, as well as related infrastructure.',
      status: 'Under Pressure',
      stocksAffected: [
        { name: 'NextEra Energy', ticker: 'NEE', status: 'Beneficiary' },
        { name: 'Enphase Energy', ticker: 'ENPH', status: 'At Risk' },
        { name: 'First Solar', ticker: 'FSLR', status: 'Neutral' },
      ],
    },
    'Technology': {
      description: 'Companies focused on software, hardware, and technology services including cloud computing, semiconductors, and digital platforms.',
      status: 'Under Pressure',
      stocksAffected: [
        { name: 'Apple Inc', ticker: 'AAPL', status: 'Beneficiary' },
        { name: 'Microsoft Corp', ticker: 'MSFT', status: 'Neutral' },
        { name: 'Alphabet Inc', ticker: 'GOOGL', status: 'Beneficiary' },
      ],
    },
    'Finance': {
      description: 'Financial institutions including banks, insurance companies, and investment firms providing financial services.',
      status: 'Under Pressure',
      stocksAffected: [
        { name: 'JPMorgan Chase', ticker: 'JPM', status: 'Neutral' },
        { name: 'Bank of America', ticker: 'BAC', status: 'At Risk' },
        { name: 'Wells Fargo', ticker: 'WFC', status: 'Neutral' },
      ],
    },
  };

  const currentSector = sectorData[sector] || {
    description: 'Sector-wide trends and structural changes.',
    status: 'Under Pressure',
    stocksAffected: [
      { name: 'Stock 1', ticker: 'STOCK1', status: 'Neutral' },
      { name: 'Stock 2', ticker: 'STOCK2', status: 'Neutral' },
      { name: 'Stock 3', ticker: 'STOCK3', status: 'Neutral' },
    ],
  };

  // Active Drivers data
  const activeDrivers: ActiveDriver[] = [
    {
      type: 'Policy-driven',
      description: 'Tightening export controls on advanced nodes restricting access to key Asian markets.',
    },
    {
      type: 'Demand-driven',
      description: 'Hyperscaler capital expenditure fueling record backlog for AI logic chips and HBM memory.',
    },
    {
      type: 'Technology-driven',
      description: 'Transition to gate-all-around (GAA) transistors increasing initial fabrication complexity.',
    },
    {
      type: 'Cost-driven',
      description: 'Energy and raw material inflation impacting foundry margins globally.',
    },
  ];

  // Mock recent developments
  const recentDevelopments: DevelopmentItem[] = [
    {
      date: 'SEP 15, 2023',
      source: 'WALL STREET JOURNAL',
      headline: 'Executive leadership changes announced for 2024',
      content: 'Long-time hardware chief is set to retire. The transition plan appears stable with an internal promotion filling the role, signaling continuity.',
    },
    {
      date: 'SEP 12, 2023',
      source: 'BLOOMBERG',
      headline: 'Global chip sales hit record high in Q3',
      content: 'Despite lingering supply constraints and logistical hurdles, semiconductor manufacturers report unprecedented quarterly revenue growth driven by AI demand.',
    },
    {
      date: 'SEP 10, 2023',
      source: 'REUTERS',
      headline: 'Major GPU manufacturer delays next-gen processor',
      content: 'Citing yield issues in advanced node production, the company pushes back launch timeline by two quarters, affecting supply chain partners.',
    },
    {
      date: 'SEP 8, 2023',
      source: 'FINANCIAL TIMES',
      headline: 'EU finalizes semiconductor legislation',
      content: 'New regulations aimed at boosting local production capacity by 2030 include significant subsidies for foundry construction and R&D investments.',
    },
  ];

  const getDriverColor = (type: string) => {
    switch (type) {
      case 'Policy-driven':
        return colors.risk;
      case 'Demand-driven':
        return colors.oppty;
      case 'Technology-driven':
        return colors.neutral;
      case 'Cost-driven':
        return colors.risk;
      default:
        return colors.neutral;
    }
  };

  const getDriverBadgeTextColor = (type: string) => {
    // Demand-driven uses oppty (blue), which should have white text
    return type === 'Demand-driven' ? '#FFFFFF' : theme.colors.textPrimary;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Beneficiary':
        return colors.oppty;
      case 'At Risk':
        return colors.risk;
      case 'Neutral':
        return colors.neutral;
      default:
        return colors.neutral;
    }
  };

  const getStatusBadgeTextColor = (status: string) => {
    return status === 'Beneficiary' ? '#FFFFFF' : theme.colors.textPrimary;
  };

  const getRiskBoxBg = () => {
    return theme.colors.background === darkTheme.colors.background 
      ? 'rgba(212, 165, 116, 0.15)'
      : '#FFF5E6';
  };

  const getOpportunityBoxBg = () => {
    return theme.colors.background === darkTheme.colors.background 
      ? 'rgba(107, 163, 232, 0.15)'
      : '#E6F2FF';
  };

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
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
        <View style={styles.headerRow}>
          <Text style={[styles.sectorTitle, { color: theme.colors.textPrimary }]}>{sector}</Text>
          <Pressable onPress={handleBookmarkPress} style={styles.bookmarkButton}>
            <BookmarkIcon 
              color={isBookmarked ? theme.colors.primary : theme.colors.textSecondary} 
              size={20} 
            />
          </Pressable>
        </View>

        <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{currentSector.description}</Text>

        {/* AI Summary Section */}
        <View style={[styles.aiSummaryCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.aiSummaryHeader}>
            <Text style={styles.aiSummaryIcon}>✨</Text>
            <Text style={[styles.aiSummaryTitle, { color: theme.colors.textPrimary }]}>AI Summary of Sector Insights</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>

          {/* Active Drivers */}
          <View style={styles.aiSummarySection}>
            <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>ACTIVE DRIVERS</Text>
            {activeDrivers.map((driver, index) => (
              <View key={index} style={styles.driverItem}>
                <View style={[styles.driverDot, { backgroundColor: getDriverColor(driver.type) }]} />
                <View style={styles.driverContent}>
                  <View style={[styles.driverBadge, { backgroundColor: getDriverColor(driver.type) }]}>
                    <Text style={[styles.driverBadgeText, { color: getDriverBadgeTextColor(driver.type) }]}>
                      {driver.type}
                    </Text>
                  </View>
                  <Text style={[styles.driverText, { color: theme.colors.textPrimary }]}>{driver.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Momentum Signals */}
          <View style={styles.aiSummarySection}>
            <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>MOMENTUM SIGNALS</Text>
            <View style={[styles.mixedSignalsBadge, { backgroundColor: colors.neutral }]}>
              <Text style={[styles.mixedSignalsText, { color: theme.colors.textPrimary }]}>Mixed</Text>
            </View>
            <Text style={[styles.signalDescription, { color: theme.colors.textPrimary }]}>
              High-performance computing segment is accelerating, while automotive and industrial segments show slowing inventory turnover.
            </Text>
          </View>

          {/* Risk & Opportunity Landscape */}
          <View style={styles.aiSummarySection}>
            <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>RISK & OPPORTUNITY LANDSCAPE</Text>
            <View style={[styles.riskOppBox, { backgroundColor: getRiskBoxBg() }]}>
              <View style={styles.riskOppHeader}>
                <Text style={styles.riskIcon}>⚠️</Text>
                <Text style={[styles.riskOppTitle, { color: theme.colors.textPrimary }]}>Risks</Text>
              </View>
              <Text style={[styles.riskOppItem, { color: theme.colors.textPrimary }]}>• Legacy node oversupply</Text>
              <Text style={[styles.riskOppItem, { color: theme.colors.textPrimary }]}>• Trade bifurcation</Text>
            </View>
            <View style={[styles.riskOppBox, { backgroundColor: getOpportunityBoxBg() }]}>
              <View style={styles.riskOppHeader}>
                <Text style={styles.oppIcon}>↑</Text>
                <Text style={[styles.riskOppTitle, { color: theme.colors.textPrimary }]}>Opportunities</Text>
              </View>
              <Text style={[styles.riskOppItem, { color: theme.colors.textPrimary }]}>• Sovereign AI clouds</Text>
              <Text style={[styles.riskOppItem, { color: theme.colors.textPrimary }]}>• Adv. packaging yields</Text>
            </View>
          </View>

          {/* Stocks Most Affected */}
          <View style={styles.aiSummarySection}>
            <Text style={[styles.aiSummarySectionTitle, { color: theme.colors.textSecondary }]}>STOCKS MOST AFFECTED</Text>
            <View style={styles.stockAffectedCard}>
              <View style={styles.stockAffectedInfo}>
                <Text style={[styles.stockAffectedName, { color: theme.colors.textPrimary }]}>Stocks</Text>
                <Text style={[styles.stockAffectedTicker, { color: theme.colors.textSecondary }]}>STOCKS</Text>
              </View>
              <View style={[styles.stockAffectedBadge, { backgroundColor: getStatusBadgeColor('Neutral') }]}>
                <Text style={[styles.stockAffectedBadgeText, { color: getStatusBadgeTextColor('Neutral') }]}>
                  Neutral
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Sector Developments Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Recent Developments</Text>
          
          {recentDevelopments.map((item, index) => (
            <View key={index} style={[styles.developmentCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.developmentMeta, { color: theme.colors.textSecondary }]}>
                {item.date} {item.source}
              </Text>
              <Text style={[styles.developmentHeadline, { color: theme.colors.textPrimary }]}>
                {item.headline}
              </Text>
              <Text style={[styles.developmentContent, { color: theme.colors.textPrimary }]}>
                {item.content}
              </Text>
            </View>
          ))}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sectorTitle: {
    fontSize: 32,
    fontWeight: '700',
    flex: 1,
  },
  bookmarkButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  aiSummaryCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  aiSummaryIcon: {
    fontSize: 16,
  },
  aiSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  proBadge: {
    backgroundColor: '#60A5FA',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
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
  driverContent: {
    flex: 1,
  },
  driverBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  driverBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  driverText: {
    fontSize: 14,
    lineHeight: 20,
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
    lineHeight: 20,
  },
  riskOppBox: {
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  riskOppHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  riskIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  oppIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
    color: colors.oppty,
  },
  riskOppTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskOppItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  stockAffectedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  stockAffectedInfo: {
    flex: 1,
  },
  stockAffectedName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  stockAffectedTicker: {
    fontSize: 14,
  },
  stockAffectedBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  stockAffectedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  developmentCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  developmentMeta: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  developmentHeadline: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  developmentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
