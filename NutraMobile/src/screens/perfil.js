import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { safeResetToLogin } from '../navigation/RootNavigation.js';
import api from '../api/api.js';

export default function Perfil({ setIsAuthenticated = () => {} }) {
  {
  const [usuario, setUsuario] = useState(null);
  const [intolerancias, setIntolerancias] = useState([]);
  const [error, setError] = useState(null);
  const iconoUbi = require('../../assets/icons/iconoUbicacion.png');

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  // 🔹 Cargar usuario desde AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        if (!storedUser) {
          // No hay usuario guardado, redirigir al login
          safeResetToLogin();
          return;
        }
        setUsuario(JSON.parse(storedUser));
      } catch (err) {
        console.log("Error cargando usuario:", err);
        setError("No se pudo cargar el usuario.");
      }
    };
    loadUser();
  }, []);

  // 🔹 Fetch de intolerancias
  useEffect(() => {
    const fetchIntolerancias = async () => {
      if (!usuario?.id) return;

      try {
        const res = await api.get(`/usuarios/${usuario.id}/intolerancias`);
        setIntolerancias(res.data || []);
      } catch (err) {
        console.log("Error fetching intolerancias:", err);
        setError(err.message || "Error cargando intolerancias");
      }
    };
    fetchIntolerancias();
  }, [usuario]);

  // 🔹 Logout
 /* const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      await AsyncStorage.removeItem("token");
      safeResetToLogin();
    } catch (err) {
      console.log("Error al cerrar sesión:", err);
      setError("No se pudo cerrar sesión.");
    }
  };*/

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("usuario");
    setIsAuthenticated(false); 
    safeResetToLogin();        
  };

  if (!usuario) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>Cargando perfil...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Perfil</Text>

      {/* Datos de usuario */}
      <View style={styles.user}>
        <Image source={{ uri: usuario.foto }} resizeMode='cover' style={styles.fotoPerfil} />
        <View style={{ margin: 20 }}>
          <Text style={styles.nombre}>{usuario.nombre} {usuario.apellido}</Text>
          <View style={styles.barrio}>
            <Image source={iconoUbi} resizeMode='contain' />
            <Text style={styles.edad}>{usuario.barrio}</Text>
          </View>
        </View>
      </View>

      {/* Ficha médica */}
      <View style={styles.fichaMedica}>
        <View style={styles.categoria}>
          <Text style={styles.subtitulo}>Diagnósticos:</Text>
          <View style={styles.tagContainer}>
            <View style={styles.tagVerde}>
              <Text style={styles.textDiagnostico}>{usuario.diagnostico}</Text>
            </View>
          </View>
        </View>

        <View style={styles.categoria}>
          <Text style={styles.subtitulo}>Dieta:</Text>
          <View style={styles.tagContainer}>
            {intolerancias.length > 0 ? (
              intolerancias.map((intolerancia, index) => (
                <View key={index} style={styles.tagRojo}>
                  <Text style={styles.textIntolerancia}>{intolerancia.Nombre}</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: "gray" }}>Sin dietas registradas</Text>
            )}
          </View>
        </View>
      </View>

      {/* Botón logout */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F5F5F5',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={handleLogout}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="logout" size={24} color="#333" style={{ marginRight: 10 }} />
          <Text style={{ color: '#333', fontSize: 16, fontWeight: '500' }}>Cerrar sesión</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
      </TouchableOpacity>

      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </SafeAreaView>
  );
}}
