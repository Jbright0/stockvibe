import { View, StyleSheet } from 'react-native';

interface BookmarkIconProps {
  color?: string;
  size?: number;
}

export default function BookmarkIcon({ color = '#9CA3AF', size = 24 }: BookmarkIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Bookmark body */}
      <View style={[styles.body, { backgroundColor: color }]} />
      {/* Triangular notch at bottom */}
      <View style={[styles.triangle, { borderTopColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  body: {
    width: '70%',
    height: '75%',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
});

