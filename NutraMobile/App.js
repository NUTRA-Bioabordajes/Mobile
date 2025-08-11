import React, { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Perfil from './src/screens/Perfil';
import Home from './src/screens/Home';
import Favoritos from './src/screens/Favoritos';
import Recetas from './src/screens/Recetas';
import Tienda from './src/screens/Tienda';
import DetalleReceta from './src/screens/DetalleReceta';
import DetalleProducto from './src/screens/DetalleProducto';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackHomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={Home} />
    </Stack.Navigator>
  );
}

function StackTiendaNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TiendaScreen" options={{ headerShown: false }} component={Tienda} />
      <Stack.Screen name="DetalleProducto" options={{ headerShown: false }} component={DetalleProducto} />
    </Stack.Navigator>
  );
}

function StackRecetasNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecetasScreen" options={{ headerShown: false }} component={Recetas} />
      <Stack.Screen name="DetalleRecetas" options={{ headerShown: false }} component={DetalleReceta} />
    </Stack.Navigator>
  );
}

function StackFavoritosNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritosScreen" options={{ headerShown: false }} component={Favoritos} />
    </Stack.Navigator>
  );
}

function StackPerfilNavigator({ usuario }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilScreen" options={{ headerShown: false }}>
        {() => <Perfil usuario={usuario} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={StackHomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="tienda"
        component={StackTiendaNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="bag" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="recetas"
        component={StackRecetasNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="favoritos"
        component={StackFavoritosNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="perfil"
        component={StackPerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;
          if (decoded.exp && decoded.exp > now) {
            setIsAuthenticated(true);
            return;
          }
        } catch (err) {
          console.error("Error decodificando token:", err);
        }
      }
      setIsAuthenticated(false);
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return null; 
  }

  return (
      <NavigationContainer>
        {isAuthenticated ? (
          <MyTabs />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" options={{headerShown:false}}>
              {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>   
  );
}
