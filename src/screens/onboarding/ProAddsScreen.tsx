import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import UpgradeToProModal from '../../components/UpgradeToProModal';

const aggregateInsights = [
  {
    icon: '⚡',
    title: 'Active Drivers',
    description: 'Recurring market forces',
  },
  {
    icon: '📈',
    title: 'Signal Overview',
    description: 'Momentum & risk posture',
  },
  {
    icon: '⚖️',
    title: 'Risk / Opportunity Balance',
    description: 'Weighted assessment',
  },
  {
    icon: '🌐',
    title: 'PESTLE & Context',
    description: 'External macro factors',
  },
];

const depthCoverage = [
  {
    icon: '⊞',
    title: 'Coverage of 5,000+ assets',
    description: 'Comprehensive global data',
  },
  {
    icon: '◉',
    title: 'Impact mapping across sectors',
    description: 'Deep chain-reaction analysis',
  },
  {
    icon: '🔽',
    title: 'Advanced screening',
    description: 'Coming soon to Pro',
  },
];

export default function ProAddsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

  const handleStartWithFree = () => {
    // Navigate to How StockVibe Works screen (Step 6)
    navigation.navigate('HowItWorks');
  };

  const handleUpgradeToPro = () => {
    // Show the upgrade modal
    setIsUpgradeModalVisible(true);
  };

  const handleSkip = () => {
    // Navigate to How StockVibe Works screen (Step 6)
    navigation.navigate('HowItWorks');
  };

  const handleModalClose = () => {
    // Close modal and continue onboarding regardless of payment
    setIsUpgradeModalVisible(false);
    // Continue to next onboarding screen
    navigation.navigate('HowItWorks');
  };

  const handleStartMembership = () => {
    // Membership is upgraded in the modal
    setIsUpgradeModalVisible(false);
    // Continue to next onboarding screen
    navigation.navigate('HowItWorks');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back and Skip */}
        <View style={styles.headerRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backIcon, { color: theme.colors.textPrimary }]}>←</Text>
          </Pressable>
          <Pressable onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>Skip</Text>
          </Pressable>
        </View>

        {/* PRO Badge */}
        <View style={[styles.proBadge, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.proBadgeText}>PRO</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          When You Want the Full Picture
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Pro connects the dots across multiple developments.
        </Text>

        {/* Aggregate Insights Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.asteriskIcon}>*</Text>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
              Aggregate Insights
            </Text>
          </View>
          {aggregateInsights.map((item, index) => (
            <View key={index}>
              <View style={styles.featureRow}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: theme.colors.textPrimary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                    {item.description}
                  </Text>
                </View>
              </View>
              {index < aggregateInsights.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Depth & Coverage Section */}
        <View style={styles.depthSection}>
          <Text style={[styles.depthSectionTitle, { color: theme.colors.textSecondary }]}>
            DEPTH & COVERAGE
          </Text>
          {depthCoverage.map((item, index) => (
            <View key={index} style={styles.depthFeatureRow}>
              <Text style={styles.depthFeatureIcon}>{item.icon}</Text>
              <View style={styles.depthFeatureContent}>
                <Text style={[styles.depthFeatureTitle, { color: theme.colors.textPrimary }]}>
                  {item.title}
                </Text>
                <Text style={[styles.depthFeatureDescription, { color: theme.colors.textSecondary }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.startFreeButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleStartWithFree}
          >
            <Text style={styles.startFreeButtonText}>Start with Free</Text>
          </Pressable>
          <Pressable
            style={[styles.upgradeProButton, { borderColor: theme.colors.border }]}
            onPress={handleUpgradeToPro}
          >
            <Text style={[styles.upgradeProButtonText, { color: theme.colors.textPrimary }]}>
              Upgrade to Pro
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Upgrade to Pro Modal */}
      <UpgradeToProModal
        visible={isUpgradeModalVisible}
        onClose={handleModalClose}
        onStartMembership={handleStartMembership}
      />
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  proBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  asteriskIcon: {
    fontSize: 20,
    color: '#2B6CEE',
    marginRight: 8,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    marginLeft: 48, // Icon width (32) + margin (16)
  },
  depthSection: {
    marginBottom: 32,
  },
  depthSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  depthFeatureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  depthFeatureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  depthFeatureContent: {
    flex: 1,
  },
  depthFeatureTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  depthFeatureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 12,
  },
  startFreeButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startFreeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  upgradeProButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  upgradeProButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

