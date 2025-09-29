import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../api/api'; // 🔹 importamos la instancia de Axios con interceptor

export default function Tienda() {
  const navigation = useNavigation();

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get('/productos/');
        setProductos(Array.isArray(res.data) ? res.data : [res.data]);
        console.log('productos recibidos:', res.data);
      } catch (err) {
        console.error('Error cargando productos:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchProductos();
  }, []);

  const toggleFavorito = (id) => {
    setFavoritos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!productos.length && !error) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Tienda</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.contenedorProductos}>
          {productos.map(producto => (
            <Pressable
              key={producto.idProducto}
              style={styles.cardProducto}
              onPress={() => navigation.navigate('DetalleProducto', { producto })}
            >
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
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
