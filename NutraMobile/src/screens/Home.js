import React, { useState, useEffect, useRef } from 'react';
import { 
  View, FlatList, Image, Dimensions, StyleSheet, Text, 
  ActivityIndicator, ScrollView, TouchableOpacity, Linking 
} from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import logoNutra from '../../assets/images/logoNutra.png';
import fondoTienda from '../../assets/images/fondoTienda.png';

const { width } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Inter: require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf'),
  });

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovedades = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          'http://actively-close-beagle.ngrok-free.app/novedades/mobile',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNovedades(response.data || []);
      } catch (error) {
        console.log('Error cargando novedades:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNovedades();
  }, []);

  // Auto-scroll
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

  const cardWidth = width * 0.7;
  const separatorWidth = (width - cardWidth) / 2;
  const carouselData = [...novedades, ...novedades]; // duplicamos para carrusel infinito

  const renderItem = ({ item, index }) => {
    const isActive = index % novedades.length === currentIndex;

    return (
      <TouchableOpacity
        style={[styles.card, isActive && styles.activeCard]}
        onPress={() => navigation.navigate('DetalleNovedad', { novedad: item })}
        activeOpacity={0.8}
      >
        {item.flyer ? (
          <Image source={{ uri: item.flyer }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#777' }}>Sin imagen</Text>
          </View>
        )}
        <View style={styles.cardTextContainer}>
          <Text style={[styles.nombre, isActive && styles.activeNombre]}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: '#FCF9F2', paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Image source={logoNutra} style={styles.img} />

      {novedades.length > 0 ? (
        <View style={{ marginVertical: 20 }}>
          <FlatList
            ref={flatListRef}
            data={carouselData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={cardWidth}
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              let index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
              if (index >= novedades.length) index = index % novedades.length;
              setCurrentIndex(index % novedades.length);
            }}
            contentContainerStyle={{ paddingHorizontal: separatorWidth }}
            ItemSeparatorComponent={() => <View style={{ width: separatorWidth / 2 }} />}
          />
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 16, color: '#777' }}>
            No hay novedades disponibles
          </Text>
        </View>
      )}

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
  container: { flex: 1, backgroundColor: '#FCF9F2' },
  img: {
    width: width * 0.4,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingTop: 50,
  },
  card: {
    width: width * 0.7,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 5,
  },
  activeCard: {
    transform: [{ scale: 1.05 }],
  },
  cardImage: { width: '100%', height: 150, resizeMode: 'cover' },
  cardTextContainer: { padding: 10, alignItems: 'center' },
  nombre: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600', color: '#333' },
  activeNombre: { color: '#007AFF' },
  buttonContainer: { width: width, alignItems: 'center', marginTop: 30, marginBottom: 30 },
  buttonBg: { width: width * 0.9, height: 80, borderRadius: 20, resizeMode: 'cover' },
  buttonTextContainer: { position: 'absolute', top: 0, left: 0, width: width * 0.9, height: 80, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontFamily: 'Inter', fontSize: 20, fontWeight: '700', color: '#fff' },
});
