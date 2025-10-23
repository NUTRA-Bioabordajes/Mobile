import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import api from "../api/api";
import Signin from "./Signin";

export default function Login({ navigation, setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ username: false, password: false });
  const isDisabled = !username || !password;

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña");
      return;
    }

    console.log("username:", username, "password:", password);

    try {
      // Login
      const res = await api.post("/login", { username, password });
      console.log("RESPUESTA DEL LOGIN:", res.data);

      if (res.data.success === true || res.data.success === "true") {
        console.log("TOKEN RECIBIDO:", res.data.token);
        await AsyncStorage.setItem("token", res.data.token);

        //  Decodificamos token para sacar ID del usuario
        const decoded = jwtDecode(res.data.token);
        const userId = decoded.id;
        console.log("Usuario ID del token:", userId);

        // Intentamos obtener datos completos del usuario
        let usuario = null;
        try {
          const userRes = await api.get(`/usuarios/${userId}`);
          usuario = userRes.data;
          console.log("✅ Usuario recibido:", usuario);
        } catch (err) {
          console.warn("No se pudo obtener los datos completos del usuario, se usará fallback:", err);
          usuario = { id: userId, username }; // fallback mínimo
        }

        //  Guardamos usuario en AsyncStorage
        await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

        // Cambiamos estado de autenticación
        setIsAuthenticated(true);
      } else {
        Alert.alert("Error", res.data.message || "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión");
      console.log("RESPONSE ERROR:", error.response?.data || error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/fondo-login.png")}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Usuario o Email"
          value={username}
          onChangeText={setUsername}
          onBlur={() => setTouched({ ...touched, username: true })}
          style={[styles.input, touched.username && !username ? styles.inputError : null]}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched({ ...touched, password: true })}
          style={[styles.input, touched.password && !password ? styles.inputError : null]}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, isDisabled ? styles.buttonDisabled : null]}
          onPress={handleLogin}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signin]}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.signinText}>
          ¿Aún no tienes una cuenta? <Text style={[styles.registro]}>Registrarse</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  form: { width: "80%", backgroundColor: "rgba(255,255,255,0.9)", padding: 20, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "transparent" },
  inputError: { borderColor: "red" },
  button: { backgroundColor: "#212b36", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonDisabled: { backgroundColor: "#999" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  signin:{marginTop: 12},
  signinText:{color: "#00000", textAlign: "center",fontSize: 14.5},
  registro: {fontWeight:"bold"}
});
