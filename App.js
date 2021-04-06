import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './components/BottomTabNavigator';
import Turism from './screens/Turism/Turism';

import properties from './properties/properties_expo'

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
        component={Turism}
        options={{
          headerShown: true,
          title: "Puntos de interese",
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff"
        }}
      />
    </Stack.Navigator>
  )
}

export default function App() {

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: properties.color.main,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    backgroundColor: properties.color.main
  },
  headerStyle: {
    backgroundColor: properties.color.main
  }
});
