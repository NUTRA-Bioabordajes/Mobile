import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

//npx expo install expo-font 

const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'}
export default function App() {

  useFonts({
    'Inter': require('./assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  
  const logo = require('./assets/LOGO-transparente.png')
  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Perfil</Text> 
      <Image source={imgPerfil} resizeMode= 'cover' style={styles.fotoPerfil}></Image>
      <View style={styles.User}>
       
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
  titulo:{
    flex: 3,
    fontFamily: 'Inter',
    fontSize: 24,
    margin: 50
  },
  fotoPerfil:{
    flex: 1,
    justifyContent: 'center'
  },

});
