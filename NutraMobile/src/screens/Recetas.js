import { Button, StyleSheet, Text, View, TextInput, Image, ImageBackground, SafeAreaView } from 'react-native';
import styles from '../../assets/styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function Recetas() {
    const navigation = useNavigation();

    useFonts({
    'Inter': require('../../assets/fonts/Inter/Inter_18pt-Regular.ttf')
    });

    const [recetas, setRecetas] = useState([]);
    const [error, setError] = useState(null);
    const [favoritos, setFavoritos] = useState({});
    useEffect(() => {
    
      fetch('https://actively-close-beagle.ngrok-free.app/recetas/') 
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('recetas recibidas:', data);
          setRecetas(data);
        })
        .catch(err => {
          console.error('Error cargando recetas:', err);
          setError(err.message);
        });
    }, []);

   if (!recetas.length && !error)
    return <Text>Cargando productos...</Text>
    
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Recetas</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.contenedorProductos}>
     {recetas.map((recetas) => (
      <View key={receta.idReceta} style={styles.cardProducto}>
        <Text style={styles.nombreProducto}>{receta.Nombre}</Text>
      </View>
    ))}
  </View>
</ScrollView>
    </SafeAreaView>
  );
}