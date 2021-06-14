/**
 * @fileoverview Menú inferior principal da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// pantallas
import Info from '../screens/Info/Info'
import Map from '../screens/PlanificadorTemporal/Mapa'
import Routes from '../screens/PlanificadorTemporal/Rutas/RutasRecomendadasList'
import Planificator from '../screens/PlanificadorTemporal/Planificador/Planificador'
import User from '../screens/Usuarios/Usuarios';


const Tab = createMaterialBottomTabNavigator();         // Constante global sobre a que se constrúe o menú

/**
 * Compoñente que conforma o menú inferior en si mesmo
 * @returns {Component}
 */
const BottomTabNavigator = () => {
  return (

    <Tab.Navigator
      initialRouteName="Map"
      activeColor="#fff"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
      shifting={true}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: 'Info',
          tabBarColor: '#2e8b57',
          tabBarIcon: ({ color }) => (
            <Icon name="information-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Routes"
        component={Routes}
        options={{
          tabBarLabel: 'Rutas',
          tabBarColor: '#2e8b57',
          tabBarIcon: ({ color }) => (
            <Icon name="walk-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'Mapa',
          tabBarColor: '#2e8b57',
          tabBarIcon: ({ color }) => (
            <Icon name="map-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Planificator"
        component={Planificator}
        options={{
          tabBarLabel: 'Planificador',
          tabBarColor: '#2e8b57',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'Perfil',
          tabBarColor: '#2e8b57',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;