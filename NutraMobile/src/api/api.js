import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Configuración principal
const BASE_URL = "https://actively-close-beagle.ngrok-free.app"; 
const TIMEOUT = 20000; // 20 segundos, podés ajustar

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// -------------------------
// 1️⃣ Interceptor de REQUEST
// -------------------------
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[API] Token enviado en header:", token);
    } else {
      delete config.headers.Authorization; // limpiar si no hay token
    }
    console.log(`[API] Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.log("[API] Error en request:", error.message);
    return Promise.reject(error);
  }
);

// -------------------------
// 2️⃣ Interceptor de RESPONSE
// -------------------------
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response OK: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    if (!error.response) {
      console.log("[API] Network Error o timeout:", error.message);
      return Promise.reject(error);
    }

    // 401 o 403 → token inválido o expirado
    if (error.response.status === 401 || error.response.status === 403) {
      console.warn("[API] Token expirado o inválido, limpiando sesión…");

      // 🔹 Limpiar AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuario");

      // 🔹 Limpiar Authorization por si Axios sigue usando el token viejo
      delete api.defaults.headers.common["Authorization"];
    } else {
      console.log(`[API] Error Response ${error.response.status}:`, error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
