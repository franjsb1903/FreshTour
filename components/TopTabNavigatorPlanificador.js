import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DatosRuta from '../screens/Common/DatosRuta';
import Instrucions from '../screens/PlanificadorTemporal/Planificador/PlanificadorTabScreens/Instrucions';
import Planificacion from '../screens/PlanificadorTemporal/Planificador/PlanificadorTabScreens/Planificacion'

import properties from '../properties/properties_expo';
import { stylesTopNavigator as styles } from '../styles/styles'

const Tab = createMaterialTopTabNavigator();


const TopTabNavigator = (props) => {

    return (
        <>
            <Tab.Navigator
                initialRouteName="Planificacion"
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 10,
                        textAlign: 'center'
                    },
                    activeTintColor: properties.style.color.text,
                    style: styles.tabBarStyle,
                    indicatorStyle: { backgroundColor: properties.style.color.topTabIndicator }
                }}>
                <Tab.Screen
                    name="Planificacion"
                    children={() => <Planificacion />}
                    options={{
                        tabBarLabel: 'Planificacion'
                    }} />
                <Tab.Screen
                    name="DatosRuta"
                    children={() => <DatosRuta />}
                    options={{
                        tabBarLabel: 'Datos de ruta'
                    }} />
                <Tab.Screen
                    name="Instrucions"
                    children={() => <Instrucions />}
                    options={{
                        tabBarLabel: 'Instrucions'
                    }} />
            </Tab.Navigator>
        </>
    )
}

export default TopTabNavigator;