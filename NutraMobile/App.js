import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import styles  from './assets/styles/styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//npx expo install expo-font 
const logo = require('./assets/images/LOGO-transparente.png')
const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'};
const iconoUbi = require('./assets/icons/iconoUbicacion.png')
const Tab = createBottomTabNavigator();

/*function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"     component={StackANavigator} />
      <Tab.Screen name="ECommerce" component={StackBNavigator} />
      <Tab.Screen name="Recetas"   component={StackCNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
           ),
        }}
      />
      <Tab.Screen name="Favoritos" component={StackBNavigator} />
      <Tab.Screen name="Perfil" component={StackBNavigator} />
    </Tab.Navigator>
  );
}

 function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  ); HACER NAV QUE SOLO LLEVE A PERFIL*/



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




