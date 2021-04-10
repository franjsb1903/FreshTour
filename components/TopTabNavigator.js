import React from 'react';
import { StyleSheet, View, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { getImageUri } from '../Util/ImageUtil';

import Informacion from '../screens/Turismo/TurismoItem/Informacion';
import Resumo from '../screens/Turismo/TurismoItem/Resumo';
import TiposVisita from '../screens/Turismo/TurismoItem/TiposVisita';
import Opinions from '../screens/Turismo/TurismoItem/Opinions';

import properties from '../properties/properties_expo';

const Tab = createMaterialTopTabNavigator();


const TopTabNavigator = (props) => {

    const element = props.element;
    const showOnMap = props.showOnMap;

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
                    activeTintColor: properties.color.text,
                    style: styles.tabBarStyle,
                    indicatorStyle: { backgroundColor: properties.color.topTabIndicator }
                }}>
                <Tab.Screen
                    name="Resumo"
                    children={() => <Resumo element={element} showOnMap={showOnMap} />}
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
                    component={Opinions}
                    options={{
                        tabBarLabel: 'Opinions'
                    }} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: properties.color.main
    },
    image: {
        width: "100%",
        height: 150
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TopTabNavigator;