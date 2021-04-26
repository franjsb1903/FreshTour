import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import AppContextProvider from './context/PlanificadorAppContextProvider'

import { stylesApp as styles } from './styles/styles';

import MainStack from './components/MainStack';


export default function App() {

  return (
    
      <AppContextProvider>
        <SafeAreaView style={styles.AndroidSafeArea}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaView>
      </AppContextProvider>
  );
}
