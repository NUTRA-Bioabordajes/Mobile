import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Perfil({/*usuario*/} ) { 
  const iconoUbi = require('../../assets/icons/iconoUbicacion.png');
  const btnPerfil = require('../../assets/images/botonesPerfil.png')
  const navigation = useNavigation();

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  const [usuario, setUsuario] = useState(null);
  const [intolerancias, setIntolerancias] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const dni = 1003;
    fetch(`https://actively-close-beagle.ngrok-free.app/usuarios/${dni}`) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Usuario recibido:', data);
        setUsuario(data);
      })
      .catch(err => {
        console.error('Error cargando usuario:', err);
        setError(err.message);
      });

      fetch(`https://actively-close-beagle.ngrok-free.app/usuarios/${dni}/intolerancias`) 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('intolerancias recibidas:', data);
        setIntolerancias(data);
      })
      .catch(err => {
        console.error('Error cargando intolerancias:', err);
        setError(err.message);
      });

  }, []);
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
          resizeMode='contain' 
          style={styles.fotoPerfil} 
        />
        <View style={{ margin: 20 }}> 
          <Text style={styles.nombre}>{usuario.nombre} {usuario.apellido}</Text>      

          <View style={styles.barrio}>
            <Image source={iconoUbi} resizeMode='contain' />
             <Text style={styles.edad}>{usuario.barrio}</Text> 
            <Text style={styles.edad}></Text>
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
            {intolerancias.map((Intolerancias) => (
              <View  key={intolerancias.idIntolerancias} style={styles.tagRojo}>
                <Text style={styles.textIntolerancia}>{Intolerancias.Nombre}</Text>
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
