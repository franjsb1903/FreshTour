import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Platform, StatusBar, SafeAreaView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './components/BottomTabNavigator';
import TurismoList from './screens/Turismo/TurismoList';
import TurismoItem from './screens/Turismo/TurismoItem/TurismoItem';

import { stylesApp as styles } from './styles/styles'

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
        options={{
          headerShown: true,
          title: "Puntos de interese",
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff"
        }}
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
            return(
              <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
            )
          }
        })}
      />
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer >
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}
