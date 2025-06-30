import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Tienda() { 
  const navigation = useNavigation();

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState({});
  useEffect(() => {
    
    fetch('https://actively-close-beagle.ngrok-free.app/productos/') 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('productos recibidos:', data);
        setProductos(data);
      })
      .catch(err => {
        console.error('Error cargando productos:', err);
        setError(err.message);
      });
  }, []);

  const toggleFavorito = (id) => {
    setFavoritos((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!productos.length && !error) 
  return <Text>Cargando productos...</Text>;

    return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Tienda</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
  <View style={styles.contenedorProductos}>
    {productos.map((producto) => (
      <View key={producto.idProducto} style={styles.cardProducto}>
        <Image 
          source={{ uri: producto.Foto || 'https://via.placeholder.com/150' }} 
          resizeMode='contain' 
          style={styles.imagenProducto} 
        />
        <Text style={styles.nombreProducto}>{producto.Nombre}</Text>
        <Text style={styles.precioProducto}>${producto.Precio}</Text>

        <TouchableOpacity onPress={() => toggleFavorito(producto.idProducto)}>
          <Ionicons 
            name={favoritos[producto.idProducto] ? 'heart' : 'heart-outline'} 
            size={30} 
            color={favoritos[producto.idProducto] ? 'red' : 'black'} 
          />
        </TouchableOpacity>
      </View>
    ))}
  </View>
</ScrollView>
    </SafeAreaView>
  );
}