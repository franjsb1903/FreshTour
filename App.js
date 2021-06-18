/**
 * @fileoverview Arquivo App da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do arquivo
*/

// módulos
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message'

// contexto
import AppContextProvider from './context/AppContextProvider'

// estilos
import { stylesApp as styles } from './styles/styles';

// compoñentes
import MainStack from './components/MainStack';

/**
 * Compoñente base da aplicación, sobre o que se inclúen o resto de compoñentes
 * @returns {Component}
 */
export default function App() {

  return (

    <AppContextProvider>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <FlashMessage position="bottom" titleStyle={{ fontSize: 18 }} animationDuration={400} />
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
    </AppContextProvider>
  );
}
