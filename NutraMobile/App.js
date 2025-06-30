import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Perfil from './src/screens/Perfil';
import home from './src/screens/Home';
import favoritos from './src/screens/Favoritos';
import recetas from './src/screens/Recetas';
import tienda from './src/screens/Tienda';

//npx expo install expo-font 
//const logo = require('./assets/images/LOGO-transparente.png')


const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'};
const StackPerfil = createNativeStackNavigator();
const StackHome = createNativeStackNavigator();
const StackFavoritos = createNativeStackNavigator();
const StackTienda = createNativeStackNavigator();
const StackRecetas = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function StackHomeNavigator() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name="HomeScreen" options={{ headerShown: false }} component={home} />
    </StackHome.Navigator>
  );
}

function StackTiendaNavigator() {
  return (
    <StackTienda.Navigator>
      <StackTienda.Screen name="TiendaScreen" options={{ headerShown: false }} component={tienda} />
    </StackTienda.Navigator>
  );
}

function StackRecetasNavigator() {
  return (
    <StackRecetas.Navigator>
      <StackRecetas.Screen name="RecetasScreen" options={{ headerShown: false }} component={recetas} />
    </StackRecetas.Navigator>
  );
}

function StackFavoritosNavigator() {
  return (
    <StackFavoritos.Navigator>
      <StackFavoritos.Screen name="FavoritosScreen" options={{ headerShown: false }} component={favoritos} />
    </StackFavoritos.Navigator>
  );
}

function StackPerfilNavigator({ usuario }) {
  return (
    <StackPerfil.Navigator>
      <StackPerfil.Screen name="PerfilScreen" options={{ headerShown: false }}>
        {() => <Perfil usuario={usuario} />}
      </StackPerfil.Screen>
    </StackPerfil.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="home"   component={StackHomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
              ),
            }}
      />
      
      <Tab.Screen name="tienda"   component={StackTiendaNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag" size={24} color={color} />
              ),
            }}
      />

      <Tab.Screen name="recetas"   component={StackRecetasNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="restaurant" size={24} color={color} />
              ),
            }}
      />
      
      <Tab.Screen name="favoritos"   component={StackFavoritosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
              ),
            }}
      />
       
      <Tab.Screen name="perfil"   component={StackPerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
           ),
        }}
        
      />
    </Tab.Navigator>
  );
}

export default function App() {
  /*const [usuario, setUsuario] = useState(null);
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
  }, []);*/


  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}




