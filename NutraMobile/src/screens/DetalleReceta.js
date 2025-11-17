import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../api/api';

import detalleRecetaStyles from '../../assets/styles/detalleRecetasStyles';

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
  };

  return (
    <SafeAreaView style={detalleRecetaStyles.container}>
      <StatusBar style="auto" />

      {/* Barra superior */}
      <View style={detalleRecetaStyles.contenedorDetalle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={detalleRecetaStyles.detalleTexto}>Detalle</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagen principal */}
        <Image
          source={{ uri: receta.Foto }}
          style={detalleRecetaStyles.imagenProducto}
        />

        {/* Nombre y favorito */}
        <Text style={detalleRecetaStyles.titulo}>{receta.Nombre}</Text>
        {/*<TouchableOpacity onPress={() => toggleFavorito(receta.idReceta)} style={{ alignSelf: 'center', marginVertical: 8 }}>
          <Ionicons
            name={favoritos[receta.idReceta] ? 'heart' : 'heart-outline'}
            size={30}
            color={favoritos[receta.idReceta] ? 'red' : 'black'}
          />
        </TouchableOpacity>*/}

        {/* Descripción */}
        <Text style={detalleRecetaStyles.descripcionTitulo}>Descripción</Text>
        <Text style={detalleRecetaStyles.descripcionTexto}>
          {receta.Descripcion}
        </Text>

        {/* Vitaminas */}
        <View style={detalleRecetaStyles.vitaminasContainer}>
          <View style={detalleRecetaStyles.vitaminaChip}>
            <Text style={detalleRecetaStyles.vitaminaTexto}>Vitamina A</Text>
          </View>
          <View style={detalleRecetaStyles.vitaminaChip}>
            <Text style={detalleRecetaStyles.vitaminaTexto}>Vitamina C</Text>
          </View>
          <View style={detalleRecetaStyles.vitaminaChip}>
            <Text style={detalleRecetaStyles.vitaminaTexto}>Vitamina K</Text>
          </View>
        </View>

        {/* Ingredientes */}
        <Text style={detalleRecetaStyles.ingredientesTitulo}>Ingredientes</Text>
        <View style={detalleRecetaStyles.ingredientesContainer}>
          {ingredientes.map((ingrediente) => (
            <View key={ingrediente.Nombre} style={detalleRecetaStyles.ingredienteCard}>
              <Image
                source={{ uri: ingrediente.Foto }}
                style={detalleRecetaStyles.ingredienteImg}
              />
            </View>
          ))}
        </View>

        {/* Botón Preparar */}
        <View style={detalleRecetaStyles.botonContainer}>
        <TouchableOpacity
          style={detalleRecetaStyles.botonPreparar}
          onPress={() => navigation.navigate("Preparacion", { receta })}
        >
          <Text style={detalleRecetaStyles.botonTexto}>¡Preparar!</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
