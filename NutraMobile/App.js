import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import styles  from './assets/styles/styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import perfil from './src/screens/perfil'

//npx expo install expo-font 
//const logo = require('./assets/images/LOGO-transparente.png')
const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'};

const Tab = createBottomTabNavigator();
// function StackHome() {
//   return (
//     <StackHome.Navigator>
//       {<StackHome.Screen name="ScreenA1" component={ScreenA1} />
//       <StackHome.Screen name="ScreenA2" component={ScreenA2} /> }
//     </StackHome.Navigator>
//   );
// }

function StackPerfil() {
  return (
    <StackPerfil.Navigator>
      <StackPerfil.Screen name="perfil" component={perfil} />
    </StackPerfil.Navigator>
  );
}



function MyTabs() {
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="perfil"   component={StackPerfil}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
           ),
        }}
      />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}




