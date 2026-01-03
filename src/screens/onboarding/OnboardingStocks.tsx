import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  TextInput,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { userInterestsService } from '../../services/userInterests.service';

interface Stock {
  ticker: string;
  companyName: string;
  icon: string;
}

const POPULAR_STOCKS: Stock[] = [
  { ticker: 'AAPL', companyName: 'Apple Inc.', icon: '📱' },
  { ticker: 'MSFT', companyName: 'Microsoft Corp.', icon: '💻' },
  { ticker: 'BRK.B', companyName: 'Berkshire Hathaway', icon: '🏢' },
  { ticker: 'JNJ', companyName: 'Johnson & Johnson', icon: '💊' },
  { ticker: 'GOOGL', companyName: 'Alphabet Inc.', icon: '🔍' },
  { ticker: 'AMZN', companyName: 'Amazon.com Inc.', icon: '🛒' },
];

export default function OnboardingStocks() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [selectedStocks, setSelectedStocks] = useState<string[]>(['AAPL', 'JNJ']);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if accessed from Profile
  const fromProfile = route.params?.fromProfile || false;
  
  // Load existing stocks if from Profile
  useEffect(() => {
    if (fromProfile) {
      loadExistingStocks();
    }
  }, [fromProfile]);
  
  const loadExistingStocks = async () => {
    try {
      const interests = await userInterestsService.getInterests();
      if (interests.stocks && interests.stocks.length > 0) {
        setSelectedStocks(interests.stocks);
      }
    } catch (error) {
      console.error('Error loading existing stocks:', error);
    }
  };

  const toggleStock = (ticker: string) => {
    setSelectedStocks(prev =>
      prev.includes(ticker)
        ? prev.filter(s => s !== ticker)
        : [...prev, ticker]
    );
  };

  const handleContinue = async () => {
    try {
      // Update stocks using service
      await userInterestsService.updateStocks(selectedStocks);
      
      // Navigate based on context
      if (fromProfile) {
        // Navigate back to Profile
        navigation.goBack();
      } else {
        // Navigate to next onboarding screen (HowItWorks)
        navigation.navigate('HowItWorks');
      }
    } catch (error) {
      console.error('Error saving stocks:', error);
      // Still navigate even if save fails (graceful degradation)
      if (fromProfile) {
        navigation.goBack();
      } else {
        navigation.navigate('HowItWorks');
      }
    }
  };

  const filteredStocks = POPULAR_STOCKS.filter(
    stock =>
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Select stocks you follow
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          We will curate intelligence based on your portfolio selection. No noise, just insights.
        </Text>

        {/* Search Bar */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.searchIcon, { color: theme.colors.icon }]}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.textPrimary }]}
            placeholder="Search by ticker or company name"
            placeholderTextColor={theme.colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Section Heading */}
        <Text style={[styles.sectionHeading, { color: theme.colors.textSecondary }]}>
          POPULAR BLUE-CHIP STOCKS
        </Text>

        {/* Stock List */}
        <View style={styles.stockList}>
          {filteredStocks.map((stock) => {
            const isSelected = selectedStocks.includes(stock.ticker);
            return (
              <View
                key={stock.ticker}
                style={[
                  styles.stockRow,
                  {
                    backgroundColor: theme.colors.surface,
                    borderBottomColor: theme.colors.border,
                  },
                ]}
              >
                <View style={styles.stockIcon}>
                  <Text style={styles.iconText}>{stock.icon}</Text>
                </View>
                <View style={styles.stockInfo}>
                  <Text style={[styles.companyName, { color: theme.colors.textPrimary }]}>
                    {stock.companyName}
                  </Text>
                  <Text style={[styles.ticker, { color: theme.colors.textSecondary }]}>
                    {stock.ticker}
                  </Text>
                </View>
                <Switch
                  value={isSelected}
                  onValueChange={() => toggleStock(stock.ticker)}
                  trackColor={{
                    false: theme.colors.border,
                    true: theme.colors.primary,
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
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
    marginBottom: 24,
    lineHeight: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  stockList: {
    marginBottom: 32,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  stockIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  stockInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  ticker: {
    fontSize: 14,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
