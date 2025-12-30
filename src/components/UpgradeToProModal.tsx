import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { spacing, radius } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface UpgradeToProModalProps {
  visible: boolean;
  onClose: () => void;
  onStartMembership?: () => void;
}

type PlanType = 'annual' | 'monthly';

interface Feature {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: '⚙️',
    title: 'AI-Summarised Insights',
    description: 'Distilled analysis without the noise.',
    iconColor: '#6BA3E8',
  },
  {
    icon: '📄',
    title: 'Deep-Dive Reports',
    description: 'Institutional-grade research on 5,000+ assets.',
    iconColor: '#9CA3AF',
  },
  {
    icon: '🛡️',
    title: 'Risk Analysis',
    description: 'Advanced semantic tagging for downside protection.',
    iconColor: '#D4A574',
  },
  {
    icon: '🔍',
    title: 'Advanced Screening',
    description: 'Filter by 50+ quantitative and qualitative metrics.',
    iconColor: '#9CA3AF',
  },
];

export default function UpgradeToProModal({
  visible,
  onClose,
  onStartMembership,
}: UpgradeToProModalProps) {
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('annual');

  const handleStartMembership = async () => {
    // Set membership to pro
    try {
      const { setMembershipStatus } = await import('../utils/membership');
      await setMembershipStatus('pro');
    } catch (error) {
      console.error('Error upgrading to pro:', error);
    }
    onStartMembership?.();
    // In a real app, this would handle the subscription purchase
    console.log('Starting Pro Membership with plan:', selectedPlan);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />
        <Pressable onPress={(e) => e.stopPropagation()} style={styles.modalContentWrapper}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            {/* Header with Close Button */}
            <View style={styles.modalHeader}>
              <View style={styles.headerTitleContainer}>
                <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>
                  Upgrade to Pro
                </Text>
              </View>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={[styles.closeButtonText, { color: theme.colors.textSecondary }]}>
                  ✕
                </Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
            {/* Subtitle */}
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Unlock deeper insights and elevate your investment research with data-driven clarity.
            </Text>

            {/* Features Section */}
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View
                    style={[
                      styles.featureIconContainer,
                      { backgroundColor: `${feature.iconColor}20` },
                    ]}
                  >
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

            {/* Pricing Plans */}
            <View style={styles.pricingContainer}>
              {/* Annual Plan */}
              <Pressable
                style={[
                  styles.planCard,
                  selectedPlan === 'annual' && {
                    backgroundColor: `${theme.colors.primary}15`,
                    borderColor: theme.colors.primary,
                  },
                  selectedPlan !== 'annual' && {
                    backgroundColor: theme.colors.surfaceMuted,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedPlan('annual')}
              >
                {selectedPlan === 'annual' && (
                  <View style={[styles.bestValueBadge, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.bestValueText}>BEST VALUE</Text>
                  </View>
                )}
                <View style={styles.planContent}>
                  <View style={styles.planLeft}>
                    <Text style={[styles.planName, { color: theme.colors.textPrimary }]}>
                      Annual
                    </Text>
                  </View>
                  <View style={styles.planRight}>
                    <Text style={[styles.planPrice, { color: theme.colors.textPrimary }]}>
                      $129.99
                    </Text>
                    <Text style={[styles.planFrequency, { color: theme.colors.textMuted }]}>
                      /year
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedPlan === 'annual'
                        ? { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary }
                        : { borderColor: theme.colors.border, backgroundColor: 'transparent' },
                    ]}
                  >
                    {selectedPlan === 'annual' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </View>
              </Pressable>

              {/* Monthly Plan */}
              <Pressable
                style={[
                  styles.planCard,
                  selectedPlan === 'monthly' && {
                    backgroundColor: `${theme.colors.primary}15`,
                    borderColor: theme.colors.primary,
                  },
                  selectedPlan !== 'monthly' && {
                    backgroundColor: theme.colors.surfaceMuted,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <View style={styles.planContent}>
                  <View style={styles.planLeft}>
                    <Text style={[styles.planName, { color: theme.colors.textPrimary }]}>
                      Monthly
                    </Text>
                  </View>
                  <View style={styles.planRight}>
                    <Text style={[styles.planPrice, { color: theme.colors.textPrimary }]}>
                      $14.99
                    </Text>
                    <Text style={[styles.planFrequency, { color: theme.colors.textMuted }]}>
                      /month
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedPlan === 'monthly'
                        ? { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary }
                        : { borderColor: theme.colors.border, backgroundColor: 'transparent' },
                    ]}
                  >
                    {selectedPlan === 'monthly' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </View>
              </Pressable>
            </View>

            {/* Disclaimer */}
            <Text style={[styles.disclaimer, { color: theme.colors.textMuted }]}>
              Secured by Apple App Store. Cancel anytime in settings.
            </Text>

            {/* CTA Button */}
            <Pressable
              style={[styles.ctaButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleStartMembership}
            >
              <Text style={styles.ctaButtonText}>Start Pro Membership</Text>
            </Pressable>

            {/* Footer Links */}
            <View style={styles.footerLinks}>
              <Pressable onPress={() => console.log('Restore Purchases')}>
                <Text style={[styles.footerLink, { color: theme.colors.textMuted }]}>
                  Restore Purchases
                </Text>
              </Pressable>
              <Text style={[styles.footerSeparator, { color: theme.colors.textMuted }]}>•</Text>
              <Pressable onPress={() => console.log('Terms')}>
                <Text style={[styles.footerLink, { color: theme.colors.textMuted }]}>
                  Terms
                </Text>
              </Pressable>
              <Text style={[styles.footerSeparator, { color: theme.colors.textMuted }]}>•</Text>
              <Pressable onPress={() => console.log('Privacy')}>
                <Text style={[styles.footerLink, { color: theme.colors.textMuted }]}>
                  Privacy
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalContentWrapper: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  modalContent: {
    width: '100%',
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  scrollView: {
    maxHeight: 500,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  featuresContainer: {
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  pricingContainer: {
    marginBottom: spacing.md,
  },
  planCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    position: 'relative',
  },
  bestValueBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bestValueText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  planContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingRight: spacing.xs,
  },
  planLeft: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
  },
  planRight: {
    alignItems: 'flex-end',
    marginRight: spacing.md,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
  },
  planFrequency: {
    fontSize: 12,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 16,
  },
  ctaButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  footerLink: {
    fontSize: 12,
  },
  footerSeparator: {
    fontSize: 12,
    marginHorizontal: spacing.xs,
  },
});

