import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'; // instancia de Axios con interceptor
import styles from '../../assets/styles/styles.js';

export default function Tienda() {
  const navigation = useNavigation();

  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState({});
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar usuario y token
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser) setUsuario(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (err) {
        console.error("Error cargando usuario o token:", err);
        setError("Error al cargar usuario");
      }
    };
    loadUser();
  }, []);

  // 🔹 Traer productos
  useEffect(() => {
    if (!token) return;
    const fetchProductos = async () => {
      try {
        const res = await api.get('/productos/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        console.error("Error cargando productos:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [token]);

  // 🔹 Traer favoritos del usuario
  useEffect(() => {
    if (!usuario || !token) return;
    const loadFavoritos = async () => {
      try {
        const res = await api.get(`/favoritos/${usuario.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        console.log("Favoritos productos recibidos:", data);

        const favMap = {};
        if (Array.isArray(data)) {
          data.forEach(fav => {
            if (fav.idProducto) favMap[fav.idProducto] = true;
          });
        }
        setFavoritos(favMap);
      } catch (err) {
        console.error("Error cargando favoritos productos:", err);
      }
    };
    loadFavoritos();
  }, [usuario, token]);

  // 🔹 Toggle favoritos (POST/DELETE)
  const toggleFavorito = async (idProducto) => {
    if (!usuario || !token) return;

    const alreadyFav = favoritos[idProducto];

    try {
      const url = 'https://actively-close-beagle.ngrok-free.app/favoritos';
      const method = alreadyFav ? 'DELETE' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ idUsuario: usuario.id, idProducto })
      });

      if (!res.ok) {
        console.error('Error modificando favorito producto:', await res.text());
        return;
      }

      setFavoritos(prev => ({
        ...prev,
        [idProducto]: !prev[idProducto]
      }));
    } catch (err) {
      console.error("Error al modificar favorito producto:", err);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;

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
