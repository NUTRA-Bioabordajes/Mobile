import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigationRef } from "./src/navigation/RootNavigation";

import api from './src/api/api';
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

function StackRecetasNavigator({ usuario }) {
  const RecetasWrapper = (props) => <Recetas {...props} usuario={usuario} />;
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecetasScreen" component={RecetasWrapper} />
      <Stack.Screen name="DetalleReceta" options={{ headerShown: false }} component={DetalleReceta} />
    </Stack.Navigator>
  );
}

function StackFavoritosNavigator({ usuario }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritosScreen" options={{ headerShown: false }}>
        {props => <Favoritos {...props} usuario={usuario} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function StackPerfilNavigator({ usuario }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilScreen" options={{ headerShown: false }}>
        {props => <Perfil {...props} usuario={usuario} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MyTabs({ usuario }) {
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
        children={() => <StackRecetasNavigator usuario={usuario} />}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="favoritos"
        children={() => <StackFavoritosNavigator usuario={usuario} />}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="perfil"
        children={() => <StackPerfilNavigator usuario={usuario} />}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [usuario, setUsuario] = useState(null);
  console.log("App render, isAuthenticated:", isAuthenticated);


 useEffect(() => {
  const checkToken = async () => {
    console.log("Verificando token...");
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token en storage:", token);

      if (token) {
        const decoded = jwt_decode(token);
        console.log("Token decodificado:", decoded);

        const now = Date.now() / 1000;
        console.log("exp:", decoded.exp, "now:", now);

        if (decoded.exp && decoded.exp > now) {
          setIsAuthenticated(true);
          setUsuario(decoded);
          return;
        }
      }

      setIsAuthenticated(false);
      setUsuario(null);
    } catch (err) {
      console.error("Error decodificando token:", err);
      setIsAuthenticated(false);
      setUsuario(null);
    }
  };
  checkToken();
}, []);

useEffect(() => {
  if (!navigationRef) return;

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.log("⚠️ Token inválido o expirado, redirigiendo a login...");
        await AsyncStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsuario(null);

        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
      return Promise.reject(error);
    }
  );
}, [navigationRef]);

  if (isAuthenticated === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MyTabs usuario={usuario} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}