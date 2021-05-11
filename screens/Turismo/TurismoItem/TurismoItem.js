import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import { showMessage } from "react-native-flash-message";
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
    const isRuta = route.params.isRuta;
    const isElementoRuta = route.params.isElementoRuta;

    const onGetData = async (mounted, signal) => {
        try {
            const data = await getOpinionsModel(element.tipo, element.id, signal);
            if (data.status != 200) {
                showMessage({
                    message: 'Erro na obtención das opinións do elemento',
                    type: "danger"
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
                type: "danger"
            });
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
                isRuta={isRuta}
                isElementoRuta={isElementoRuta}
            />
    )
}

export default TurismoItem;