import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api.js'; // tu archivo de axios configurado

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (activeTab === 'Recetas') {
          navigation.navigate('DetalleReceta', { receta: item });
        } else {
          navigation.navigate('DetalleProducto', { producto: item });
        }
      }}
    >
      <Text style={styles.itemTitle}>
        {activeTab === 'Recetas' ? item.nombreReceta : item.nombreProducto}
      </Text>
      <Text style={styles.itemDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
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

      {loading ? (
        <ActivityIndicator size="large" color="#7C5DFA" />
      ) : favoritos.length === 0 ? (
        <Text style={styles.emptyText}>No hay favoritos aún</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#7C5DFA', // color principal Figma
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1E1E1E',
  },
  itemDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#8E8E93',
    fontSize: 16,
  },
});
