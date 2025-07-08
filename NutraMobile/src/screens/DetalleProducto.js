import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DetalleProducto() {
const route = useRoute();
  const { producto } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{producto.Nombre}</Text>
      <Image
        source={{ uri: producto.Foto }}
        resizeMode="contain"
        style={styles.imagenProducto}
      />
      <Text style={styles.titulo}>{producto.DetalleProducto}</Text>
    </View>
  );
}