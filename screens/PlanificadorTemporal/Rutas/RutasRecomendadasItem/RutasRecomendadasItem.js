import React, { useEffect, useState } from 'react';
import { ToastAndroid, Alert, Platform, View } from 'react-native'

import TopTabNavigator from '../../../../components/TopTabNavigatorRuta';

import { getOpinions as getOpinionsModel } from '../../../../model/Opinions/Opinions';
import { getElements } from '../../../../model/Planificador/Planificador'
import ProgressBar from '../../../../components/ProgressBar';
import { stylesTurismoList as styles } from '../../../../styles/styles';

import { useIsFocused } from '@react-navigation/native';

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

    const onGetData = async (mounted, signal) => {
        try {
            const opinions = await getOpinionsModel(planificacion.tipo, planificacion.id, signal);
            if (opinions.status != 200) {
                if (Platform.OS == "android") {
                    ToastAndroid.show('Erro na obtención das opinións do elemento', ToastAndroid.SHORT);
                } else {
                    Alert.alert('Erro na obtención das opinións do elemento');
                }
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
                if (Platform.OS == "android") {
                    ToastAndroid.show(elements.message, ToastAndroid.SHORT);
                } else {
                    Alert.alert(elements.message);
                }
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
            if (Platform.OS == "android") {
                ToastAndroid.show('Erro na obtención das opinións do elemento', ToastAndroid.SHORT);
            } else {
                Alert.alert('Erro na obtención das opinións do elemento');
            }
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
            />
    )
}

export default TurismoItem;