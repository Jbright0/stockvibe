import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/tokens';

interface BriefIconProps {
  color?: string;
  size?: number;
}

export default function BriefIcon({ color = colors.primary, size = 24 }: BriefIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Wavy top edge */}
      <View style={[styles.wavyTop, { backgroundColor: color }]} />
      {/* Document body */}
      <View style={[styles.body, { backgroundColor: color }]}>
        {/* Top lines */}
        <View style={styles.content}>
          <View style={[styles.line, styles.line1, { backgroundColor: '#FFFFFF' }]} />
          <View style={[styles.line, styles.line2, { backgroundColor: '#FFFFFF' }]} />
          {/* Image square and line */}
          <View style={styles.imageRow}>
            <View style={[styles.imageSquare, { backgroundColor: '#FFFFFF' }]} />
            <View style={[styles.line, styles.line3, { backgroundColor: '#FFFFFF' }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wavyTop: {
    width: '100%',
    height: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  body: {
    width: '100%',
    flex: 1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    padding: 3,
  },
  content: {
    flex: 1,
    padding: 2,
  },
  line: {
    height: 2,
    marginBottom: 2,
    borderRadius: 1,
  },
  line1: {
    width: '90%',
  },
  line2: {
    width: '85%',
  },
  line3: {
    width: '60%',
    flex: 1,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 2,
  },
  imageSquare: {
    width: 8,
    height: 8,
    borderRadius: 1,
  },
});

