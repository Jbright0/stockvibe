import { View, StyleSheet } from 'react-native';

interface ExploreIconProps {
  color?: string;
  size?: number;
}

export default function ExploreIcon({ color = '#2B6CEE', size = 24 }: ExploreIconProps) {
  // The icon has a colored circle background with white diamond
  // When focused: primary color circle with white diamond
  // When not focused: muted color circle with white diamond
  const circleColor = color;
  const diamondColor = '#FFFFFF';
  const centerDotColor = color;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Circular background */}
      <View style={[styles.circle, { backgroundColor: circleColor }]} />
      {/* Diamond/compass shape - rotated square */}
      <View style={[styles.diamond, { borderColor: diamondColor }]} />
      {/* Center dot - same color as circle */}
      <View style={[styles.centerDot, { backgroundColor: centerDotColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    position: 'absolute',
  },
  diamond: {
    width: '50%',
    height: '50%',
    position: 'absolute',
    borderWidth: 2.5,
    transform: [{ rotate: '45deg' }],
  },
  centerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
});

