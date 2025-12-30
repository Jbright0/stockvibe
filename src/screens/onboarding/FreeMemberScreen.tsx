import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';

const features = [
  {
    icon: '🔔',
    text: 'Follow Stocks & Sectors',
  },
  {
    icon: '⚡',
    text: 'Latest Developments',
  },
  {
    icon: '📈',
    text: 'Stock & Sector History',
  },
  {
    icon: '📄',
    text: 'Full Article Access',
  },
  {
    icon: '📊',
    text: 'Article-Level Insights',
  },
  {
    icon: '🔖',
    text: 'Bookmarks',
  },
];

export default function FreeMemberScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleContinue = () => {
    // Navigate to Pro Adds screen (Step 5)
    navigation.navigate('ProAdds');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backIcon, { color: theme.colors.textPrimary }]}>←</Text>
        </Pressable>

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Your Free Intelligence Toolkit
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Everything you need to stay informed — no paywall.
        </Text>

        {/* Features List */}
        <View style={[styles.featuresContainer, { backgroundColor: theme.colors.surface }]}>
          {features.map((feature, index) => (
            <View key={index}>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={[styles.featureText, { color: theme.colors.textPrimary }]}>
                  {feature.text}
                </Text>
              </View>
              {index < features.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Continue Button */}
        <Pressable
          style={[styles.continueButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: theme.colors.textSecondary }]}>
          You can upgrade anytime
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 22,
  },
  featuresContainer: {
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  divider: {
    height: 1,
    marginLeft: 68, // Icon width (32) + margin (16) + padding (20)
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center',
  },
});

