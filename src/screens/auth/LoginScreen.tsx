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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/ThemeContext';
import { setAuthenticated } from '../../utils/auth';

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    // Handle sign in logic here
    console.log('Sign in:', { email, password });
    
    // Mark as authenticated (replace with actual auth logic)
    await setAuthenticated(true);
    
    // RootNavigator will detect the auth change and switch to MainTabs
    // The interval check will pick up the change within 500ms
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const handleViewOnboarding = async () => {
    // Temporarily clear onboarding_complete to show onboarding
    // RootNavigator will detect this change and switch to onboarding
    await AsyncStorage.removeItem('onboarding_complete');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>SV</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            Welcome back
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Sign in to manage your portfolio
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Address */}
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
              <Text style={[styles.inputIcon, { color: theme.colors.icon }]}>✉</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.textPrimary }]}
                placeholder="user@example.com"
                placeholderTextColor={theme.colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
              Password
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
              <Text style={[styles.inputIcon, { color: theme.colors.icon }]}>🔒</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.textPrimary }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable
                style={styles.eyeButton}
                onPress={togglePasswordVisibility}
              >
                <Text style={[styles.eyeIcon, { color: theme.colors.icon }]}>
                  {showPassword ? '👁' : '👁'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <Pressable
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={[styles.forgotPasswordText, { color: theme.colors.textSecondary }]}>
              Forgot password?
            </Text>
          </Pressable>

          {/* Sign In Button */}
          <Pressable
            style={[styles.signInButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSignIn}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>

          {/* Emoticon Icon */}
          <View style={styles.emoticonContainer}>
            <Text style={styles.emoticon}>😊</Text>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: theme.colors.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <Pressable onPress={handleSignUp}>
              <Text style={[styles.signUpLink, { color: theme.colors.primary }]}>
                Sign up
              </Text>
            </Pressable>
          </View>

          {/* View Onboarding Link */}
          <Pressable
            style={styles.viewOnboardingContainer}
            onPress={handleViewOnboarding}
          >
            <Text style={[styles.viewOnboardingText, { color: theme.colors.textSecondary }]}>
              View onboarding
            </Text>
          </Pressable>
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
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#2B6CEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emoticonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoticon: {
    fontSize: 24,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  viewOnboardingContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  viewOnboardingText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

