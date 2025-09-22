import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { navigationRef } from "./src/navigation/RootNavigation";

import api from "./src/api/api";
import Perfil from "./src/screens/Perfil";
import Home from "./src/screens/Home";
import Favoritos from "./src/screens/Favoritos";
import Recetas from "./src/screens/Recetas";
import Tienda from "./src/screens/Tienda";
import DetalleReceta from "./src/screens/DetalleReceta";
import DetalleProducto from "./src/screens/DetalleProducto";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ====================== STACKS ======================
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
        {(props) => <Favoritos {...props} usuario={usuario} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function StackPerfilNavigator({ usuario }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilScreen" options={{ headerShown: false }}>
        {(props) => <Perfil {...props} usuario={usuario} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// ====================== TABS ======================
function MyTabs({ usuario }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={StackHomeNavigator}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }}
      />
      <Tab.Screen
        name="tienda"
        component={StackTiendaNavigator}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="bag" size={24} color={color} /> }}
      />
      <Tab.Screen
        name="recetas"
        children={() => <StackRecetasNavigator usuario={usuario} />}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} /> }}
      />
      <Tab.Screen
        name="favoritos"
        children={() => <StackFavoritosNavigator usuario={usuario} />}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> }}
      />
      <Tab.Screen
        name="perfil"
        children={() => <StackPerfilNavigator usuario={usuario} />}
        options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

// ====================== APP ======================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    let logoutTimer;

    const handleLogout = async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuario");
      setIsAuthenticated(false);
      setUsuario(null);

      navigationRef.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
      );
    };

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp > now) {
            // Intentamos traer usuario
            let userData;
            try {
              const res = await fetch(
                `https://actively-close-beagle.ngrok-free.app/usuarios/${decoded.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              if (res.ok) userData = await res.json();
            } catch (err) {
              console.warn("No se pudo cargar usuario desde API, cargando de AsyncStorage...");
              const storedUser = await AsyncStorage.getItem("usuario");
              if (storedUser) userData = JSON.parse(storedUser);
            }

            if (!userData) userData = {}; // fallback

            setIsAuthenticated(true);
            setUsuario(userData);

            // Guardamos en AsyncStorage
            await AsyncStorage.setItem("usuario", JSON.stringify(userData));

            // Timer de expiración
            const expiresIn = decoded.exp - now;
            logoutTimer = setTimeout(handleLogout, expiresIn * 1000); // ⚠️ en milisegundos
            return;
          }
        }

        handleLogout();
      } catch (err) {
        console.error("Error verificando token:", err);
        handleLogout();
      }
    };

    checkToken();

    return () => clearTimeout(logoutTimer);
  }, []);

  // Interceptor global 401
  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.log("⚠️ Token inválido o expirado, redirigiendo a login...");
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("usuario");
          setIsAuthenticated(false);
          setUsuario(null);

          navigationRef.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })
          );
        }
        return Promise.reject(error);
      }
    );
  }, []);

  if (isAuthenticated === null) return null; // loading

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? (
        <MyTabs usuario={usuario} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
