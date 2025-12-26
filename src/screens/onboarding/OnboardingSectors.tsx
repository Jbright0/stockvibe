import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/ThemeContext';

const SECTORS = [
  'Technology',
  'Healthcare',
  'Financial Services',
  'Consumer Cyclical',
  'Energy',
  'Utilities',
  'Real Estate',
  'Industrials',
];

export default function OnboardingSectors() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  
  // Check if accessed from Profile
  const fromProfile = route.params?.fromProfile || false;
  
  // Load existing sectors if from Profile
  useEffect(() => {
    if (fromProfile) {
      loadExistingSectors();
    }
  }, [fromProfile]);
  
  const loadExistingSectors = async () => {
    try {
      const interestsJson = await AsyncStorage.getItem('user_interests') || '{}';
      const interests = JSON.parse(interestsJson);
      if (interests.sectors && interests.sectors.length > 0) {
        setSelectedSectors(interests.sectors);
      }
    } catch (error) {
      console.error('Error loading existing sectors:', error);
    }
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  const handleContinue = async () => {
    // Save selected sectors
    const interestsJson = await AsyncStorage.getItem('user_interests') || '{}';
    const interests = JSON.parse(interestsJson);
    
    await AsyncStorage.setItem(
      'user_interests',
      JSON.stringify({
        ...interests,
        sectors: selectedSectors,
      })
    );
    
    // Navigate based on context
    if (fromProfile) {
      // Navigate back to Profile
      navigation.goBack();
    } else {
      // Navigate to next screen (stocks selection)
      navigation.navigate('OnboardingStocks');
    }
  };

  const handleSkip = () => {
    // Navigate based on context
    if (fromProfile) {
      navigation.goBack();
    } else {
      navigation.navigate('OnboardingStocks');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Skip Link */}
        <Pressable style={styles.skipContainer} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>
            Skip
          </Text>
        </Pressable>

        {/* Card Container */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            Select sectors you follow
          </Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            We'll curate intelligence based on these preferences.
          </Text>

          {/* Sector List */}
          <View style={styles.sectorList}>
            {SECTORS.map((sector, index) => {
              const isSelected = selectedSectors.includes(sector);
              return (
                <Pressable
                  key={sector}
                  style={[
                    styles.sectorRow,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => toggleSector(sector)}
                >
                  <Text style={[styles.sectorText, { color: theme.colors.textPrimary }]}>
                    {sector}
                  </Text>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                        backgroundColor: isSelected ? theme.colors.primary : 'transparent',
                      },
                    ]}
                  >
                    {isSelected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Continue Button */}
          <Pressable
            style={[styles.continueButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
    padding: 16,
  },
  skipContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  skipText: {
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
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
  sectorList: {
    marginBottom: 32,
    gap: 12,
  },
  sectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
