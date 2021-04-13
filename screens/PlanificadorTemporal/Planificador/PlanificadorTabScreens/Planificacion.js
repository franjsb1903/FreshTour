import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, Vibration } from 'react-native';

import { SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton } from '../../../../components/CustomIcons';
import CardElementPlanificacion from '../../../../components/CardElementPlanificación'

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow } from '../../../../styles/styles';

import AppContext from '../../../../components/PlanificadorAppContext';

const Planificacion = () => {

    const [items, setItems] = useState([]);
    const [route, setRoute] = useState({});

    const context = useContext(AppContext);

    useEffect(() => {
        setItems(context.turismoItems);
    }, [context.turismoItems]);

    useEffect(() => {
        setRoute(context.routeJson);
    }, [context.routeJson]);

    

    const drawCards = () => {
        var cards = [];
        for (var i = 0; i < items.length; i++) {
            if (i == 0) {
                cards.push(
                    <CardElementPlanificacion key={i} element={items[i]} />
                )
            } else {
                cards.push(
                    <View>
                        <Text>Hola</Text>
                        <CardElementPlanificacion key={i} element={items[i]} />
                    </View>
                )
            }
        }
        return cards;
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={stylesRow.container}>
                <View style={styles.leftIconsContainer}>
                    <SaveIconButton />
                    <ShareIconButton />
                </View>
                <View style={styles.centerIconsContainer}>
                    <WalkIconButton />
                    <BicycleIconButton />
                </View>
                <View style={styles.rightIconsContainer}>
                    <MapIconButton />
                </View>
            </View>
            {
                items.length > 0 ?
                    drawCards()
                    :
                    <Text>Cree unha planificación</Text>
            }
        </ScrollView>
    );
}

export default Planificacion;