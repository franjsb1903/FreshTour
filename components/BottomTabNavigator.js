import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Info from '../screens/Info/Info'
import Map from '../screens/PlanificadorTemporal/Mapa'
import Routes from '../screens/PlanificadorTemporal/RutasRecomendadas'
import Planificator from '../screens/PlanificadorTemporal/Planificador/Planificador'
import User from '../screens/Usuarios/Usuarios'

const Tab = createMaterialBottomTabNavigator();

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