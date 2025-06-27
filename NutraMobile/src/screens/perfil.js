import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/styles.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-web';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Perfil({/*usuario*/} ) { 
  const iconoUbi = require('../../assets/icons/iconoUbicacion.png');
  const navigation = useNavigation();

  useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
  });

  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const dni = 1002;
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
  }, []);
  if (!usuario) {
    return <Text>Cargando perfil...</Text>;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Perfil</Text> 

      <View style={styles.user}>
        {/*<Image source={{ uri: usuario.foto }} resizeMode='contain' style={styles.fotoPerfil} /> */}
        <Image 
          source={{ uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png' }} 
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
            {/* {usuario.diagnosticos.map((diag, index) => (
              <View key={index} style={styles.tagVerde}>
                <Text style={styles.textDiagnostico}>{diag}</Text>
              </View>
            ))} */}
            <View style={styles.tagVerde}>
              <Text style={styles.textDiagnostico}>{usuario.diagnostico}</Text>
            </View>
          </View>
        </View>

        <View style={styles.categoria}>
          <Text style={styles.subtitulo}>Intolerancias:</Text>
          <View style={styles.tagContainer}>
            {/* {usuario.intolerancias.map((intol, index) => (
              <View key={index} style={styles.tagRojo}>
                <Text style={styles.textIntolerancia}>{intol}</Text>
              </View>
            ))} */}
            <View style={styles.tagRojo}>
              <Text style={styles.textIntolerancia}>Gluten</Text>
            </View>
            <View style={styles.tagRojo}>
              <Text style={styles.textIntolerancia}>Caseína</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
