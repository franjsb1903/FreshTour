/**
 * @fileoverview Pantalla de instrucións dentro do planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, useState, useEffect, Component } from 'react';
import { ScrollView } from 'react-native';

// contexto
import AppContext from '../../../../context/AppContext';

// compoñentes
import CustomListInstrucions from '../../../../components/CustomListInstrucions';
import NoElementsPlanificadorView from '../../../../components/NoElementsPlanificadorView';

// estilos
import { stylesScroll as styles } from '../../../../styles/styles';

/**
 * Compoñente que conforma a pantalla de instrucións do planificador
 * @returns {Component}
 */
const Instrucions = () => {

    const [data, setData] = useState(undefined);                // Estado que reúne os datos a amosar
    const [items, setItems] = useState([]);                     // Estado que reúne os elementos da planificación
    const context = useContext(AppContext);                     // Constante para empregar o contexto

    /**
     * Execútase o contido da función cando cambian os datos de routeJson (da ruta) no contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setData(context.route.routeJson);
        }

        return () => mounted = false;
    }, [context.route.routeJson]);

    /**
     * Execútase o contido da función cando cambia o array de elementos da planificación do contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted)
            setItems(context.turismoItems);

        return () => mounted = false;
    }, [context.turismoItems]);

    /**
     * Constrúe a listaxe de instrucións
     * @returns {Component}
     */
    const drawList = () => {
        var list = [];
        for (var i = 0; i < items.length - 1; i++) {
            list.push(
                <CustomListInstrucions key={i} element={items[i]} steps={data.features[0].properties.segments[i].steps} />
            );
        }
        list.push(
            <CustomListInstrucions key={items[items.length - 1].features[0].properties.id} element={items[items.length - 1]} steps={undefined} />
        )
        return list;
    }

    return (
        data && data.features && data.features[0].properties.segments[items.length - 2] ?
            <ScrollView style={styles.scroll}>
                {drawList()}
            </ScrollView>
            :
            <NoElementsPlanificadorView />
    );
}

export default Instrucions;