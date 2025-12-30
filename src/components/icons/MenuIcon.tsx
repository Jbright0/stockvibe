import { View, StyleSheet } from 'react-native';

interface MenuIconProps {
  color?: string;
  size?: number;
}

export default function MenuIcon({ color = '#9CA3AF', size = 24 }: MenuIconProps) {
  // Make dots slightly larger for better visibility
  const dotSize = size * 0.22;
  // Use a fixed gap size that provides good spacing between dots
  // This ensures the dots are well-spaced and legible
  const gapSize = size * 0.18;
  // Center the dots vertically within the icon
  const totalDotsHeight = (dotSize * 3) + (gapSize * 2);
  const startTop = (size - totalDotsHeight) / 2;
  
  const topDotTop = startTop;
  const middleDotTop = startTop + dotSize + gapSize;
  const bottomDotTop = startTop + (dotSize * 2) + (gapSize * 2);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.dot, { width: dotSize, height: dotSize, backgroundColor: color, top: topDotTop }]} />
      <View style={[styles.dot, { width: dotSize, height: dotSize, backgroundColor: color, top: middleDotTop }]} />
      <View style={[styles.dot, { width: dotSize, height: dotSize, backgroundColor: color, top: bottomDotTop }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    borderRadius: 50,
  },
});

