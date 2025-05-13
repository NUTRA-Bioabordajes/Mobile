import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';


export default function App() {
  const fondo = require('./assets/fondo-login.png')
  const logo = require('./assets/LOGO-transparente.png')
  return (
    <SafeAreaView style={styles.container}>
      <Image
      source = {logo}
      />
      <StatusBar style="auto" />

      <View style={styles.container}>
      
      <TextInput
          style={styles.input}
          placeholder="Ingrese su Usuario"
        />
      </View>
    </SafeAreaView>
    
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
