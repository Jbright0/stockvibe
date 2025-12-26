import { View, StyleSheet } from 'react-native';

interface ProfileIconProps {
  color?: string;
  size?: number;
}

export default function ProfileIcon({ color = '#9CA3AF', size = 24 }: ProfileIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Head circle */}
      <View style={[styles.head, { backgroundColor: color }]} />
      {/* Body */}
      <View style={[styles.body, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 2,
  },
  body: {
    width: 16,
    height: 10,
    borderRadius: 8,
  },
});

