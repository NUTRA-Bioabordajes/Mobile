import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [intolerancias, setIntolerancias] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const iconoUbi = require('../../assets/icons/iconoUbicacion.png');
  const btnPerfil = require('../../assets/images/botonesPerfil.png');

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  // Recuperar usuario y token desde AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("usuario");
        const storedToken = await AsyncStorage.getItem("token");

        if (storedUser) setUsuario(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (err) {
        console.error("Error cargando usuario/token:", err);
      }
    };

    loadData();
  }, []);

  // Fetch de intolerancias usando el token
  useEffect(() => {
    if (usuario?.id && token) {
      fetch(`https://actively-close-beagle.ngrok-free.app/usuarios/${usuario.id}/intolerancias`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error(`Error status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          setIntolerancias(data);
        })
        .catch(err => {
          setError(err.message);
        });
    }
  }, [usuario, token]);

  if (!usuario) {
    return <Text>Cargando perfil...</Text>;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Perfil</Text> 
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
          </View>
        </View>
      </View>
      <Image 
        source={ btnPerfil } 
        resizeMode='contain' 
        style = {styles.fotoBotones}
      />
    </SafeAreaView>
  );
}
