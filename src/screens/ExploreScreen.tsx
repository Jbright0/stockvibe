import { Text, View } from 'react-native';
import Screen from '../components/Screen';

export default function ExploreScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Explore</Text>

      <View style={{ marginTop: 16 }}>
        <Text>Stocks</Text>
        <Text>Sectors</Text>
      </View>
    </Screen>
  );
}
