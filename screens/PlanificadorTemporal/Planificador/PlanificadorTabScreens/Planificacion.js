import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton } from '../../../../components/CustomIcons';
import CardElementPlanificacion from '../../../../components/CardElementPlanificacion'
import CardElementRuta from '../../../../components/CardElementRutaPlanificacion'

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow, stylesScroll } from '../../../../styles/styles';

import AppContext from '../../../../components/PlanificadorAppContext';

const Planificacion = () => {

    const [items, setItems] = useState([]);
    const [route, setRoute] = useState({});

    const navigation = useNavigation();

    const context = useContext(AppContext);

    useEffect(() => {
        let mounted = true;

        if (mounted)
            setItems(context.turismoItems);

        return () => mounted = false;
    }, [context.turismoItems]);

    useEffect(() => {
        let mounted = true;
        if (mounted)
            setRoute(context.route.routeJson);

        return () => mounted = false;
    }, [context.route.routeJson]);


    const drawCards = () => {
        var cards = [];
        for (var i = 0; i < items.length; i++) {
            if (i == 0) {
                cards.push(
                    <CardElementPlanificacion key={i} element={items[i]} isFirst={true} isLast={false} />
                )
            } else {
                const isLast = i == items.length - 1;
                cards.push(
                    <View key={i}>
                        <CardElementRuta anterior={items[i - 1]} element={items[i]} route={route} position={i - 1} />
                        <CardElementPlanificacion element={items[i]} isFirst={false} isLast={isLast} />
                    </View>
                )
            }
        }
        return cards;
    }

    const onMapClick = () => {
        navigation.navigate('Map');
    }

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={stylesRow.container}>
                <View style={styles.leftIconsContainer}>
                    <SaveIconButton />
                    <ShareIconButton />
                </View>
                <View style={styles.rightIconsContainer}>
                    <MapIconButton onMapClick={onMapClick} />
                </View>
                <View style={styles.centerIconsContainer}>
                    <WalkIconButton />
                    <BicycleIconButton />
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