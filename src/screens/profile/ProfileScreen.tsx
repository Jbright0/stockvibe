import { useState, useEffect, useCallback } from 'react';
import { Switch, View, Text, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../../components/Screen';
import { colors, spacing, radius } from '../../theme/tokens';
import { setAuthenticated } from '../../utils/auth';
import { useTheme } from '../../theme/ThemeContext';
import { getMembershipStatus, MembershipType } from '../../utils/membership';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { theme, isDark, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [followedStocks, setFollowedStocks] = useState<string[]>([]);
  const [followedSectors, setFollowedSectors] = useState<string[]>([]);
  const [preferredCountry, setPreferredCountry] = useState<string>('USA');
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [membership, setMembership] = useState<MembershipType>('member');

  const countries = [
    'USA',
    'Nigeria',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Brazil',
    'South Africa',
    'Mexico',
    'Spain',
    'Italy',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'Singapore',
    'South Korea',
    'Hong Kong',
    'Taiwan',
    'Saudi Arabia',
    'UAE',
    'Argentina',
    'Chile',
    'Turkey',
    'Russia',
    'Poland',
    'Belgium',
    'Norway',
    'Denmark',
    'Finland',
    'Austria',
    'Portugal',
    'Greece',
    'Ireland',
    'Israel',
    'Thailand',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Vietnam',
    'New Zealand',
    'Egypt',
    'Kenya',
    'Ghana',
  ];
  const enabledCountries = ['USA', 'Nigeria'];

  useEffect(() => {
    loadUserInterests();
    loadMembershipStatus();
  }, []);

  // Refresh when screen comes into focus (e.g., returning from stock/sector selection)
  useFocusEffect(
    useCallback(() => {
      loadUserInterests();
      loadMembershipStatus();
    }, [])
  );

  const loadMembershipStatus = async () => {
    try {
      const membershipStatus = await getMembershipStatus();
      setMembership(membershipStatus);
    } catch (error) {
      console.error('Error loading membership status:', error);
    }
  };

  const loadUserInterests = async () => {
    try {
      const interestsJson = await AsyncStorage.getItem('user_interests') || '{}';
      const interests = JSON.parse(interestsJson);
      setFollowedStocks(interests.stocks || []);
      setFollowedSectors(interests.sectors || []);
      if (interests.preferredCountry) {
        setPreferredCountry(interests.preferredCountry);
      }
    } catch (error) {
      console.error('Error loading user interests:', error);
    }
  };

  const handleCountrySelect = async (country: string) => {
    if (!enabledCountries.includes(country)) return;
    setPreferredCountry(country);
    setIsCountryModalVisible(false);
    try {
      const interestsJson = await AsyncStorage.getItem('user_interests') || '{}';
      const interests = JSON.parse(interestsJson);
      await AsyncStorage.setItem('user_interests', JSON.stringify({
        ...interests,
        preferredCountry: country,
      }));
    } catch (error) {
      console.error('Error saving preferred country:', error);
    }
  };

  const handleLogout = async () => {
    await setAuthenticated(false);
    // Navigation will be handled by RootNavigator
  };

  const formatSectors = () => {
    return `${followedSectors.length} ${followedSectors.length === 1 ? 'Sector' : 'Sectors'}`;
  };

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Profile</Text>
        <View style={styles.headerInfo}>
          <View style={styles.nameContainer}>
            <Text style={[styles.userName, { color: theme.colors.textPrimary }]}>Alexander Vance</Text>
            <View style={styles.memberRow}>
              <Text style={[styles.memberText, { color: theme.colors.textSecondary }]}>
                {membership === 'pro' ? 'Pro Member' : 'Member'}
              </Text>
              {membership === 'pro' ? (
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>PRO</Text>
                </View>
              ) : (
                <View style={[styles.upgradeBadge, { borderColor: theme.colors.primary }]}>
                  <Text style={[styles.upgradeBadgeText, { color: theme.colors.primary }]}>Upgrade to PRO</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Intelligence Scope Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>INTELLIGENCE SCOPE</Text>
          
          <Pressable
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={() => navigation.navigate('OnboardingSectors', { fromProfile: true })}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { color: theme.colors.textPrimary }]}>○</Text>
              </View>
              <Text style={[styles.menuItemLabel, { color: theme.colors.textPrimary }]}>Followed Sectors</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={[styles.menuItemValue, { color: theme.colors.textSecondary }]}>{formatSectors()}</Text>
              <Text style={[styles.arrow, { color: theme.colors.textSecondary }]}>›</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={() => navigation.navigate('OnboardingStocks', { fromProfile: true })}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { color: theme.colors.textPrimary }]}>#</Text>
              </View>
              <Text style={[styles.menuItemLabel, { color: theme.colors.textPrimary }]}>Followed Stocks</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={[styles.menuItemValue, { color: theme.colors.textSecondary }]}>{followedStocks.length} Stocks</Text>
              <Text style={[styles.arrow, { color: theme.colors.textSecondary }]}>›</Text>
            </View>
          </Pressable>

          <Pressable
            style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
            onPress={() => setIsCountryModalVisible(true)}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { color: theme.colors.textPrimary }]}>◉</Text>
              </View>
              <Text style={[styles.menuItemLabel, { color: theme.colors.textPrimary }]}>Preferred Country</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={[styles.menuItemValue, { color: theme.colors.textSecondary }]}>{preferredCountry}</Text>
              <Text style={[styles.arrow, { color: theme.colors.textSecondary }]}>›</Text>
            </View>
          </Pressable>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>PREFERENCES</Text>
          
          <Pressable style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { color: theme.colors.textPrimary }]}>☰</Text>
              </View>
              <Text style={[styles.menuItemLabel, { color: theme.colors.textPrimary }]}>Feed Density</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={[styles.menuItemValue, { color: theme.colors.textSecondary }]}>Low</Text>
              <Text style={[styles.arrow, { color: theme.colors.textSecondary }]}>›</Text>
            </View>
          </Pressable>

          <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { color: theme.colors.textPrimary }]}>☉</Text>
              </View>
              <Text style={[styles.menuItemLabel, { color: theme.colors.textPrimary }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconText, { color: theme.colors.textPrimary }]}>◉</Text>
              </View>
              <Text style={[styles.menuItemLabel, { color: theme.colors.textPrimary }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          {!notificationsEnabled && (
            <Text style={[styles.notificationDescription, { color: theme.colors.textSecondary }]}>
              Notifications are disabled. Enable to receive critical updates about your intelligence scope.
            </Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={[styles.logoutText, { color: theme.colors.textPrimary }]}>Log Out</Text>
          </Pressable>
          <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>VERSION 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Country Selection Modal */}
      <Modal
        visible={isCountryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCountryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setIsCountryModalVisible(false)}
          />
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.textPrimary }]}>Select Country</Text>
              <Pressable onPress={() => setIsCountryModalVisible(false)}>
                <Text style={[styles.modalClose, { color: theme.colors.textSecondary }]}>✕</Text>
              </Pressable>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {countries.map((country) => {
                const isEnabled = enabledCountries.includes(country);
                const isSelected = preferredCountry === country;
                return (
                  <Pressable
                    key={country}
                    style={[
                      styles.countryItem,
                      { borderBottomColor: theme.colors.border },
                      !isEnabled && styles.countryItemDisabled,
                    ]}
                    onPress={() => handleCountrySelect(country)}
                    disabled={!isEnabled}
                  >
                    <Text
                      style={[
                        styles.countryText,
                        {
                          color: isEnabled
                            ? theme.colors.textPrimary
                            : theme.colors.textMuted,
                        },
                        isSelected && { fontWeight: '600' },
                      ]}
                    >
                      {country}
                    </Text>
                    {isSelected && (
                      <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg * 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  headerInfo: {
    marginBottom: spacing.lg,
  },
  nameContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  memberText: {
    fontSize: 14,
  },
  proBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  proBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  upgradeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  upgradeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconText: {
    fontSize: 16,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuItemValue: {
    fontSize: 14,
  },
  arrow: {
    fontSize: 20,
  },
  notificationDescription: {
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: spacing.md + 24 + spacing.md, // Align with menu item text
    paddingRight: spacing.md,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg * 2,
  },
  logoutButton: {
    marginBottom: spacing.md,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '400',
  },
  versionText: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalClose: {
    fontSize: 24,
    fontWeight: '300',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
  },
  countryItemDisabled: {
    opacity: 0.5,
  },
  countryText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: '600',
  },
});
