import { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet, View, ScrollView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { bookmarks } from '../store/bookmarks';
import { colors, spacing, radius } from '../theme/tokens';
import BookmarkIcon from '../components/icons/BookmarkIcon';
import { useTheme } from '../theme/ThemeContext';
import { darkTheme } from '../theme/tokens';

export default function NewsDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { item } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.isBookmarked(item));

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

  const formatDate = () => {
    const date = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleBookmarkPress = () => {
    const newBookmarkState = bookmarks.toggle(item);
    setIsBookmarked(newBookmarkState);
  };

  // Mock data for impact analysis and key facts
  const impactAnalysis = "While revenue met expectations, forward guidance suggests a temporary cyclical downturn in EUV lithography demand. Long-term thesis remains intact based on order backlog.";
  
  const keyFacts = [
    "Net bookings declined 42% YoY, signalling caution from major chip manufacturers.",
    "Gross margin stabilized at 51.9%, slightly beating consensus estimates despite lower volume.",
    "Management reiterates 2025 financial targets, expecting a recovery in late 2024."
  ];

  // Related assets - using the stock and sector from item
  const relatedAssets = [item.stock, 'TSM', item.sector];

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
        {/* Date and read time with bookmark */}
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>{formatDate()} • 2 MIN READ</Text>
          <Pressable onPress={handleBookmarkPress} style={styles.bookmarkButton}>
            <BookmarkIcon 
              color={isBookmarked ? theme.colors.primary : theme.colors.textSecondary} 
              size={20} 
            />
          </Pressable>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.title}</Text>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: getTagColor(item.tag) }]}>
            <Text style={[styles.tagText, { color: getTagTextColor(item.tag) }]}>
              {item.tag}
            </Text>
          </View>
          <View style={[styles.tag, styles.tagSecondary, { borderColor: theme.colors.border, backgroundColor: 'transparent' }]}>
            <Text style={[styles.tagText, { color: theme.colors.textPrimary }]}>
              {item.sector}
            </Text>
          </View>
        </View>

        {/* Impact Analysis Section */}
        <View style={[styles.impactBox, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.impactHeader}>
            <View style={[styles.impactIcon, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.impactIconText}>✈</Text>
            </View>
            <Text style={[styles.impactTitle, { color: theme.colors.textPrimary }]}>IMPACT ANALYSIS</Text>
          </View>
          <Text style={[styles.impactText, { color: theme.colors.textPrimary }]}>{impactAnalysis}</Text>
        </View>

        {/* Key Facts Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Key Facts</Text>
          {keyFacts.map((fact, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Text style={[styles.bullet, { color: theme.colors.textPrimary }]}>•</Text>
              <Text style={[styles.bulletText, { color: theme.colors.textPrimary }]}>{fact}</Text>
            </View>
          ))}
        </View>

        {/* Related Assets Section */}
        <View style={styles.section}>
          <Text style={[styles.relatedAssetsTitle, { color: theme.colors.textSecondary }]}>RELATED ASSETS</Text>
          <View style={styles.assetsContainer}>
            {relatedAssets.map((asset, index) => (
              <View key={index} style={[styles.assetTag, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.assetTagText, { color: theme.colors.textPrimary }]}>{asset}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Source */}
        <View style={styles.sourceContainer}>
          <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>Source: {item.source}</Text>
          <Text style={[styles.externalLink, { color: theme.colors.textSecondary }]}>↗</Text>
        </View>

        {/* CTA Button */}
        <Pressable
          style={[styles.ctaButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('StockDetail', { stock: item.stock })}
        >
          <Text style={styles.ctaText}>View {item.stock} Stock</Text>
          <Text style={styles.ctaArrow}>→</Text>
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bookmarkButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagSecondary: {
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  impactBox: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  impactIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  impactIconText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  impactTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  impactText: {
    fontSize: 14,
    lineHeight: 20,
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
  relatedAssetsTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  assetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  assetTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  assetTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sourceText: {
    fontSize: 12,
    marginRight: spacing.xs,
  },
  externalLink: {
    fontSize: 12,
  },
  ctaButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaArrow: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
