import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import styles from '../../assets/styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function Home() {
    useFonts({
        'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
      });
    
    const navigation = useNavigation();

    return (
      
        <><ImageBackground
        source={require('../../assets/images/background.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        ></ImageBackground>
        </>
        
    
      
    )
  }


