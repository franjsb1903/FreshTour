import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import CardElementPlanificacion from '../../../../components/CardElementPlanificacion';
import CardElementRuta from '../../../../components/CardElementRutaPlanificacion';
import NoElementsPlanificadorView from '../../../../components/NoElementsPlanificadorView';

import { stylesScroll } from '../../../../styles/styles';

import AppContext from '../../../../context/AppContext';

const Planificacion = () => {

    const [items, setItems] = useState([]);
    const [route, setRoute] = useState({});

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
                    <CardElementPlanificacion key={i} numberElements={items.length} element={items[i]} isFirst={true} isLast={false} onDeleteItemPlanificador={onDeleteItem} />
                )
            } else {
                const isLast = i == items.length - 1;
                cards.push(
                    <View key={i}>
                        <CardElementRuta anterior={items[i - 1]} element={items[i]} route={route} position={i - 1} />
                        <CardElementPlanificacion element={items[i]} numberElements={items.length} isFirst={false} isLast={isLast} onDeleteItemPlanificador={onDeleteItem} />
                    </View>
                )
            }
        }
        return cards;
    }

    const onDeleteItem = (id) => {
        var aux = [];
        for (var i = 0; i < items.length; i++) {
            const e = items[i];
            if (`${e.features[0].properties.id}` != id) {
                aux.push(e);
            }
        }
        setItems(aux);
        context.updateItems(aux);
    }

    return (

        items.length > 0 ?
            <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
                {drawCards()}
            </ScrollView>
            :
            <NoElementsPlanificadorView />


    );
}

export default Planificacion;