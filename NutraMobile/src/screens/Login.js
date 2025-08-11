import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [touched, setTouched] = useState({ username: false, password: false });
  const isDisabled = !username || !password;



  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña");
      return;
    }

    try {
      const res = await axios.post(
        "https://actively-close-beagle.ngrok-free.app/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Respuesta login:", res.data);  // <--- Log completo
  
      if (res.data.success) {
        await AsyncStorage.setItem("token", res.data.token);
        navigation.replace("HomeScreen");
      } else {
        Alert.alert("Error", res.data.message || "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión");
      console.error(error);
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
          style={[
            styles.input,
            touched.username && !username ? styles.inputError : null
          ]}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched({ ...touched, password: true })}
          style={[
            styles.input,
            touched.password && !password ? styles.inputError : null
          ]}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, isDisabled ? styles.buttonDisabled : null]}
          onPress={handleLogin}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
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
  buttonText: { color: "#fff", fontWeight: "bold" }
});
