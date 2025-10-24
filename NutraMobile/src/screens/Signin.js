import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Signin() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    edad: '',
    diagnostico: '',
    idMedico: '',
    sexo: '',
    barrio: '',
    nombrePersonaACargo1: '',
    apellidoPersonaACargo1: '',
    dniPersonaACargo1: '',
    emailPersonaACargo1: '',
    telefonoPersonaACargo1: '',
    nombrePersonaACargo2: '',
    apellidoPersonaACargo2: '',
    dniPersonaACargo2: '',
    emailPersonaACargo2: '',
    telefonoPersonaACargo2: '',
    foto: '',
    certificado: false,
    vencimiento: '',
    password: '',
    confirmPassword: '',
  });

  const [intoleranciasDisponibles, setIntoleranciasDisponibles] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [intolerancias, setIntolerancias] = useState([]);
  const [loading, setLoading] = useState(false);

  // refs para avanzar entre campos
  const apellidoRef = useRef();
  const dniRef = useRef();
  const edadRef = useRef();
  const diagnosticoRef = useRef();
  const sexoRef = useRef();
  const fotoRef = useRef();
  const barrioRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    const fetchIntolerancias = async () => {
      try {
        const res = await axios.get('https://actively-close-beagle.ngrok-free.app/intolerancias');
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setIntoleranciasDisponibles(data);
      } catch (err) {
        console.log('Error cargando intolerancias:', err.message);
        Alert.alert('Error', 'No se pudieron cargar las intolerancias');
      }
    };

    const fetchMedicos = async () => {
      try {
        const res = await axios.get('https://actively-close-beagle.ngrok-free.app/usuariosBack/medicos');
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setMedicos(data);
      } catch (err) {
        console.log('Error cargando medicos:', err.message);
        Alert.alert('Error', 'No se pudieron cargar los médicos');
      }
    };

    fetchIntolerancias();
    fetchMedicos();
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.edad || isNaN(formData.edad) || formData.edad <= 0) {
      Alert.alert('Error', 'Edad debe ser un número positivo');
      return false;
    }
    if (!formData.idMedico) {
      Alert.alert('Error', 'Médico tratante es obligatorio');
      return false;
    }
    if (formData.certificado) {
      const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
      if (!formData.vencimiento || !regex.test(formData.vencimiento)) {
        Alert.alert('Error', 'Vencimiento debe tener formato MM/YYYY');
        return false;
      }
    }
    if (!formData.password || formData.password.length < 8 || !/[A-Z]/.test(formData.password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres y una mayúscula');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
  
    const dataToSend = {
      ...formData,
      intolerancias: intolerancias.map(id => Number(id)),
    };
  
    // Convertimos vencimiento a formato YYYY-MM-DD si existe
    if (formData.certificado && formData.vencimiento) {
      const [month, year] = formData.vencimiento.split('/');
      dataToSend.vencimiento = `${year}-${month}-01`;
    } else {
      dataToSend.vencimiento = null;
    }
  
    console.log('Datos a enviar:', dataToSend);
    setLoading(true);
  
    try {
      // 1️⃣ Crear usuario
      await axios.post(
        'https://actively-close-beagle.ngrok-free.app/usuarios/nuevoUsuario',
        dataToSend
      );
  
      // 2️⃣ Login automático
      const loginRes = await axios.post(
        'https://actively-close-beagle.ngrok-free.app/login',
        {
          username: formData.dni,
          password: formData.password,
        }
      );
  
      console.log('Respuesta login:', loginRes.data);
  
      if (loginRes.data?.token) {
        await AsyncStorage.setItem('token', loginRes.data.token);
  
        // Guardamos usuario solo si existe
        if (loginRes.data.usuario) {
          await AsyncStorage.setItem('usuario', JSON.stringify(loginRes.data.usuario));
        } else {
          console.warn('No se recibió usuario en el login');
        }
  
        Alert.alert('Bienvenido', 'Cuenta creada y sesión iniciada');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Error', 'No se pudo iniciar sesión automáticamente');
      }
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      console.error('Error en handleSubmit:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>DATOS DEL PACIENTE</Text>

        {/* Campos principales */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#E0CAC7"
          value={formData.nombre}
          onChangeText={t => handleChange('nombre', t)}
          returnKeyType="next"
          onSubmitEditing={() => apellidoRef.current.focus()}
        />
        <TextInput
          ref={apellidoRef}
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#E0CAC7"
          value={formData.apellido}
          onChangeText={t => handleChange('apellido', t)}
          returnKeyType="next"
          onSubmitEditing={() => dniRef.current.focus()}
        />
        <TextInput
          ref={dniRef}
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="#E0CAC7"
          value={formData.dni}
          keyboardType="numeric"
          onChangeText={t => handleChange('dni', t)}
          returnKeyType="next"
          onSubmitEditing={() => edadRef.current.focus()}
        />
        <TextInput
          ref={edadRef}
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#E0CAC7"
          value={formData.edad}
          keyboardType="numeric"
          onChangeText={t => handleChange('edad', t)}
          returnKeyType="next"
          onSubmitEditing={() => diagnosticoRef.current.focus()}
        />
        <TextInput
          ref={diagnosticoRef}
          style={styles.input}
          placeholder="Diagnóstico"
          placeholderTextColor="#E0CAC7"
          value={formData.diagnostico}
          onChangeText={t => handleChange('diagnostico', t)}
        />
        <TextInput
          ref={sexoRef}
          style={styles.input}
          placeholder="Sexo"
          placeholderTextColor="#E0CAC7"
          value={formData.sexo}
          onChangeText={t => handleChange('sexo', t)}
          returnKeyType="next"
          onSubmitEditing={() => fotoRef.current.focus()}
        />
        <TextInput
          ref={fotoRef}
          style={styles.input}
          placeholder="Foto (URL)"
          placeholderTextColor="#E0CAC7"
          value={formData.foto}
          onChangeText={t => handleChange('foto', t)}
          returnKeyType="next"
          onSubmitEditing={() => barrioRef.current.focus()}
        />
        <TextInput
          ref={barrioRef}
          style={styles.input}
          placeholder="Barrio"
          placeholderTextColor="#E0CAC7"
          value={formData.barrio}
          onChangeText={t => handleChange('barrio', t)}
        />

        {/* Selección de médico tratante (único) */}
        <Text style={styles.label}>Médico tratante</Text>
        {medicos.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.option,
              formData.idMedico === item.id && styles.optionSelected,
            ]}
            onPress={() => handleChange('idMedico', item.id)}
          >
            <Text style={styles.optionText}>{item.Nombre} {item.Apellido}</Text>
          </TouchableOpacity>
        ))}

        

        {/* Intolerancias (múltiple) */}
        <Text style={styles.label}>Intolerancias</Text>
        {intoleranciasDisponibles.map(item => (
          <TouchableOpacity
            key={item.idIntolerancias}
            style={[
              styles.option,
              intolerancias.includes(item.idIntolerancias) && styles.optionSelected,
            ]}
            onPress={() => {
              setIntolerancias(prev =>
                prev.includes(item.idIntolerancias)
                  ? prev.filter(i => i !== item.idIntolerancias)
                  : [...prev, item.idIntolerancias]
              );
            }}
          >
            <Text style={styles.optionText}>{item.Nombre}</Text>
          </TouchableOpacity>
        ))}

        {/* Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#E0CAC7"
          secureTextEntry
          value={formData.password}
          onChangeText={t => handleChange('password', t)}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />
        <TextInput
          ref={confirmPasswordRef}
          style={styles.input}
          placeholder="Repetir contraseña"
          placeholderTextColor="#E0CAC7"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={t => handleChange('confirmPassword', t)}
        />

        {/* Certificado */}
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Certificado</Text>
          <Switch
            value={formData.certificado}
            onValueChange={value => handleChange('certificado', value)}
          />
        </View>
        {formData.certificado && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Vencimiento (MM/YYYY)</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YYYY"
              placeholderTextColor="#E0CAC7"
              value={formData.vencimiento}
              onChangeText={t => handleChange('vencimiento', t)}
              maxLength={7}
            />
          </View>
        )}

        {/* Personas a cargo */}
        <Text style={styles.subtitulo}>PERSONA A CARGO 1</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#E0CAC7"
          value={formData.nombrePersonaACargo1}
          onChangeText={t => handleChange('nombrePersonaACargo1', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#E0CAC7"
          value={formData.apellidoPersonaACargo1}
          onChangeText={t => handleChange('apellidoPersonaACargo1', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="#E0CAC7"
          value={formData.dniPersonaACargo1}
          onChangeText={t => handleChange('dniPersonaACargo1', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E0CAC7"
          keyboardType="email-address"
          value={formData.emailPersonaACargo1}
          onChangeText={t => handleChange('emailPersonaACargo1', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="#E0CAC7"
          keyboardType="phone-pad"
          value={formData.telefonoPersonaACargo1}
          onChangeText={t => handleChange('telefonoPersonaACargo1', t)}
        />

        <Text style={styles.subtitulo}>PERSONA A CARGO 2</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#E0CAC7"
          value={formData.nombrePersonaACargo2}
          onChangeText={t => handleChange('nombrePersonaACargo2', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#E0CAC7"
          value={formData.apellidoPersonaACargo2}
          onChangeText={t => handleChange('apellidoPersonaACargo2', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="DNI"
          placeholderTextColor="#E0CAC7"
          value={formData.dniPersonaACargo2}
          onChangeText={t => handleChange('dniPersonaACargo2', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E0CAC7"
          keyboardType="email-address"
          value={formData.emailPersonaACargo2}
          onChangeText={t => handleChange('emailPersonaACargo2', t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="#E0CAC7"
          keyboardType="phone-pad"
          value={formData.telefonoPersonaACargo2}
          onChangeText={t => handleChange('telefonoPersonaACargo2', t)}
        />

        <TouchableOpacity style={styles.boton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Crear Usuario</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: { padding: 20, backgroundColor: '#FCF9F2' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, marginTop: 40 },
  subtitulo: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#E0CAC7', borderRadius: 8, padding: 10, marginVertical: 6, color: '#E0CAC7' },
  label: { marginTop: 15, fontWeight: 'bold' },
  option: { padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginVertical: 4 },
  optionSelected: { backgroundColor: '#D1D2C6', borderColor: '#198754' },
  optionText: { fontSize: 14 },
  boton: { backgroundColor: '#E0CAC7', color: '#FCF9F2', padding: 12, borderRadius: 8, marginVertical: 20, alignItems: 'center' },
  botonTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
};
