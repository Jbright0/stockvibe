import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/tokens';

export default function CustomBackButton() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.goBack()}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name="arrow-back"
        size={20}
        color={theme.colors.textPrimary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: Platform.OS === 'ios' ? spacing.sm : 0,
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

