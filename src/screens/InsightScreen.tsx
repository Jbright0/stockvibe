import { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet, View, ScrollView, Platform, StatusBar as RNStatusBar, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { bookmarks } from '../store/bookmarks';
import { colors, spacing, radius } from '../theme/tokens';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import { useTheme } from '../theme/ThemeContext';
import { darkTheme } from '../theme/tokens';

export default function InsightScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { item } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.isBookmarked(item));
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);

  useEffect(() => {
    setIsBookmarked(bookmarks.isBookmarked(item));
  }, [item]);

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

  const getRiskBoxBg = () => {
    return theme.colors.background === darkTheme.colors.background 
      ? 'rgba(212, 165, 116, 0.15)' // risk color with opacity for dark mode
      : '#FFF5E6'; // light orange for light mode
  };

  const getOpportunityBoxBg = () => {
    return theme.colors.background === darkTheme.colors.background 
      ? 'rgba(107, 163, 232, 0.15)' // oppty color with opacity for dark mode
      : '#E6F2FF'; // light blue for light mode
  };

  const handleBookmarkPress = () => {
    const newBookmarkState = bookmarks.toggle(item);
    setIsBookmarked(newBookmarkState);
  };

  // Mock data for the new sections
  const originalArticleSummary = item.summary || "Taiwan Semiconductor Manufacturing Co. reported a slight uptick in output for the third consecutive quarter, signaling a potential thaw in the global chip shortage that has constrained supply chains across multiple industries.";
  
  const whyThisMatters = [
    "Automotive production halts may decrease in Q3, allowing legacy manufacturers to clear backlog orders faster than anticipated.",
    "Inventory buildup risks represent a strategic shift from shortage management to potential oversupply in consumer electronics segments."
  ];

  const impactScope = [
    { symbol: item.stock, name: item.stock, impact: item.tag },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', impact: 'Neutral' }
  ];

  const risks = [
    "Legacy node shortages persist, potentially stalling lower-end auto production lines through Q4.",
    "Inflationary pressure on raw wafers could offset revenue gains from volume recovery."
  ];

  const opportunities = [
    "Accelerated backlog clearance improves quarterly revenue visibility for major foundries.",
    "Inventory normalization allows for strategic reallocation to high-margin AI chip segments."
  ];

  const signal = "Mixed Signals";
  const signalDescription = "Short-term supply relief balanced against long-term demand opacity.";

  const pestleCards = [
    { category: 'Economic', icon: '🏢', text: 'Supply Easing' },
    { category: 'Tech', icon: '🔬', text: 'Yield Boost' },
    { category: 'Political', icon: '🌐', text: 'Trade Policy' }
  ];

  // Get secondary tag based on sector
  const getSecondaryTag = () => {
    const tagMap: { [key: string]: string } = {
      'Technology': 'HARDWARE',
      'Finance': 'BANKING',
      'Energy': 'OIL',
      'Healthcare': 'PHARMA',
      'Automotive': 'AUTO'
    };
    return tagMap[item.sector] || 'INDUSTRY';
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
          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={styles.tagsContainer}>
              <View style={[styles.tag, styles.tagPill, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.tagText, { color: theme.colors.textPrimary }]}>
                  {getSecondaryTag()}
                </Text>
              </View>
              <View style={[styles.tag, styles.tagPill, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.tagText, { color: theme.colors.textPrimary }]}>
                  {item.sector.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.title}</Text>

          {/* Source and time */}
          <Text style={[styles.sourceTime, { color: theme.colors.textSecondary }]}>
            {item.source} • {item.time}
          </Text>

          {/* Original Article Section */}
          <View style={[styles.originalArticleBox, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.originalArticleHeader}>
              <Text style={[styles.originalArticleTitle, { color: theme.colors.textPrimary }]}>
                ORIGINAL ARTICLE
              </Text>
              <Text style={[styles.externalLinkIcon, { color: theme.colors.textSecondary }]}>↗</Text>
            </View>
            <Text style={[styles.originalArticleText, { color: theme.colors.textPrimary }]}>
              {originalArticleSummary}
            </Text>
            <Pressable 
              style={[styles.readFullButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsArticleModalVisible(true)}
            >
              <Text style={styles.readFullText}>Read Full Article</Text>
            </Pressable>
          </View>

          {/* Why This Matters Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Why This Matters</Text>
            {whyThisMatters.map((point, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={[styles.bullet, { color: theme.colors.textPrimary }]}>•</Text>
                <Text style={[styles.bulletText, { color: theme.colors.textPrimary }]}>{point}</Text>
              </View>
            ))}
          </View>

          {/* Impact Scope Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Impact Scope</Text>
            {impactScope.map((company, index) => (
              <Pressable 
                key={index} 
                style={[styles.impactScopeItem, { backgroundColor: theme.colors.surface }]}
                onPress={() => navigation.navigate('StockWatch', { stock: company.symbol })}
              >
                <View style={styles.impactScopeLeft}>
                  <Text style={[styles.impactSymbol, { color: theme.colors.textPrimary }]}>
                    {company.symbol}
                  </Text>
                  <Text style={[styles.impactName, { color: theme.colors.textSecondary }]}>
                    {company.name}
                  </Text>
                </View>
                <View style={[styles.impactTag, { backgroundColor: getTagColor(company.impact) }]}>
                  <Text style={[styles.impactTagText, { color: getTagTextColor(company.impact) }]}>
                    {company.impact}
                  </Text>
                  <Text style={[styles.impactArrow, { color: getTagTextColor(company.impact) }]}>→</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Risk & Opportunity Map Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Risk & Opportunity Map</Text>
            
            {/* Risks */}
            <View style={[styles.riskOppBox, { backgroundColor: getRiskBoxBg() }]}>
              <View style={styles.riskOppHeader}>
                <Text style={styles.riskIcon}>⚠</Text>
                <Text style={[styles.riskOppTitle, { color: theme.colors.textPrimary }]}>Risks</Text>
              </View>
              {risks.map((risk, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={[styles.bullet, { color: theme.colors.textPrimary }]}>•</Text>
                  <Text style={[styles.bulletText, { color: theme.colors.textPrimary }]}>{risk}</Text>
                </View>
              ))}
            </View>

            {/* Opportunities */}
            <View style={[styles.riskOppBox, styles.opportunityBox, { backgroundColor: getOpportunityBoxBg() }]}>
              <View style={styles.riskOppHeader}>
                <Text style={styles.opportunityIcon}>📈</Text>
                <Text style={[styles.riskOppTitle, { color: theme.colors.textPrimary }]}>Opportunities</Text>
              </View>
              {opportunities.map((opp, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={[styles.bullet, { color: theme.colors.textPrimary }]}>•</Text>
                  <Text style={[styles.bulletText, { color: theme.colors.textPrimary }]}>{opp}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* What This Signals Section */}
          <View style={styles.section}>
            <Text style={[styles.signalsTitle, { color: theme.colors.textPrimary }]}>WHAT THIS SIGNALS</Text>
            <View style={[styles.signalTag, { backgroundColor: colors.risk }]}>
              <Text style={[styles.signalTagText, { color: theme.colors.textPrimary }]}>
                ↔ {signal}
              </Text>
            </View>
            <Text style={[styles.signalDescription, { color: theme.colors.textPrimary }]}>
              {signalDescription}
            </Text>
          </View>

          {/* PESTLE Impact Snapshot Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>PESTLE Impact Snapshot</Text>
            <View style={styles.pestleContainer}>
              {pestleCards.map((card, index) => (
                <View key={index} style={[styles.pestleCard, { backgroundColor: theme.colors.surface }]}>
                  <Text style={styles.pestleIcon}>{card.icon}</Text>
                  <Text style={[styles.pestleCategory, { color: theme.colors.textPrimary }]}>
                    {card.category}
                  </Text>
                  <Text style={[styles.pestleText, { color: theme.colors.textSecondary }]}>
                    {card.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </Screen>

      {/* Original Article Modal */}
      <Modal
        visible={isArticleModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsArticleModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setIsArticleModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={[styles.modalCloseText, { color: theme.colors.textPrimary }]}>✕</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.modalContent} contentContainerStyle={styles.modalContentContainer}>
            <View style={styles.modalHeaderInfo}>
              <Text style={[styles.modalDate, { color: theme.colors.textSecondary }]}>{item.time}</Text>
              <Text style={[styles.modalSource, { color: theme.colors.textSecondary }]}>{item.source}</Text>
            </View>
            <Text style={[styles.modalHeadline, { color: theme.colors.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.modalSummary, { color: theme.colors.textPrimary }]}>{originalArticleSummary}</Text>
            <Text style={[styles.modalFullArticle, { color: theme.colors.textPrimary }]}>
              {originalArticleSummary} This represents a significant development in the market landscape. Analysts are closely monitoring the situation as it unfolds. The implications extend beyond immediate market reactions, potentially affecting long-term strategic decisions for stakeholders across the industry.
              {'\n\n'}
              Market participants have been evaluating the broader implications of this news, considering both short-term volatility and long-term structural changes. The development has sparked discussions among industry experts about potential ripple effects across related sectors and supply chains.
              {'\n\n'}
              As the situation continues to evolve, investors and analysts alike are paying close attention to how this development might reshape the competitive landscape. The strategic implications are being carefully analyzed by market observers who are tracking both immediate reactions and potential longer-term trends.
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg * 2,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagPill: {
    borderRadius: 16,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
    lineHeight: 36,
  },
  sourceTime: {
    fontSize: 13,
    marginBottom: spacing.lg,
  },
  originalArticleBox: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  originalArticleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  originalArticleTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  externalLinkIcon: {
    fontSize: 14,
  },
  originalArticleText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  readFullButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  readFullText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingRight: spacing.md,
  },
  bullet: {
    fontSize: 16,
    marginRight: spacing.sm,
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  impactScopeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  impactScopeLeft: {
    flex: 1,
  },
  impactSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  impactName: {
    fontSize: 13,
  },
  impactTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 16,
    gap: spacing.xs,
  },
  impactTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  impactArrow: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskOppBox: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  opportunityBox: {
    marginBottom: 0,
  },
  riskOppHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  riskIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  opportunityIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  riskOppTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  signalsTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  signalTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: spacing.sm,
  },
  signalTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  signalDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  pestleContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  pestleCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  pestleIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  pestleCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  pestleText: {
    fontSize: 11,
    textAlign: 'center',
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
});

