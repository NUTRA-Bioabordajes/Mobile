import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';




export default function DetalleReceta() {
const route = useRoute();
  const { receta } = route.params;
  const navigation = useNavigation();


  const toggleFavorito = (id) => {
    setFavoritos((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.contenedorDetalle}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
        name="arrow-back-outline"
        size={28}
        color="black"
        />
      </TouchableOpacity>
      <Text style={styles.detalleTexto}>Detalle</Text>
    </View>


    <View>
      <Image
        source={{ uri: receta.Foto }}
        resizeMode="contain"
        style={styles.imagenProducto}
      />
      <Text style={styles.titulo}>{receta.Nombre}</Text>
      <TouchableOpacity onPress={() => toggleFavorito(recetas.idReceta)}>
          <Ionicons
            name={favoritos[recetas.idReceta] ? 'heart' : 'heart-outline'}
            size={30}
            color={favoritos[recetas.idReceta] ? 'red' : 'black'}
          />
        </TouchableOpacity>
      <Text style={styles.titulo}>Descripción</Text>
      <Text style={styles.nombre}>{receta.Descripcion}</Text>
      </View>


      <View>
      <Text style={styles.titulo}>Ingredientes</Text>
      {ingredientes.map((Ingredientes) => (
              <View  key={ingredientes.idIngredientes}>
                <Image style={styles.textIntolerancia}>{Ingredientes.Foto}</Image>
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
