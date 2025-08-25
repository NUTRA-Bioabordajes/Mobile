import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Recetas() {
  const navigation = useNavigation();

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState({});
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Cargar usuario y token desde AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser) setUsuario(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (err) {
        console.error("Error cargando usuario o token:", err);
      }
    };
    loadUser();
  }, []);

  // Cargar recetas
  useEffect(() => {
    if (!usuario || !token) return;

    const userId = parseInt(usuario.id, 10); 

    console.log("Usuario cargado:", usuario);

    fetch(`https://actively-close-beagle.ngrok-free.app/recetas/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Recetas RAW:', data);
        // Siempre forzamos array aunque venga un solo objeto
        const recetasArray = Array.isArray(data) ? data : [data];
        setRecetas(recetasArray);
      })
      .catch(err => {
        console.error('Error cargando recetas:', err);
        setError(err.message);
      });
  }, [usuario, token]);

  const toggleFavorito = (id) => {
    setFavoritos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!usuario) return <Text>Cargando usuario...</Text>;

  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Recetas</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.contenedorProductos}>
          {recetas.map(receta => (
            <Pressable key={receta.idReceta} style={styles.cardProducto} onPress={() => navigation.navigate('DetalleReceta', { receta })}
            >
              <Image
                source={{ uri: receta.Foto }}
                resizeMode='contain'
                style={styles.imagenProducto}
              />
              <Text style={styles.nombreProducto}>{receta.Nombre}</Text>
              <TouchableOpacity onPress={() => toggleFavorito(receta.idReceta)}>
                <Ionicons
                  name={favoritos[receta.idReceta] ? 'heart' : 'heart-outline'}
                  size={30}
                  color={favoritos[receta.idReceta] ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
