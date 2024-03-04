import { StyleSheet, View } from 'react-native';
import Routes from './Routes';
import UserProvider from './src/providers/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <View style={styles.main}>
        <Routes></Routes>
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})