import React from 'react';
import { StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigator from './components/BottomTabNavigator'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
