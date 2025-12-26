import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STOCKS, SECTORS } from '../../data/mockData';
import { useTheme } from '../../theme/ThemeContext';

export default function InterestScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  const toggleStock = (stock: string) => {
    setSelectedStocks(prev =>
      prev.includes(stock)
        ? prev.filter(s => s !== stock)
        : [...prev, stock]
    );
  };

  const handleContinue = async () => {
    // Save user interests to AsyncStorage
    await AsyncStorage.setItem(
      'user_interests',
      JSON.stringify({
        stocks: selectedStocks,
        sectors: selectedSectors,
      })
    );
    
    // Navigate to How It Works (Step 3 - Final onboarding screen)
    navigation.navigate('HowItWorks');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          What interests you?
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Select sectors and stocks you'd like to follow
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Sectors
          </Text>
          <View style={styles.chipContainer}>
            {SECTORS.map(sector => (
              <Pressable
                key={sector}
                style={[
                  styles.chip,
                  {
                    backgroundColor: selectedSectors.includes(sector)
                      ? theme.colors.primary
                      : theme.colors.surface,
                    borderColor: selectedSectors.includes(sector)
                      ? theme.colors.primary
                      : theme.colors.border,
                  },
                ]}
                onPress={() => toggleSector(sector)}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: selectedSectors.includes(sector)
                        ? '#FFFFFF'
                        : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {sector}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
            Stocks
          </Text>
          <View style={styles.chipContainer}>
            {STOCKS.map(stock => (
              <Pressable
                key={stock}
                style={[
                  styles.chip,
                  {
                    backgroundColor: selectedStocks.includes(stock)
                      ? theme.colors.primary
                      : theme.colors.surface,
                    borderColor: selectedStocks.includes(stock)
                      ? theme.colors.primary
                      : theme.colors.border,
                  },
                ]}
                onPress={() => toggleStock(stock)}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: selectedStocks.includes(stock)
                        ? '#FFFFFF'
                        : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {stock}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor:
              selectedSectors.length === 0 && selectedStocks.length === 0
                ? theme.colors.border
                : theme.colors.primary,
            opacity:
              selectedSectors.length === 0 && selectedStocks.length === 0 ? 0.5 : 1,
          },
        ]}
        onPress={handleContinue}
        disabled={selectedSectors.length === 0 && selectedStocks.length === 0}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    margin: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
