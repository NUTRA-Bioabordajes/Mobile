import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Preparacion({ route, navigation }) {
  const { receta } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FCF9F2", padding: 20 }}>
      <StatusBar style="auto" />

      {/* Barra superior */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "600", marginLeft: 10 }}>
          Preparación
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Nombre */}
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 10 }}>
          {receta.Nombre}
        </Text>

        {/* Elaboración */}
        <Text style={{ fontSize: 16, lineHeight: 22 }}>
          {receta.Elaboracion}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}