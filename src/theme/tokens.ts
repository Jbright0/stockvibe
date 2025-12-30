// theme.ts

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999
};

// Shared color values used across the app
export const colors = {
  primary: "#2B6CEE",
  risk: "#D4A574",
  oppty: "#6BA3E8", // opportunity
  opportunity: "#6BA3E8",
  neutral: "#9CA3AF",
};

/* =========================
   LIGHT THEME (EXISTING)
   ========================= */

export const lightTheme = {
  mode: "light",

  colors: {
    background: "#FFFFFF",
    surface: "#F7F8FA",
    surfaceMuted: "#FFFFFF",

    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",

    primary: "#2B6CEE",
    border: "#E5E7EB",

    // Signals / status
    opportunity: "#6BA3E8", // Blue mute
    risk: "#D4A574",        // Soft amber
    neutral: "#9CA3AF",

    // Icons & misc
    icon: "#6B7280",
    placeholder: "#9CA3AF"
  },

  typography: {
    title: 32,
    subtitle: 16,
    body: 15,
    label: 13
  }
};

/* =========================
   DARK THEME
   ========================= */

export const darkTheme = {
  mode: "dark",

  colors: {
    background: "#0B1220",        // main background
    surface: "#121A2A",           // cards / sections
    surfaceMuted: "#1A2233",

    textPrimary: "#FFFFFF",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",

    primary: "#2563EB",
    primaryPressed: "#1D4ED8",

    border: "#273044",

    // Signals / status (semantic parity with light)
    opportunity: "#6BA3E8",
    risk: "#D4A574",
    neutral: "#9CA3AF",

    // Icons & misc
    icon: "#9CA3AF",
    placeholder: "#6B7280"
  },

  typography: {
    title: 32,
    subtitle: 16,
    body: 15,
    label: 13
  }
};
