import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';

const principles = [
  {
    number: '1.',
    iconType: 'document',
    title: 'Evidence First',
    description: 'News is the foundation. Insights never replace sources.',
  },
  {
    number: '2.',
    iconType: 'question',
    title: 'Interpretation, Not Advice',
    description: 'We explain developments — you decide.',
  },
  {
    number: '3.',
    iconType: 'calendar',
    title: 'Long-Term Context',
    description: 'Built for multi-year thinking, not daily noise.',
  },
];

export default function HowItWorksScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleEnter = () => {
    // Navigate to Create Account screen (Step 7)
    navigation.navigate('CreateAccount');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Card */}
        <View style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}>
          {/* Drag Indicator */}
          <View style={[styles.dragIndicator, { backgroundColor: theme.colors.border }]} />

          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            How StockVibe Helps You Think Clearly
          </Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Investment Intelligence, Simplified. We separate signal from noise.
          </Text>

          {/* Principles List */}
          <View style={styles.principlesContainer}>
            {principles.map((principle, index) => (
              <View key={index} style={styles.principle}>
                <View style={[styles.principleIconContainer, { backgroundColor: theme.colors.primary }]}>
                  {principle.iconType === 'document' && (
                    <View style={styles.iconInner}>
                      <View style={styles.iconLine} />
                      <View style={styles.iconLine} />
                      <View style={styles.iconLine} />
                    </View>
                  )}
                  {principle.iconType === 'question' && (
                    <View style={styles.iconInner}>
                      <Text style={styles.questionMark}>?</Text>
                    </View>
                  )}
                  {principle.iconType === 'calendar' && (
                    <View style={styles.iconInner}>
                      <View style={styles.calendarTop} />
                      <View style={styles.calendarBody}>
                        <Text style={[styles.calendarDate, { color: theme.colors.primary }]}>24</Text>
                      </View>
                    </View>
                  )}
                </View>
                <View style={styles.principleContent}>
                  <Text style={[styles.principleTitle, { color: theme.colors.textPrimary }]}>
                    {principle.number} {principle.title}
                  </Text>
                  <Text style={[styles.principleDescription, { color: theme.colors.textSecondary }]}>
                    {principle.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Enter Button */}
          <Pressable
            style={[styles.enterButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleEnter}
          >
            <Text style={styles.enterButtonText}>Enter Stock Vibe</Text>
          </Pressable>

          {/* Tagline */}
          <Text style={[styles.tagline, { color: theme.colors.textMuted }]}>
            NO NOISE. JUST DATA.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 32,
  },
  contentCard: {
    borderRadius: 16,
    padding: 24,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  principlesContainer: {
    marginBottom: 32,
    gap: 24,
  },
  principle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  principleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconInner: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLine: {
    width: 16,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 3,
  },
  questionMark: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  calendarTop: {
    width: 20,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginBottom: 2,
  },
  calendarBody: {
    width: 20,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDate: {
    fontSize: 10,
    fontWeight: '700',
  },
  principleContent: {
    flex: 1,
  },
  principleTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  principleDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  enterButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
