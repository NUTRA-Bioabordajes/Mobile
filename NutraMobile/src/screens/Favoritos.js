import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api.js';

const coloresFondo = ['#E0CAC7', '#E5E2C5', '#E7E6DC', '#CBD2E2'];

const Favoritos = () => {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoritos = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const { data } = await api.get('/favoritos/recetas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoritos(data);
    } catch (error) {
      console.log('Error cargando favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const renderItem = ({ item, index }) => {
    const backgroundColor = coloresFondo[index % coloresFondo.length];
    const nombre = item.nombreReceta;
    const imageUri = item.Foto;

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => navigation.navigate('DetalleReceta', { receta: item })}
      >
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        )}
        <Text style={styles.cardTitle}>{nombre}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Recetas Favoritas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#CBD2E2"/>
      ) : favoritos.length === 0 ? (
        <Text style={styles.emptyText}>No hay recetas favoritas aún</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Recetas')}>
        <Text style={styles.bottomLink}>Encontrá más recetas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FCF9F2',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 80,
    marginBottom: 16,
    color: '#1E1E1E',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginBottom: 14,
    height: 150,
    margin: 4
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    color: '#1E1E1E',
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#8E8E93',
    fontSize: 16,
  },
  bottomLink: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 10,
    fontWeight: '500',
  },
});
