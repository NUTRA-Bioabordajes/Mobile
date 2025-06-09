import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import perfil from './src/screens/Perfil';
import home from './src/screens/Home';
import favoritos from './src/screens/Favoritos';
import recetas from './src/screens/Recetas';
import tienda from './src/screens/Tienda';

//npx expo install expo-font 
//const logo = require('./assets/images/LOGO-transparente.png')



const imgPerfil = {uri: 'https://www.floatingwindturbineucm.com/wp-content/uploads/PERFIL-VACIO-1024x1024.png'};
const StackPerfil = createNativeStackNavigator();
const StackHome = createNativeStackNavigator();
const StackFavoritos = createNativeStackNavigator();
const StackTienda = createNativeStackNavigator();
const StackRecetas = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function StackHomeNavigator() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name="home" component={home} />
    </StackHome.Navigator>
  );
}

function StackTiendaNavigator() {
  return (
    <StackTienda.Navigator>
      <StackTienda.Screen name="tienda" component={tienda} />
    </StackTienda.Navigator>
  );
}

function StackRecetasNavigator() {
  return (
    <StackRecetas.Navigator>
      <StackRecetas.Screen name="recetas" component={recetas} />
    </StackRecetas.Navigator>
  );
}

function StackFavoritosNavigator() {
  return (
    <StackFavoritos.Navigator>
      <StackFavoritos.Screen name="favoritos" component={favoritos} />
    </StackFavoritos.Navigator>
  );
}

function StackPerfilNavigator() {
  return (
    <StackPerfil.Navigator>
      <StackPerfil.Screen name="perfil" component={perfil}   options={{headerShown: false}}/>
    </StackPerfil.Navigator>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="home"   component={StackHomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
              ),
            }}
      />
      
      <Tab.Screen name="tienda"   component={StackTiendaNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag" size={24} color={color} />
              ),
            }}
      />

      <Tab.Screen name="recetas"   component={StackRecetasNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="restaurant" size={24} color={color} />
              ),
            }}
      />
      
      <Tab.Screen name="favoritos"   component={StackFavoritosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
              ),
            }}
      />
       
      <Tab.Screen name="perfil"   component={StackPerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
           ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}




