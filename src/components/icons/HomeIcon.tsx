import { View, StyleSheet } from 'react-native';

interface HomeIconProps {
  color?: string;
  size?: number;
}

export default function HomeIcon({ color = '#2B6CEE', size = 24 }: HomeIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* House roof (triangle) */}
      <View style={[styles.roof, { borderBottomColor: color }]} />
      {/* House body (rectangle) */}
      <View style={[styles.body, { backgroundColor: color }]} />
      {/* Door */}
      <View style={styles.door} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: -1,
  },
  body: {
    width: 16,
    height: 12,
    borderRadius: 1,
  },
  door: {
    position: 'absolute',
    bottom: 0,
    width: 5,
    height: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
});

