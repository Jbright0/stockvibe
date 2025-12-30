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

export default function CreateAccountScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    // Handle sign up or sign in logic here
    console.log(isSignUp ? 'Sign up' : 'Sign in', { fullName, email, password });
    
    // Mark as authenticated (replace with actual auth logic)
    await setAuthenticated(true);
    
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

        {/* Toggle between Sign Up and Sign In */}
        <View style={styles.toggleContainer}>
          <Pressable
            style={[
              styles.toggleButton,
              isSignUp && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setIsSignUp(true)}
          >
            <Text
              style={[
                styles.toggleText,
                { color: isSignUp ? '#FFFFFF' : theme.colors.textSecondary },
              ]}
            >
              Sign Up
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleButton,
              !isSignUp && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setIsSignUp(false)}
          >
            <Text
              style={[
                styles.toggleText,
                { color: !isSignUp ? '#FFFFFF' : theme.colors.textSecondary },
              ]}
            >
              Log In
            </Text>
          </Pressable>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {isSignUp
              ? 'Join thousands of long-term investors.'
              : 'Sign in to manage your portfolio'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name (only for Sign Up) */}
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }]}>Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                  },
                ]}
                placeholder="John Doe"
                placeholderTextColor={theme.colors.placeholder}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          )}

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
                style={[styles.inputField, { color: theme.colors.textPrimary }]}
                placeholder={isSignUp ? 'name@example.com' : 'user@example.com'}
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
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>Password</Text>
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
                style={[styles.inputField, { color: theme.colors.textPrimary }]}
                placeholder={isSignUp ? 'Min. 8 characters' : 'Enter your password'}
                placeholderTextColor={theme.colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable style={styles.eyeButton} onPress={togglePasswordVisibility}>
                <Text style={[styles.eyeIcon, { color: theme.colors.icon }]}>
                  {showPassword ? '👁' : '👁'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Confirm Password (only for Sign Up) */}
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
                Confirm Password
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
                  style={[styles.inputField, { color: theme.colors.textPrimary }]}
                  placeholder="Confirm password"
                  placeholderTextColor={theme.colors.placeholder}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable style={styles.eyeButton} onPress={toggleConfirmPasswordVisibility}>
                  <Text style={[styles.eyeIcon, { color: theme.colors.icon }]}>
                    {showConfirmPassword ? '👁' : '👁'}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Submit Button */}
          <Pressable
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Text>
          </Pressable>

          {/* Security Footer */}
          <View style={styles.securityFooter}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={[styles.securityText, { color: theme.colors.textMuted }]}>
              Bank-level security
            </Text>
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
    padding: 24,
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
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
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  securityFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
  },
  lockIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  securityText: {
    fontSize: 12,
  },
});

