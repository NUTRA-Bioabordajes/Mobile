import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../api/api'; // 🔹 importamos la instancia de Axios con interceptor

export default function DetalleReceta() {
  const route = useRoute();
  const { receta } = route.params;
  const navigation = useNavigation();

  const [ingredientes, setIngredientes] = useState([]);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState({});

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const res = await api.get(`/recetas/${receta.idReceta}/ingredientes`);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setIngredientes(data);
        console.log('ingredientes recibidos:', data);
      } catch (err) {
        console.error('Error cargando ingredientes:', err.message || err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchIngredientes();
  }, [receta.idReceta]);

  const toggleFavorito = (id) => {
    setFavoritos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.contenedorDetalle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.detalleTexto}>Detalle</Text>
      </View>

      <View>
        <Image source={{ uri: receta.Foto }} resizeMode="contain" style={styles.imagenProducto} />
        <Text style={styles.titulo}>{receta.Nombre}</Text>
        <TouchableOpacity onPress={() => toggleFavorito(receta.idReceta)}>
          <Ionicons
            name={favoritos[receta.idReceta] ? 'heart' : 'heart-outline'}
            size={30}
            color={favoritos[receta.idReceta] ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <Text style={styles.titulo}>Descripción</Text>
        <Text style={styles.nombre}>{receta.Descripcion}</Text>
      </View>

      <View>
        <Text style={styles.titulo}>Ingredientes</Text>
        {ingredientes.map((ingrediente) => (
          <View key={ingrediente.Nombre}>
            <Image
              source={{ uri: ingrediente.Foto }}
              style={{ width: 50, height: 50, backgroundColor: 'lightgray' }}
            />
          </View>
        ))}
      </View>

      <View style={styles.botonContainer}>
        <TouchableOpacity style={styles.botonPreparar} onPress={() => console.log("Preparar receta")}>
          <Text style={styles.botonTexto}>Preparar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
