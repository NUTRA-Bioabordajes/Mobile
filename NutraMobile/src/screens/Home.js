import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

export default function Home() {
  const [fontsLoaded] = useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf'),
  });

  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carrusel de imágenes (puedes reemplazar las URLs por tus imágenes locales)
  const images = [
    { id: 1, uri: 'https://via.placeholder.com/400x200?text=Image+1' },
    { id: 2, uri: 'https://via.placeholder.com/400x200?text=Image+2' },
    { id: 3, uri: 'https://via.placeholder.com/400x200?text=Image+3' },
  ];

  // Auto-scroll del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!fontsLoaded) {
    return null; // o un <ActivityIndicator /> si querés
  }

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      {/* Carrusel */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Contenido debajo del carrusel */}
      <View style={styles.content}>
        <Text style={styles.title}>HOME</Text>
        {/* acá podés agregar más componentes, botones, etc */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 24,
    color: '#333',
    marginTop: 20,
  },
});
