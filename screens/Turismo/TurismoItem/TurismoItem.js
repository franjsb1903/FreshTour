import React, { useEffect, useState } from 'react';
import { ToastAndroid, Alert, Platform, View } from 'react-native'

import TopTabNavigator from '../../../components/TopTabNavigatorTurismoItem';

import { getOpinions as getOpinionsModel } from '../../../model/Opinions/Opinions';
import ProgressBar from '../../../components/ProgressBar';
import { stylesTurismoList as styles } from '../../../styles/styles';

const TurismoItem = ({ route, navigation }) => {

    const [opinions, setOpinions] = useState({
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });

    const [loading, setLoading] = useState(true);

    const element = route.params.element;
    const showOnMap = route.params.showOnMap;
    const onRefresh = route.params.onRefresh;

    const onGetData = async (mounted, signal) => {
        try {
            const data = await getOpinionsModel(element.tipo, element.id, signal);
            if (data.status != 200) {
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
                    count: data.count,
                    valoracion: data.valoracion,
                    opinions: data.opinions,
                    status: data.status
                });
                setLoading(false);
            }
        } catch (err) {
            if (mounted) {
                setLoading(false);
            }
            console.error(err);
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

    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted)
            navigation.setOptions({
                title: `${element.titulo}`
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
                element={element}
                showOnMap={showOnMap}
                opinions={opinions}
                onRefreshOpinions={onRefreshOpinions}
                onRefresh={onRefresh}
            />
    )
}

export default TurismoItem;