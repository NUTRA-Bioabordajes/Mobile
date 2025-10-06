import { StatusBar } from 'expo-status-bar';
import { Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [intolerancias, setIntolerancias] = useState(null);
  const [error, setError] = useState(null);

  const iconoUbi = require('../../assets/icons/iconoUbicacion.png');
  const btnPerfil = require('../../assets/images/botonesPerfil.png');

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });


  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        if (storedUser) {
          setUsuario(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchIntolerancias = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (usuario?.id && token) {
          const res = await fetch(
            `https://actively-close-beagle.ngrok-free.app/usuarios/${usuario.id}/intolerancias`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (!res.ok) throw new Error(`Error status: ${res.status}`);
          const data = await res.json();
          setIntolerancias(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchIntolerancias();
  }, [usuario]);

  if (!usuario) {
    return <Text>Cargando perfil...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Perfil</Text> 

      {/* Datos de usuario */}
      <View style={styles.user}>
        <Image 
          source={{ uri: usuario.foto }} 
          resizeMode='cover' 
          style={styles.fotoPerfil} 
        />
        <View style={{ margin: 20 }}> 
          <Text style={styles.nombre}>{usuario.nombre} {usuario.apellido}</Text>      
          <View style={styles.barrio}>
            <Image source={iconoUbi} resizeMode='contain' />
            <Text style={styles.edad}>{usuario.barrio}</Text> 
          </View>  
        </View>
      </View>

      {/* 🔹 Ficha médica */}
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
          <Text style={styles.subtitulo}>Intolerancias:</Text>
          <View style={styles.tagContainer}>
            {intolerancias && intolerancias.map((intolerancia, index) => (
              <View key={index} style={styles.tagRojo}>
                <Text style={styles.textIntolerancia}>{intolerancia.Nombre}</Text>
              </View>
            ))}
            {!intolerancias?.length && (
              <Text style={{ color: "gray" }}>Sin intolerancias registradas</Text>
            )}
          </View>
        </View>
      </View>

      {/* 🔹 Botones del perfil */}
      <Image 
        source={ btnPerfil } 
        resizeMode='contain' 
        style={styles.fotoBotones}
      />
    </SafeAreaView>
  );
}
