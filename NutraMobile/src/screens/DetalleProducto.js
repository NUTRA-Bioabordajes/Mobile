import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import detalleProductoStyles from '../../assets/styles/detalleProductoStyles.js';

export default function DetalleProducto() {
  const route = useRoute();
  const { producto } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={detalleProductoStyles.container}>

      {/* Botón atrás */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={detalleProductoStyles.botonAtras}>
        <Ionicons name="arrow-back-outline" size={28} color="black" />
      </TouchableOpacity>

      {/* Imagen principal */}
      <Image
        source={{ uri: producto.Foto }}
        style={detalleProductoStyles.imagenProducto}
      />

      {/* Tarjeta blanca con detalles */}
      <View style={detalleProductoStyles.tarjetaInfo}>

        {/* Nombre y precio */}
        <View style={detalleProductoStyles.encabezado}>
          <Text style={detalleProductoStyles.titulo}>{producto.Nombre}</Text>
          <Text style={detalleProductoStyles.precio}>${producto.Precio}</Text>
        </View>

        {/* Fila de detalles */}
        <View style={detalleProductoStyles.detallesRow}>
          <View style={detalleProductoStyles.detalleItem}>
            <Ionicons name="cube-outline" size={18} color="#5A6B3C" />
            <Text style={detalleProductoStyles.detalleTexto}>500 gramos</Text>
          </View>

          <View style={detalleProductoStyles.detalleItem}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#5A6B3C" />
            <Text style={detalleProductoStyles.detalleTexto}>En stock</Text>
          </View>

          <View style={detalleProductoStyles.detalleItem}>
            <Ionicons name="document-text-outline" size={18} color="#5A6B3C" />
            <Text style={detalleProductoStyles.detalleTexto}>Tabla nutricional</Text>
          </View>
        </View>

        {/* Descripción */}
        <Text style={detalleProductoStyles.descripcionTitulo}>Descripción</Text>
        <Text style={detalleProductoStyles.descripcionTexto}>
          {producto.DetalleProducto}
        </Text>

        {/* Botón Añadir */}
        <TouchableOpacity style={detalleProductoStyles.botonContainer}>
          <Text style={detalleProductoStyles.precioBoton}>${producto.Precio}</Text>
          <Ionicons
            name="cart-outline"
            size={22}
            color="#fff"
            style={detalleProductoStyles.iconoCarrito}
          />
          <Text style={detalleProductoStyles.botonTexto}>Añadir</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
