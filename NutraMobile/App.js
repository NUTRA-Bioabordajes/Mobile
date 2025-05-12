import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Image
      source={require('./assets/LOGO-transparente.png')}
      />
      <StatusBar style="auto" />

      <View style={styles.container}>
      
      <TextInput
          style={styles.input}
          placeholder="Ingrese su Usuario"
        />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
