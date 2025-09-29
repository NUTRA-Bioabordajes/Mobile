import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Configuración principal
const BASE_URL = "https://actively-close-beagle.ngrok-free.app"; 
const TIMEOUT = 20000; // 20 segundos, podés ajustar

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});


// 1 Interceptor de REQUEST
// -------------------------
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[API] Token enviado en header:", token);
    }
    console.log(`[API] Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API] Error en request:", error.message);
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
    // Timeout o network error
    if (!error.response) {
      console.error("[API] Network Error o timeout:", error.message);
      return Promise.reject(error);
    }

    // Token expirado o inválido
    if (error.response.status === 401 || error.response.status === 403) {
      console.warn("[API] Token expirado o inválido. Cerrando sesión…");

      // Borrar token guardado
      await AsyncStorage.removeItem("token");

      // Redirigir al login (RootNavigation debe estar configurado)
      try {
        const { navigate } = await import("../navigation/RootNavigation");
        navigate("Login");
      } catch (navErr) {
        console.error("[API] No se pudo navegar al login:", navErr);
      }
    } else {
      console.error(`[API] Error Response ${error.response.status}:`, error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
