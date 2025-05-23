import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import styles  from './assets/styles/styles';

//npx expo install expo-font 
const logo = require('./assets/images/LOGO-transparente.png')
const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'};
const iconoUbi = require('./assets/icons/iconoUbicacion.png')
export default function App() {

  useFonts({
    'Inter': require('./assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  
  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Perfil</Text> 
      
      
      <View style={styles.user}>
        <Image source={imgPerfil} resizeMode='contain' style={styles.fotoPerfil}/>
        <View style = {{margin: '20px'}}> 
          <Text style={styles.nombre}>Felipe</Text> 
          <Text style={styles.edad}>8 años</Text>
          <View style = {styles.barrio}>
            <Image source={iconoUbi} resizeMode='contain'/>
            <Text style={styles.edad}>Caballito</Text>
          </View>  
           
        </View>
      </View>
      <View style={styles.diagnosticos}>
      <Text style={styles.subtitulo}>Diagnósticos</Text>
      <Text style={styles.subtitulo}>Intolerancias</Text>

      </View>

    
    </SafeAreaView>
    
  );
}

