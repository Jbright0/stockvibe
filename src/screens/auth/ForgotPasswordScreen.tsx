import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { colors, spacing, radius } from '../../theme/tokens';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    // Handle send reset link logic here
    console.log('Send reset link to:', email);
    // TODO: Implement actual password reset logic
    // Navigate to reset link sent screen
    navigation.navigate('ResetLinkSent');
  };

  const handleBackToSignIn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Text style={styles.iconText}>↻</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Forgot Password
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Don't worry, it happens. Please enter the email address associated with your account.
        </Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            Email Address
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.input, { color: theme.colors.textPrimary }]}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={[styles.inputIcon, { color: theme.colors.icon }]}>✉</Text>
          </View>
        </View>

        {/* Send Reset Link Button */}
        <Pressable
          style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSendResetLink}
        >
          <Text style={styles.sendButtonText}>Send Reset Link</Text>
        </Pressable>

        {/* Back to Sign In Link */}
        <Pressable style={styles.backLink} onPress={handleBackToSignIn}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={[styles.backLinkText, { color: theme.colors.primary }]}>
            Back to Sign In
          </Text>
        </Pressable>
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 32,
    color: colors.primary,
  },
  title: {
    fontSize: 28,
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
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  inputIcon: {
    fontSize: 20,
    marginLeft: spacing.sm,
  },
  sendButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  backArrow: {
    fontSize: 16,
    color: colors.primary,
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

