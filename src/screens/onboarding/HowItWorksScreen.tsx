import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/ThemeContext';

const features = [
  {
    icon: '⚖️',
    title: 'Facts vs. Opinions',
    description: 'We separate raw financial data from analyst sentiment so you see the full picture.',
  },
  {
    icon: '✍️',
    title: 'Human-Written',
    description: 'No black-box algorithms. Our summaries are curated by experts to ensure clarity and context.',
  },
  {
    icon: '⏳',
    title: 'Long-term Focus',
    description: 'We ignore daily volatility. Our insights are calibrated for 3-5 year investment horizons.',
  },
];

export default function HowItWorksScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleEnter = async () => {
    // Get existing interests from previous screens
    const interestsJson = await AsyncStorage.getItem('user_interests') || '{}';
    const interests = JSON.parse(interestsJson);
    
    // Ensure we have the complete interests data
    if (!interests.stocks) {
      interests.stocks = [];
    }
    if (!interests.sectors) {
      interests.sectors = [];
    }
    
    // Save user interests
    await AsyncStorage.setItem(
      'user_interests',
      JSON.stringify(interests)
    );
    
    // Mark onboarding as complete
    await AsyncStorage.setItem('onboarding_complete', 'true');
    
    // RootNavigator will automatically detect the change and switch to MainTabs
    // The interval check in RootNavigator will pick up the change within 500ms
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Draggable Indicator */}
        <View style={[styles.dragIndicator, { backgroundColor: theme.colors.border }]} />

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          How Insights Work
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Investment Intelligence, Simplified. We separate signal from noise.
        </Text>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <View style={[styles.featureIconContainer, { backgroundColor: theme.colors.surface }]}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: theme.colors.textPrimary }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Separator */}
        <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />

        {/* Enter Stock Vibe Button */}
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
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 32,
    gap: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  separator: {
    height: 1,
    marginBottom: 32,
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
  },
  tagline: {
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: '600',
  },
});
