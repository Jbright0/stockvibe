import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { colors, spacing, radius } from '../../theme/tokens';

export default function ResetLinkSentScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleBackToSignIn = () => {
    navigation.navigate('Login');
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log('Resend reset link');
    // TODO: Implement resend logic
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <View style={styles.envelopeIcon}>
                <Text style={styles.envelopeSymbol}>✉</Text>
                <View style={styles.checkmarkContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            Check your mail
          </Text>

          {/* Description */}
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            We have sent password recovery instructions to your email.
          </Text>

          {/* Back to Sign In Button */}
          <Pressable
            style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleBackToSignIn}
          >
            <Text style={styles.backButtonText}>Back to Sign In</Text>
          </Pressable>

          {/* Resend Section */}
          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: theme.colors.textSecondary }]}>
              Did not receive the email? Check your spam filter or{' '}
            </Text>
            <Pressable onPress={handleResend}>
              <Text style={[styles.resendLink, { color: theme.colors.primary }]}>
                Resend
              </Text>
            </Pressable>
          </View>
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
    padding: spacing.lg,
    justifyContent: 'center',
  },
  card: {
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeIcon: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeSymbol: {
    fontSize: 32,
    color: colors.primary,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  checkmark: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  backButton: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  resendText: {
    fontSize: 12,
    textAlign: 'center',
  },
  resendLink: {
    fontSize: 12,
    fontWeight: '500',
  },
});

