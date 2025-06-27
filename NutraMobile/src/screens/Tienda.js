import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { Button, ScrollView } from 'react-native-web';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Tienda() { 
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

  // Estado para controlar si está marcado como favorito
  const [favorito, setFavorito] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Tienda</Text>


{/*foreach array productos*/}

      <View style={styles.cardProducto}>
        <Image 
          source={{ uri: 'https://acdn-us.mitiendanube.com/stores/004/957/221/products/diseno-sin-titulo-4ae740abf599f1772b17221869849746-1024-1024.png' }} 
          resizeMode='contain' 
          style={styles.imagenProducto} 
        />
        <Text style={styles.nombreProducto}>Broma de Eucalipto</Text>
        <Text style={styles.marcaProducto}>Ardra</Text>
        <Text style={styles.precioProducto}>$4.050</Text>

        <TouchableOpacity onPress={() => setFavorito(!favorito)}>
          <Ionicons 
            name={favorito ? 'heart' : 'heart-outline'} 
            size={30} 
            color={favorito ? 'red' : 'black'} 
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
