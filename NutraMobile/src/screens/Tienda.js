import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { Button, ScrollView } from 'react-native-web';


export default function Tienda( ) { 
  const navigation = useNavigation();

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  /*useEffect(() => {
    
    fetch(`https://actively-close-beagle.ngrok-free.app/productos`) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('productos recibidos:', data);
        setUsuario(data);
      })
      .catch(err => {
        console.error('Error cargando productos:', err);
        setError(err.message);
      });
  }, []);*/

  const iconoFavorito = require('../../assets/icons/corazon.png');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Tienda</Text>
  
      <View style={styles.cardProducto}>
        <Text style={styles.nombreProducto}>Broma de Eucalipto</Text>
        <Text style={styles.marcaProducto}>Ardra</Text>
        <Text style={styles.precioProducto}>$4.050</Text>
  
        <TouchableOpacity onPress={() => { /* si querés hacer algo al tocar */ }}>
          <Image
            source={iconoFavorito}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
  
      </View>
    </SafeAreaView>
  );
}
