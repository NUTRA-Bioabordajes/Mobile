import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { navigationRef, safeResetToLogin } from "./src/navigation/RootNavigation";
import api from "./src/api/api";

// Screens
import Perfil from "./src/screens/Perfil";
import Home from "./src/screens/Home";
import Favoritos from "./src/screens/Favoritos";
import Recetas from "./src/screens/Recetas";
import DetalleReceta from "./src/screens/DetalleReceta";
import Login from "./src/screens/Login";
import Signin from "./src/screens/Signin";

// ====================== STACKS ======================
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackHomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={Home}
      />
    </Stack.Navigator>
  );
}



function StackRecetasNavigator({ usuario }) {
  const RecetasWrapper = (props) => <Recetas {...props} usuario={usuario} />;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecetasScreen"
        options={{ headerShown: false }}
        component={RecetasWrapper}
      />
      <Stack.Screen
        name="DetalleReceta"
        options={{ headerShown: false }}
        component={DetalleReceta}
      />
    </Stack.Navigator>
  );
}

function StackFavoritosNavigator({ usuario }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritosScreen"
        options={{ headerShown: false }}
      >
        {(props) => <Favoritos {...props} usuario={usuario} />}
      </Stack.Screen>
      
      <Stack.Screen
        name="DetalleReceta"
        options={{ headerShown: false }}
        component={DetalleReceta}
      />
      
    </Stack.Navigator>
  );
}

function StackPerfilNavigator({ usuario, setIsAuthenticated }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PerfilScreen"
        options={{ headerShown: false }}
      >
        {(props) => (
          <Perfil
            {...props}
            usuario={usuario}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
// ====================== TABS ======================
function MyTabs({ usuario, setIsAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FCF9F2",           // fondo marfil
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 65,
          position: "absolute",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarActiveTintColor: "#000",          // ícono activo: negro
        tabBarInactiveTintColor: "#C2C6CC",     // íconos inactivos: gris claro
        tabBarShowLabel: false,                 // sin texto
      }}
    >
      <Tab.Screen
        name="home"
        component={StackHomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="recetas"
        children={() => <StackRecetasNavigator usuario={usuario} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favoritos"
        children={() => <StackFavoritosNavigator usuario={usuario} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={26} color={color} />
          ),
        }}
      >
        {(props) => (
          <StackPerfilNavigator
            {...props}
            usuario={usuario}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </Tab.Screen>
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
      safeResetToLogin();
    };

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp > now) {
            try {
              const res = await fetch(
                `https://actively-close-beagle.ngrok-free.app/usuarios/${decoded.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
          
              if (!res.ok) throw new Error("Token inválido en backend");
          
              const userData = await res.json();
              setIsAuthenticated(true);
              setUsuario(userData);
              await AsyncStorage.setItem("usuario", JSON.stringify(userData));
          
              const expiresIn = decoded.exp - now;
              logoutTimer = setTimeout(handleLogout, expiresIn * 1000);
              return;
            } catch (e) {
              console.log("⚠️ Token expirado en backend, forzando logout");
              handleLogout();
              return;
            }
          }
          
        }

        handleLogout();
      } catch (err) {
        console.log("Error verificando token:", err);
        handleLogout();
      }
    };

    checkToken();
    return () => clearTimeout(logoutTimer);
  }, []);

  // Interceptor global para 401
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
          safeResetToLogin();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  if (isAuthenticated === null) return null; // Loading inicial

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? (
    <MyTabs usuario={usuario} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
