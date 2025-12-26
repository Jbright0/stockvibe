import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, colors, spacing, radius } from './tokens';

// Create light theme from existing tokens
const lightTheme = {
  colors: {
    background: colors.bg,
    surface: colors.card,
    surfaceMuted: colors.card,
    border: colors.border,
    textPrimary: colors.text,
    textSecondary: colors.muted,
    textMuted: colors.muted,
    primary: colors.primary,
    primaryPressed: colors.primary,
    icon: colors.muted,
    placeholder: colors.muted,
    success: '#22C55E',
    danger: '#EF4444'
  },
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: 32
  },
  radius: {
    sm: radius.sm,
    md: radius.md,
    lg: 18,
    pill: 999
  },
  typography: {
    title: 32,
    subtitle: 16,
    body: 15,
    label: 13
  }
};

interface ThemeContextType {
  theme: typeof darkTheme;
  isDark: boolean;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('theme').then(v => {
      if (v) setIsDark(v === 'dark');
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await AsyncStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        isDark,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
