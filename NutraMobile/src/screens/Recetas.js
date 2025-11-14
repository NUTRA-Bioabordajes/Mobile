import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/styles/styles.js';

export default function Recetas() {
  const navigation = useNavigation();

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  const [recetas, setRecetas] = useState([]);
  const [favoritos, setFavoritos] = useState({});
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0); // 0 = Todas

  const categorias = [
    { id: 0, Nombre: 'Todas' },
    { id: 1, Nombre: 'Desayuno' },
    { id: 2, Nombre: 'Bebidas' },
    { id: 3, Nombre: 'Snacks' },
    { id: 4, Nombre: 'Postres' },
    { id: 5, Nombre: 'Plato Principal' },
    { id: 6, Nombre: 'Acompañamiento' }
  ];

  // Cargar usuario y token
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser) setUsuario(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (err) {
        console.log("Error cargando usuario o token:", err);
        setError('Error al cargar usuario');
      }
    };
    loadUser();
  }, []);

  // Cargar recetas
  useEffect(() => {
    if (!token || !usuario) return;

    const loadRecetas = async () => {
      try {
        const res = await fetch(`https://actively-close-beagle.ngrok-free.app/usuarios/${usuario.id}/recetas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setRecetas(data || []);
      } catch (err) {
        console.log('Error cargando recetas:', err);
        setError('No se pudieron cargar las recetas');
      } finally {
        setLoading(false);
      }
    };

    loadRecetas();
  }, [token, usuario]);

  // Cargar favoritos
  useEffect(() => {
    if (!token) return;
  
    const loadFavoritos = async () => {
      try {
        const res = await fetch('https://actively-close-beagle.ngrok-free.app/favoritos/recetas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
  
        const favMap = {};
        if (Array.isArray(data)) {
          data.forEach(fav => {
            if (fav.idReceta) favMap[fav.idReceta] = true;
          });
        }
        setFavoritos(favMap);
      } catch (err) {
        console.log("Error cargando favoritos recetas:", err);
      }
    };
  
    loadFavoritos();
  }, [token]);

  const toggleFavorito = async (idReceta) => {
    if (!usuario || !token) return;

    const alreadyFav = favoritos[idReceta];

    try {
      const url = 'https://actively-close-beagle.ngrok-free.app/favoritos';
      const method = alreadyFav ? 'DELETE' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ idUsuario: usuario.id, idReceta })
      });

      if (!res.ok) {
        console.log('Error modificando favorito:', await res.text());
        return;
      }

      setFavoritos(prev => ({
        ...prev,
        [idReceta]: !prev[idReceta]
      }));
    } catch (err) {
      console.log("Error al modificar favorito:", err);
    }
  };

  if (!usuario || loading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;

  if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;

  // Filtrar recetas según idCategoria
  const recetasFiltradas = categoriaSeleccionada === 0 
    ? recetas 
    : recetas.filter(r => Number(r.idCategoria) === categoriaSeleccionada);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Recetas</Text>

      {/* FILTROS TIPO CHIPS */}
      <View style={{ height: 50, justifyContent: 'center' }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
        >
          {categorias.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setCategoriaSeleccionada(cat.id)}
              activeOpacity={0.8}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16, // ancho variable según texto
                borderRadius: 20,
                marginHorizontal: 5,
                backgroundColor: categoriaSeleccionada === cat.id ? '#E4CCC9' : '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                color: categoriaSeleccionada === cat.id ? '#fff' : '#000', 
                fontWeight: '500',
                textAlign: 'center'
              }}>
                {cat.Nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA DE RECETAS */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.contenedorProductos}>
          {recetasFiltradas.length === 0 
            ? <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay recetas en esta categoría</Text>
            : recetasFiltradas.map(receta => (
              <Pressable
                key={receta.idReceta}
                style={styles.cardProducto}
                onPress={() => navigation.navigate('DetalleReceta', { receta })}
              >
                <Image
                  source={{ uri: receta.Foto }}
                  resizeMode='contain'
                  style={styles.imagenProducto}
                />
                <Text style={styles.nombreProducto}>{receta.Nombre}</Text>
                <TouchableOpacity onPress={() => toggleFavorito(receta.idReceta)}>
                  <Ionicons
                    name={favoritos[receta.idReceta] ? 'heart' : 'heart-outline'}
                    size={30}
                    color={favoritos[receta.idReceta] ? 'red' : 'black'}
                  />
                </TouchableOpacity>
              </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
