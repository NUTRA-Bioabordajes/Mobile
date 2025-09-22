// src/api/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../navigation/RootNavigation";
import { CommonActions } from "@react-navigation/native";

// 📌 Cambiá esta constante por tu URL actual de ngrok o IP local
const API_BASE_URL = "http://localhost:3000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 📌 Interceptor para agregar el token en cada request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📌 Interceptor de respuesta para manejar expiración de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("❌ Token inválido o expirado, cerrando sesión...");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuario");

      if (navigationRef.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
    }
    return Promise.reject(error);
  }
);

export default api;
