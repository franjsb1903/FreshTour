import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native'
import { showMessage } from "react-native-flash-message";

import TopTabNavigator from '../../../../components/TopTabNavigatorRuta';

import { getOpinions as getOpinionsModel } from '../../../../model/Opinions/Opinions';
import { getElements } from '../../../../model/Planificador/Planificador'
import ProgressBar from '../../../../components/ProgressBar';
import { stylesTurismoList as styles } from '../../../../styles/styles';

import AppContext from '../../../../context/AppContext';

const TurismoItem = ({ route, navigation }) => {

    const [opinions, setOpinions] = useState({
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });

    const [elements, setElements] = useState([]);

    const [loading, setLoading] = useState(true);

    const planificacion = route.params.planificacion;
    const onRefresh = route.params.onRefresh;

    const context = useContext(AppContext);

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

    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();
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

    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted)
            navigation.setOptions({
                title: `${planificacion.titulo}`
            });

        return () => mounted = false;
    }, []);

    const onRefreshOpinions = async () => {
        await onGetData(true);
    }

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

export default TurismoItem;