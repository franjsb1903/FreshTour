/**
 * @fileoverview Menú de navegación superior no planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// pantallas
import DatosRuta from '../screens/Common/DatosRuta';
import Instrucions from '../screens/PlanificadorTemporal/Planificador/PlanificadorTabScreens/Instrucions';
import Planificacion from '../screens/PlanificadorTemporal/Planificador/PlanificadorTabScreens/Planificacion'
import CalidadeAire from '../screens/PlanificadorTemporal/Planificador/PlanificadorTabScreens/CalidadeAire'

// propiedades
import properties from '../properties/properties_expo';

// estilos
import { stylesTopNavigator as styles } from '../styles/styles'

const Tab = createMaterialTopTabNavigator();                        // Constante sobre a que se constrúe o menú

/**
 * Compoñente que conforma o menú de navegación superior no planificador
 * @returns {Component}
 */
const TopTabNavigator = () => {

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
                <Tab.Screen 
                    name="CalidadeAire"
                    children={() => <CalidadeAire />}
                    options={{
                        tabBarLabel: 'Calidade do aire'
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default TopTabNavigator;