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
  tag: 'Risk' | 'Opportunity' | 'Neutral';
  content: string;
}

export default function SectorDetailScreen() {
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { sector } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock sector data
  const sectorData: Record<string, { description: string; stocks: string[] }> = {
    'Clean Energy': {
      description: 'Companies involved in the production of renewable energy sources, including solar, wind, and hydroelectric power, as well as related infrastructure.',
      stocks: ['NEE', 'ENPH', 'FSLR', 'TSLA', 'PLUG', 'RUN'],
    },
    'Technology': {
      description: 'Companies focused on software, hardware, and technology services including cloud computing, semiconductors, and digital platforms.',
      stocks: ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META', 'AMZN'],
    },
    'Finance': {
      description: 'Financial institutions including banks, insurance companies, and investment firms providing financial services.',
      stocks: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'C'],
    },
  };

  const currentSector = sectorData[sector] || {
    description: 'Sector-wide trends and structural changes.',
    stocks: ['STOCK1', 'STOCK2', 'STOCK3'],
  };

  // Mock recent developments
  const recentDevelopments: DevelopmentItem[] = [
    {
      date: 'OCT 24',
      tag: 'Risk',
      content: 'Supply chain constraints affecting solar panel output across major domestic manufacturers.',
    },
    {
      date: 'OCT 12',
      tag: 'Opportunity',
      content: 'New federal tax credits approved for wind farms, expected to boost margins in Q4.',
    },
    {
      date: 'SEP 30',
      tag: 'Neutral',
      content: 'Standard regulatory review of hydroelectric dams initiating next quarter.',
    },
  ];

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
        <Text style={[styles.pageTitle, { color: theme.colors.textSecondary }]}>Sector Detail</Text>
        
        <View style={styles.headerRow}>
          <Text style={[styles.sectorTitle, { color: theme.colors.primary }]}>{sector}</Text>
          <Pressable onPress={handleBookmarkPress} style={styles.bookmarkButton}>
            <BookmarkIcon 
              color={isBookmarked ? theme.colors.primary : theme.colors.textSecondary} 
              size={20} 
            />
          </Pressable>
        </View>

        <Text style={[styles.description, { color: theme.colors.textPrimary }]}>{currentSector.description}</Text>

        {/* THE BIG PICTURE Section */}
        <View style={[styles.bigPictureCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.bigPictureHeader}>
            <View style={[styles.bigPictureIcon, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.bigPictureIconText}>📍</Text>
            </View>
            <Text style={[styles.bigPictureTitle, { color: theme.colors.primary }]}>THE BIG PICTURE</Text>
          </View>
          <Text style={[styles.bigPictureText, { color: theme.colors.textPrimary }]}>
            Current valuations reflect high expectations for regulatory support. Macro stance is cautiously optimistic despite short-term headwinds.
          </Text>
          <Pressable style={styles.readMoreLink}>
            <Text style={[styles.readMoreText, { color: theme.colors.primary }]}>Read full analysis →</Text>
          </Pressable>
        </View>

        {/* Recent Developments Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Recent Developments</Text>
          
          {recentDevelopments.map((item, index) => (
            <View key={index} style={styles.developmentCard}>
              <View style={styles.developmentHeader}>
                <View style={[styles.developmentTag, { backgroundColor: getTagColor(item.tag) }]}>
                  <Text style={[styles.developmentTagText, { color: getTagTextColor(item.tag) }]}>
                    {item.tag}
                  </Text>
                </View>
                <Text style={[styles.developmentDate, { color: theme.colors.textPrimary }]}>{item.date}</Text>
              </View>
              <Text style={[styles.developmentContent, { color: theme.colors.textPrimary }]}>{item.content}</Text>
            </View>
          ))}
        </View>

        {/* Affected Stocks Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Affected Stocks</Text>
          <View style={styles.stocksGrid}>
            {currentSector.stocks.map((stock, index) => (
              <View key={index} style={styles.stockTag}>
                <Text style={[styles.stockTagText, { color: theme.colors.textPrimary }]}>{stock}</Text>
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
  pageTitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  bigPictureCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  bigPictureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bigPictureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  bigPictureIconText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  bigPictureTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  bigPictureText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  readMoreLink: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  developmentCard: {
    backgroundColor: 'transparent',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  developmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  developmentTag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  developmentTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  developmentDate: {
    fontSize: 12,
    fontWeight: '400',
  },
  developmentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  stocksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  stockTag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'transparent',
    minWidth: 60,
    borderWidth: 1,
  },
  stockTagText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
