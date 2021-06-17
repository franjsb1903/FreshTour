/**
 * @fileoverview Pantalla dunha ruta recomendada concreta
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, useContext, Component } from 'react';
import { View } from 'react-native'
import { showMessage } from "react-native-flash-message";

// compoñentes
import TopTabNavigator from '../../../../components/TopTabNavigatorRuta';
import ProgressBar from '../../../../components/ProgressBar';

// modelo
import { getOpinions as getOpinionsModel } from '../../../../model/Opinions/Opinions';
import { getElements } from '../../../../model/Planificador/Planificador';

// estilos
import { stylesTurismoList as styles } from '../../../../styles/styles';

// contexto
import AppContext from '../../../../context/AppContext';

/**
 * Compoñente que conforma a pantalla dunha ruta recomendada concreta
 * @param {Object} param0 
 * @returns {Component}
 */
const RutasRecomendadasItem = ({ route, navigation }) => {

    const [opinions, setOpinions] = useState({                      // Estado que garda as opinións da ruta
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });

    const [elements, setElements] = useState([]);                   // Estado que almacena os elementos da ruta

    const [loading, setLoading] = useState(true);                   // Estado que indica se a pantalla está cargando

    const planificacion = route.params.planificacion;               // Obxecto que reúne a información da ruta
    const onRefresh = route.params.onRefresh;                       // Función para refrescar a pantalla

    const context = useContext(AppContext);                         // Constante para acceder ao contexto

    /**
     * Obtén datos da ruta
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns
     */
    const onGetData = async (mounted, signal) => {
        try {
            const opinions = await getOpinionsModel(planificacion.tipo, planificacion.id, signal);
            if (opinions.status != 200) {
                showMessage({
                    message: opinions.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                if (mounted) {
                    setLoading(false);
                }
                return;
            }
            if (mounted) {
                setOpinions({
                    count: opinions.count,
                    valoracion: opinions.valoracion,
                    opinions: opinions.opinions,
                    status: opinions.status
                });
            }
            const elements = await getElements(planificacion.id, signal);
            if (elements.status != 200) {
                showMessage({
                    message: elements.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                if (mounted) {
                    setLoading(false);
                }
                return;
            }
            if (mounted) {
                setElements(elements);
                setOpinions({
                    count: opinions.count,
                    valoracion: opinions.valoracion,
                    opinions: opinions.opinions,
                    status: opinions.status
                });
                setLoading(false);
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
     * Execútase o contido da función cando se monta o compoñente
     */
    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();                      // Control dunha petición web, dando maior seguridade
        const signal = abortController.signal;

        const getData = async () => {
            await onGetData(mounted, signal);
        }

        if (mounted)
            getData();

        return () => {
            mounted = false;
            abortController.abort();
        }
    }, []);

    /**
     * Execútase o contido da función cando se monta o compoñente
     */
    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted)
            navigation.setOptions({                                             // Establece opcións de navegación
                title: `${planificacion.titulo}`
            });

        return () => mounted = false;
    }, []);

    /**
     * Refresca a pantalla de opinións
     */
    const onRefreshOpinions = async () => {
        await onGetData(true);
    }

    /**
     * Permite recuperar a ruta recomendada para visualizala no planificador
     */
    const showOnPlanificacion = async () => {
        try {
            await context.addElementsToPlanificacion(elements.elementos, planificacion, navigation);
        } catch (err) {
            console.error(err.message);
            showMessage({
                message: 'Erro na planificación',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    return (
        loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View> :
            <TopTabNavigator
                planificacion={planificacion}
                opinions={opinions}
                onRefreshOpinions={onRefreshOpinions}
                elements={elements}
                onRefresh={onRefresh}
                showOnPlanificacion={showOnPlanificacion}
            />
    )
}

export default RutasRecomendadasItem;