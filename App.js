import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import AppContextProvider from './context/PlanificadorAppContextProvider'

import { stylesApp as styles } from './styles/styles';
import FlashMessage from 'react-native-flash-message'

import MainStack from './components/MainStack';



export default function App() {

  return (

    <AppContextProvider>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
      <FlashMessage position="top" titleStyle={{ fontSize: 18 }} animationDuration={400} />
    </AppContextProvider>
  );
}
