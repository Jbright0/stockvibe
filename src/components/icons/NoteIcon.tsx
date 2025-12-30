import { View, StyleSheet } from 'react-native';

interface NoteIconProps {
  color?: string;
  size?: number;
  filled?: boolean;
}

export default function NoteIcon({ color = '#9CA3AF', size = 24, filled = false }: NoteIconProps) {
  const paperWidth = size * 0.7;
  const paperHeight = size * 0.8;
  const cornerSize = size * 0.2;
  const paperTop = size * 0.1;
  const paperLeft = size * 0.15;
  const cornerRight = size * 0.15;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Note paper shape */}
      <View 
        style={[
          styles.paper, 
          { 
            width: paperWidth, 
            height: paperHeight,
            top: paperTop,
            left: paperLeft,
            borderColor: color,
            backgroundColor: filled ? color : 'transparent',
          }
        ]} 
      />
      {/* Corner fold */}
      <View 
        style={[
          styles.corner, 
          { 
            width: cornerSize, 
            height: cornerSize,
            right: cornerRight,
            borderRightColor: color,
            borderBottomColor: color,
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  paper: {
    borderWidth: 1.5,
    borderRadius: 2,
    position: 'absolute',
  },
  corner: {
    position: 'absolute',
    top: 0,
    borderWidth: 1.5,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderTopRightRadius: 2,
  },
});

