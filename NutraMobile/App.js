import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

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
    //flex: 3,
    fontFamily: 'Inter',
    fontSize: 24,
    margin: 50
  },
  fotoPerfil:{
    flex: 1,
    justifyContent: 'center',
    width: '120px',
    height: '120px',
    flexDirection: 'row'
  },
  user:{
    flexDirection: 'row',
   

  },
  nombre:{
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '20px',
    margin: '5px'
  },
  edad:{
    fontFamily: 'Inter',
    fontSize: 18,
    //opacity: '0.6',
    margin: '5px'

  },
  barrio:{
    flexDirection: 'row'
  }

});