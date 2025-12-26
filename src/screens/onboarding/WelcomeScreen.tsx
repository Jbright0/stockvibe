import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';

export default function WelcomeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    // Navigate to Interest Selection (Step 2)
    navigation.navigate('Interest');
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Logo and App Name */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoSquare, { backgroundColor: theme.colors.primary }]}>
              <View style={styles.logoCircle}>
                <View style={[styles.logoDot, { backgroundColor: theme.colors.primary }]} />
              </View>
            </View>
          </View>
          <Text style={[styles.appName, { color: theme.colors.textPrimary }]}>
            Stock Vibe
          </Text>
        </View>

        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressBarActive, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]} />
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Headline */}
          <View style={styles.headlineContainer}>
            <Text style={[styles.headline1, { color: theme.colors.textPrimary }]}>
              Stay informed.
            </Text>
            <Text style={[styles.headline2, { color: theme.colors.textPrimary }]}>
              Invest wisely.
            </Text>
          </View>

          {/* Body Text */}
          <Text style={[styles.bodyText, { color: theme.colors.textSecondary }]}>
            Long-term wealth isn't built on hype. We provide calm, focused intelligence to help you spot opportunities and manage risk without the noise.
          </Text>
        </View>

        {/* CTA Button */}
        <Pressable
          style={[styles.getStartedButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </Pressable>

        {/* Log In Link */}
        <View style={styles.logInContainer}>
          <Text style={[styles.logInText, { color: theme.colors.textSecondary }]}>
            Already a member?{' '}
          </Text>
          <Pressable onPress={handleLogIn}>
            <Text style={[styles.logInLink, { color: theme.colors.primary }]}>
              Log in
            </Text>
          </Pressable>
        </View>

        {/* Footer Disclaimer */}
        <Text style={[styles.disclaimer, { color: theme.colors.textMuted }]}>
          Financial intelligence, not financial advice.
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    marginRight: 12,
  },
  logoSquare: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 48,
  },
  progressBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  progressBarActive: {
    opacity: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 32,
  },
  headlineContainer: {
    marginBottom: 24,
  },
  headline1: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 44,
  },
  headline2: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logInText: {
    fontSize: 14,
  },
  logInLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 'auto',
    paddingBottom: 16,
  },
});
