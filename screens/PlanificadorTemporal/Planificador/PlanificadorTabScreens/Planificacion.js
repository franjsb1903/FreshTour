/**
 * @fileoverview Pantalla de planificación dentro do planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, useEffect, useState, Component } from 'react';
import { View, ScrollView } from 'react-native';

// compoñentes
import CardElementPlanificacion from '../../../../components/CardElementPlanificacion';
import CardElementRuta from '../../../../components/CardElementRutaPlanificacion';
import NoElementsPlanificadorView from '../../../../components/NoElementsPlanificadorView';

// estilos
import { stylesScroll } from '../../../../styles/styles';

// contexto
import AppContext from '../../../../context/AppContext';

/**
 * Compoñente que conforma a pantalla de planificación dentro do planificador
 * @returns 
 */
const Planificacion = () => {

    const [items, setItems] = useState([]);             // Estado que almacena os elementos da planificación
    const [route, setRoute] = useState({});             // Estado que almacena os datos da ruta

    const context = useContext(AppContext);             // Constante para empregar o contexto

    /**
     * Execútase o contido da función cando cambia o array de elementos do contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted)
            setItems(context.turismoItems);

        return () => mounted = false;
    }, [context.turismoItems]);

    /**
     * Execútase o contido da función cando cambian os datos da ruta no contexto
     */
    useEffect(() => {
        let mounted = true;
        if (mounted)
            setRoute(context.route.routeJson);

        return () => mounted = false;
    }, [context.route.routeJson]);


    /**
     * Constrúe a listaxe de tarxetas da planificación
     * @returns {Component}
     */
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

    /**
     * Elimina un elemento da planificación
     * @param {Number} id 
     */
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