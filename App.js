import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Platform, StatusBar, SafeAreaView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './components/BottomTabNavigator';
import TurismoList from './screens/Turismo/TurismoList';
import TurismoItem from './screens/Turismo/TurismoItem/TurismoItem';
import Register from './screens/Usuarios/screens/auth/Register';
import Login from './screens/Usuarios/screens/auth/Login';

import AppContextProvider from './context/PlanificadorAppContextProvider'

import { stylesApp as styles } from './styles/styles';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Turism"
        component={TurismoList}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.title,
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff",
          headerTitle: ({ children: title }) => {
            return (
              <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
            )
          }
        })}
      />
      <Stack.Screen
        name="TurismoItem"
        component={TurismoItem}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.title,
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff",
          headerTitleAllowFontScaling: true,
          headerTitle: ({ children: title }) => {
            return (
              <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
            )
          }
        })}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          title: "Registro",
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff"
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          title: "Iniciar sesión",
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff"
        }}
      />
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    
      <AppContextProvider>
        <SafeAreaView style={styles.AndroidSafeArea}>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </SafeAreaView>
      </AppContextProvider>
  );
}
