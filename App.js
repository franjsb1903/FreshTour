import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native'

import BottomTabNavigator from './components/BottomTabNavigator'

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});