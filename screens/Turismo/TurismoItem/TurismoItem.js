/**
 * @fileoverview Pantalla dun elemento turístico concreto
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, Component } from 'react';
import { View } from 'react-native'
import { showMessage } from "react-native-flash-message";

// compoñentes
import TopTabNavigator from '../../../components/TopTabNavigatorTurismoItem';
import ProgressBar from '../../../components/ProgressBar';

// modelo
import { getOpinions as getOpinionsModel } from '../../../model/Opinions/Opinions';

// estilos
import { stylesTurismoList as styles } from '../../../styles/styles';

/**
 * Compoñente que conforma a pantalla dun elemento turístico concreto
 * @param {Object} param0 
 * @returns {Component}
 */
const TurismoItem = ({ route, navigation }) => {

    const [opinions, setOpinions] = useState({              // Estado que almacena as opinións do elemento
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });

    const [loading, setLoading] = useState(true);           // Estado que indica cando a pantalla está cargando información

    const element = route.params.element;                   // Obxecto que conforma a información do elemento turístico concreto
    const showOnMap = route.params.showOnMap;               // Función que permite xeolocalizar o elemento no mapa
    const onRefresh = route.params.onRefresh;               // Función que permite refrescar a pantalla
    const isRuta = route.params.isRuta;                     // Función que indica se se está no contexto dunha ruta
    const isElementoRuta = route.params.isElementoRuta;     // Función que indica se o elemento se está visualizando como parte dunha ruta

    /**
     * Obtén información do elemento turístico
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns {Component}
     */
    const onGetData = async (mounted, signal) => {
        try {
            const data = await getOpinionsModel(element.tipo, element.id, signal);
            if (data.status != 200) {
                showMessage({
                    message: 'Erro na obtención das opinións do elemento',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                if (mounted) {
                    setOpinions({
                        count: 0,
                        valoracion: 0,
                        opinions: [],
                        status: 0
                    });
                    setLoading(false);
                }
                return;
            } else {
                if (mounted) {
                    setOpinions({
                        count: data.count,
                        valoracion: data.valoracion,
                        opinions: data.opinions,
                        status: data.status
                    });
                    setLoading(false);
                }
            }
        } catch (err) {
            if (mounted) {
                setLoading(false);
            }
            console.error(err);
            showMessage({
                message: 'Erro na obtención das opinións do elemento',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Execútase cando se construe o compoñente, obtendo a información do mesmo
     */
    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();                  // Control dunha petición web
        const signal = abortController.signal;

        const getOpinions = async () => {
            await onGetData(mounted, signal);
        }

        if (mounted)
            getOpinions();

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, []);

    /**
     * Execútase cando se constrúe o compoñente, establecendo opcións de navegación
     */
    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted)
            navigation.setOptions({
                title: `${element.titulo}`
            });

        return () => mounted = false;
    }, []);

    /**
     * Refresca as opinións
     */
    const onRefreshOpinions = async () => {
        await onGetData(true);
    }

    return (
        loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View> :
            <TopTabNavigator
                element={element}
                showOnMap={showOnMap}
                opinions={opinions}
                onRefreshOpinions={onRefreshOpinions}
                onRefresh={onRefresh}
                isRuta={isRuta}
                isElementoRuta={isElementoRuta}
            />
    )
}

export default TurismoItem;