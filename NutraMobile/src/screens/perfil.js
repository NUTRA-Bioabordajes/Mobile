import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';


export default function perfil() {
  
  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });
    const iconoUbi = require('../../assets/icons/iconoUbicacion.png')
    const navigation = useNavigation();
    const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'};
    
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
  
        <View style={styles.fichaMedica}>
          <View style={styles.categoria}>
            <Text style={styles.subtitulo}>Diagnósticos:</Text>
            <View style={styles.tagContainer}>
              <View style={styles.tagVerde}>
                <Text style={styles.textDiagnostico}>TDAH</Text>
              </View>
            </View>
          </View>
  
          <View style={styles.categoria}>
            <Text style={styles.subtitulo}>Intolerancias:</Text>
            <View style={styles.tagContainer}>
              <View style={styles.tagRojo}>
                <Text style={styles.textIntolerancia}>Gluten</Text>
              </View>
              <View style={styles.tagRojo}>
                <Text style={styles.textIntolerancia}>Caseína</Text>
              </View>
            </View>
          </View>
        </View>
        
      
      </SafeAreaView>
      
    );
  }