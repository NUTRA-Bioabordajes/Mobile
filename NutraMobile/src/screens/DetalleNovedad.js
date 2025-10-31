import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../api/api';

export default function DetalleNovedad({route}) {
   
        const { novedad } = route.params;
       
      
  /*const route = useRoute();
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
        console.log('Error cargando ingredientes:', err.message || err);
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
  };*/

  return (
   <Text>DETALLE NOVEDAD</Text>
  );
  }
