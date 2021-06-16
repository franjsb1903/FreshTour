/**
 * @fileoverview Menú de navegación superior nunha ruta recomendada
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulo
import React, {Component} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// pantallas
import DatosRuta from '../screens/Common/DatosRuta';
import Resumo from '../screens/Common/Resumo';
import Opinions from '../screens/Common/Opinions';
import ElementosVisitar from '../screens/PlanificadorTemporal/Rutas/RutasRecomendadasItem/ElementosVisitar'

// propiedades
import properties from '../properties/properties_expo';

// estilos
import { stylesTopNavigator as styles } from '../styles/styles'

const Tab = createMaterialTopTabNavigator();                            // Constante sobre a que se constrúe o menú

/**
 * Compoñente que conforma o menú de navegación superior dunha ruta recomendada
 * @param {Object} props 
 * @returns {Component}
 */
const TopTabNavigatorRuta = (props) => {

    const planificacion = props.planificacion;                          // Planificación
    const opinions = props.opinions;                                    // Opinións da planificación
    const elements = props.elements;                                    // Elementos da planificación
    const onRefreshOpinions = props.onRefreshOpinions;                  // Función que permite refrescar as opinións
    const onRefresh = props.onRefresh;                                  // Función que permite refrescar a información da ruta recomendada
    const showOnPlanificacion = props.showOnPlanificacion;              // Función que permite recuperar a planificación para visualizada no planificador

    return (
        <>
            <Tab.Navigator
                initialRouteName="Resumo"
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
                    name="Resumo"
                    children={() => <Resumo element={planificacion} opinions={opinions} isRuta={true} onRefresh={onRefresh} showOnPlanificacion={showOnPlanificacion} />}
                    options={{
                        tabBarLabel: 'Resumo'
                    }} />
                <Tab.Screen
                    name="ElementosVisitar"
                    children={() => <ElementosVisitar elements={elements} />}
                    options={{
                        tabBarLabel: 'Elementos a visitar'
                    }} />
                <Tab.Screen
                    name="DatosRuta"
                    children={() => <DatosRuta planificacion={planificacion} elements={elements} />}
                    options={{
                        tabBarLabel: 'Datos de ruta'
                    }} />
                <Tab.Screen
                    name="Opinions"
                    children={() => <Opinions opinions={opinions} element={planificacion} titulo={planificacion.titulo} onRefreshOpinions={onRefreshOpinions} isPlanificacion={true} />}
                    options={{
                        tabBarLabel: 'Opinións'
                    }} />
            </Tab.Navigator>
        </>
    )
}

export default TopTabNavigatorRuta;