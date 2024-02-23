import { StyleSheet, Text, View } from 'react-native';
import Routes from './Routes';

export default function App() {
  return (
    <View style={styles.container}>
      <Routes></Routes>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
