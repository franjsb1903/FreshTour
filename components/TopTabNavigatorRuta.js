import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DatosRuta from '../screens/Common/DatosRuta';
import Resumo from '../screens/Common/Resumo';
import Opinions from '../screens/Common/Opinions';
import ElementosVisitar from '../screens/PlanificadorTemporal/Rutas/RutasRecomendadasItem/ElementosVisitar'

import properties from '../properties/properties_expo';
import { stylesTopNavigator as styles } from '../styles/styles'

const Tab = createMaterialTopTabNavigator();


const TopTabNavigatorRuta = (props) => {

    const planificacion = props.planificacion;
    const opinions = props.opinions;
    const elements = props.elements;
    const onRefreshOpinions = props.onRefreshOpinions;
    const onRefresh = props.onRefresh;

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
                    children={() => <Resumo element={planificacion} opinions={opinions} isRuta={true} onRefresh={onRefresh} />}
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