import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logoNutra from '../../assets/images/logoNutra.png';
import fondoTienda from '../../assets/images/fondoTienda.png';

const { width } = Dimensions.get('window');

export default function Home() {
  const [fontsLoaded] = useFonts({
    Inter: require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf'),
  });

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener novedades desde la API
  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log("🔑 TOKEN ENCONTRADO:", token);

        const response = await axios.get(
          'http://actively-close-beagle.ngrok-free.app/novedades/mobile',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setNovedades(response.data || []);
      } catch (error) {
        console.error('Error cargando novedades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovedades();
  }, []);

  // Auto-scroll del carrusel
  useEffect(() => {
    if (novedades.length === 0) return;

    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % novedades.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, novedades]);

  if (!fontsLoaded || loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.flyer ? (
        <Image source={{ uri: item.flyer }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#777' }}>Sin imagen</Text>
        </View>
      )}
      <View style={styles.cardTextContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
      </View>
    </View>
  );

  // Duplicamos los datos para simular carrusel infinito
  const carouselData = [...novedades, ...novedades];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FCF9F2', paddingBottom: 50 }}>
      <Image source={logoNutra} style={styles.img} />
      
      {novedades.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={carouselData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            let index = Math.floor(event.nativeEvent.contentOffset.x / width);
            if (index >= novedades.length) {
              index = index % novedades.length;
              flatListRef.current.scrollToIndex({ index, animated: false });
            }
            setCurrentIndex(index % novedades.length);
          }}
          style={{ flexGrow: 0, marginVertical: 20 }}
        />
      ) : (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 16, color: '#777' }}>
            No hay novedades disponibles
          </Text>
        </View>
      )}

      {/* BOTÓN CON IMAGEN DE FONDO */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://bioabordajes.org.ar/productos/')}>
          <Image source={fondoTienda} style={styles.buttonBg} />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>Ir al Ecommerce</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F2', 
  },
  img: {
    width: width * 0.3,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  card: {
    width: width * 0.8,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: width * 0.05 / 2,
    marginLeft: 10
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    padding: 12,
  },
  nombre: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  descripcion: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonBg: {
    width: width * 0.9,
    height: 120,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  buttonTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.9,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});
