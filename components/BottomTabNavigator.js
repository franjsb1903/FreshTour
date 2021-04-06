import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Info from '../screens/Info/Info'
import Map from '../screens/Planificator/Map'
import Routes from '../screens/Planificator/RecommendedRoutes'
import Planificator from '../screens/Planificator/Planificator'
import User from '../screens/Usuarios/User'

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
          tabBarColor: '#008b8b',
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
          tabBarColor: '#20b2aa',
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
          tabBarColor: '#3cb371',
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
          tabBarLabel: 'Profile',
          tabBarColor: '#228b22',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;