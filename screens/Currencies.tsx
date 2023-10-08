import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import Colors from '../constants/Colors';

export default function Currencies() {
const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
        },
      ]}>
      <Text style={styles.title}>Kurlar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#dfdfdf"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});