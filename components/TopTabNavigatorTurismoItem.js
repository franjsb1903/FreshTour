/**
 * @fileoverview Menú de navegador superior dun elemento turístico concreto
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { View, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Util
import { getImageUri } from '../Util/ImageUtil';

// pantallas
import Informacion from '../screens/Turismo/TurismoItem/Informacion';
import Resumo from '../screens/Common/Resumo';
import TiposVisita from '../screens/Turismo/TurismoItem/TiposVisita';
import Opinions from '../screens/Common/Opinions';

// propiedades
import properties from '../properties/properties_expo';

//estilos
import { stylesTopNavigator as styles } from '../styles/styles'

const Tab = createMaterialTopTabNavigator();                            // Constante sobre a que se constrúe o menú

/**
 * Compoñente que reúne o menú superior dun elemento turístico concreto
 * @param {Object} props 
 * @returns {Component}
 */
const TopTabNavigator = (props) => {

    const element = props.element;                                      // Elemento turístico
    const showOnMap = props.showOnMap;                                  // Función que permite xeolocalizar o elemento no mapa
    const opinions = props.opinions;                                    // Opinións do elemento
    const onRefreshOpinions = props.onRefreshOpinions;                  // Función que permite refrescar as opinións do elemento
    const onRefresh = props.onRefresh;                                  // Función que permite refrescar a información do elemento
    const isRuta = props.isRuta;                                        // Boolean que determina se se está no contexto dunha ruta
    const isElementoRuta = props.isElementoRuta;                        // Boolean que determina se é un elemento pertencente a unha ruta

    const uriImage = getImageUri(element.imaxe);

    return (
        <>
            <View>
                <Image source={{ uri: uriImage }} style={styles.image} />
            </View>
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
                    children={() => <Resumo isElementoRuta={isElementoRuta} element={element} showOnMap={showOnMap} opinions={opinions} onRefresh={onRefresh} isRuta={isRuta} />}
                    options={{
                        tabBarLabel: 'Resumo'
                    }} />
                <Tab.Screen
                    name="Informacion"
                    children={() => <Informacion element={element} /> }
                    options={{
                        tabBarLabel: 'Información'
                    }} />
                <Tab.Screen
                    name="TiposVisita"
                    children={() => <TiposVisita element={element} /> }
                    options={{
                        tabBarLabel: 'Tipos de visita'
                    }} />
                <Tab.Screen
                    name="Opinions"
                    children={() => <Opinions opinions={opinions} element={element} onRefreshOpinions={onRefreshOpinions} titulo={element.titulo} />}
                    options={{
                        tabBarLabel: 'Opinions'
                    }} />
            </Tab.Navigator>
        </>
    )
}

export default TopTabNavigator;