import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/styles/styles.js';


export default function DetalleProducto() {
  const route = useRoute();
  const { producto } = route.params;
  const navigation = useNavigation();


  return (
    <ScrollView     >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.botonAtras}>
        <Ionicons name="arrow-back-outline" size={28} color="black" />
      </TouchableOpacity>
      <Image
        source={{ uri: producto.Foto }}
        resizeMode="cover"
        style={styles.imagenProductoGrande}
      />
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>{producto.Nombre}</Text>
        <Text style={styles.precioProducto}>${producto.Precio}</Text>
      </View>
 
     
     
      <View style={styles.infoContainer}>
        <Text style={styles.descripcionTitulo}>Descripción</Text>
        <Text style={styles.descripcion}>{producto.DetalleProducto}</Text>
      </View>
 
      <View style={styles.detalles}>
        <Text style={styles.detalleTexto}>500 gramos</Text>
        <Text style={styles.detalleTexto}>En stock</Text>
        <Text style={styles.detalleTexto}>Tabla nutricional</Text>
      </View>
 
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonAgregar}>
          <Text style={styles.botonTexto}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
 
}
