import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetalleReceta from './DetalleReceta.js'
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

    useEffect(() => {
      if (!usuario || !token) return;
      fetch(`https://actively-close-beagle.ngrok-free.app/usuarios/${usuario.id}/recetas`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('recetas recibidas:', data);
          setRecetas(data);
        })
        .catch(err => {
          console.error('Error cargando recetas:', err);
          setError(err.message);
        });
    }, [usuario, token]);

    const toggleFavorito = (id) => {
      setFavoritos((prev) => ({
        ...prev,
        [id]: !prev[id]
      }));
    };

    if (!usuario) {
      return <Text>Cargando usuario...</Text>;
    }
    
    return (
      
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Recetas</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.contenedorProductos}>
     {recetas.map((recetas) => (
      <Pressable key={recetas.idReceta} style={styles.cardProducto} onPress={() => navigation.navigate('DetalleReceta', { receta: recetas })}>
         <Image 
          source={{ uri: recetas.Foto }} 
          resizeMode='contain' 
          style={styles.imagenProducto} 
        />
        
        <Text style={styles.nombreProducto}>{recetas.Nombre}</Text> 
        <TouchableOpacity onPress={() => toggleFavorito(recetas.idReceta)}>
          <Ionicons 
            name={favoritos[recetas.idReceta] ? 'heart' : 'heart-outline'} 
            size={30} 
            color={favoritos[recetas.idReceta] ? 'red' : 'black'} 
          />
        </TouchableOpacity>
      </Pressable>
    ))}
  </View>
</ScrollView>
    </SafeAreaView>
  );
}