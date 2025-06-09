import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import styles from '../../assets/styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function Home() {
    useFonts({
        'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
      });
    const iconoUbi = require('../../assets/icons/iconoUbicacion.png')
    const navigation = useNavigation();

    return (
      
      
        <Text>HOME</Text>
    
      
    )
  }