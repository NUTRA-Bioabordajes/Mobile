import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api.js';

const coloresFondo = ['#F5F3EF', '#EAE8FF', '#F3E5E5', '#EEF3E3']; // alterna entre estos

const Favoritos = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Recetas');
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoritos = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const endpoint = activeTab === 'Recetas' ? '/favoritos/recetas' : '/favoritos/productos';
      const { data } = await api.get(endpoint, {
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
  }, [activeTab]);

  const renderItem = ({ item, index }) => {
    const backgroundColor = coloresFondo[index % coloresFondo.length];
  
    // ✅ Coincidir nombres de campos del backend
    const nombre =
      activeTab === 'Recetas' ? item.nombreReceta : item.nombreProducto;
    const imageUri =
      activeTab === 'Recetas'
        ? item.Foto // ← antes era imagenReceta
        : item.Foto || item.FotoTabla; // ← productos pueden tener una u otra
  
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => {
          if (activeTab === 'Recetas') {
            navigation.navigate('DetalleReceta', { receta: item });
          } else {
            navigation.navigate('DetalleProducto', { producto: item });
          }
        }}
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
      <Text style={styles.title}>Favoritos</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Recetas' && styles.activeTab]}
          onPress={() => setActiveTab('Recetas')}
        >
          <Text style={[styles.tabText, activeTab === 'Recetas' && styles.activeTabText]}>Recetas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Productos' && styles.activeTab]}
          onPress={() => setActiveTab('Productos')}
        >
          <Text style={[styles.tabText, activeTab === 'Productos' && styles.activeTabText]}>Productos</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator size="large" color="#7C5DFA" />
      ) : favoritos.length === 0 ? (
        <Text style={styles.emptyText}>No hay favoritos aún</Text>
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

      {/* Texto inferior */}
      <TouchableOpacity>
        <Text style={styles.bottomLink}>
          {activeTab === 'Recetas' ? 'Encontrá más recetas' : 'Encontrá más productos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FBFAFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 16,
    color: '#1E1E1E',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#D9D5FF',
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#1E1E1E',
    fontWeight: '600',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginBottom: 14,
    height: 150,
  },
  image: {
    width: 70,
    height: 70,
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
    color: '#6A3DFE',
    marginTop: 10,
    fontWeight: '500',
  },
});
