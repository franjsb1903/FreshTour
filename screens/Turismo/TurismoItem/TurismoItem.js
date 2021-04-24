import React, { useEffect, useState } from 'react';
import { ToastAndroid, Alert, Platform, View } from 'react-native'

import TopTabNavigator from '../../../components/TopTabNavigatorTurismoItem';

import { getOpinions as getOpinionsModel } from '../../../model/Opinions/Opinions';
import ProgressBar from '../../../components/ProgressBar';
import { stylesTurismoList as styles } from '../../../styles/styles';

import { useIsFocused } from '@react-navigation/native';

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

    const isFocused = useIsFocused();

    const onGetData = async () => {
        try {
            const data = await getOpinionsModel(element.tipo, element.id);
            if (data.status != 200) {
                if (Platform.OS == "android") {
                    ToastAndroid.show('Erro na obtención das opinións do elemento', ToastAndroid.SHORT);
                } else {
                    Alert.alert('Erro na obtención das opinións do elemento');
                }
                setLoading(false);
                return;
            }
            setOpinions({
                count: data.count,
                valoracion: data.valoracion,
                opinions: data.opinions,
                status: data.status
            });
            setLoading(false);
        } catch (err) {
            setLoading(false);
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

        const getOpinions = async () => {
            await onGetData();
        }

        if (mounted) {
            getOpinions();
        }

        return () => mounted = false;
    }, [isFocused]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${element.titulo}`
        });
    }, []);

    const onRefreshOpinions = async () => {
        await onGetData();
    }

    return (
        loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View> :
            <TopTabNavigator element={element} showOnMap={showOnMap} opinions={opinions} onRefreshOpinions={onRefreshOpinions}/>
    )
}

export default TurismoItem;