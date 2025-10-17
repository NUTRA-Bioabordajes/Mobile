import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function Signin() {
    useFonts({
        'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
      });
    

    return (
      
      
        <Text>SIGN IN</Text>
    
      
    )
  }