import React, { useEffect, useState } from 'react';
import { ToastAndroid, Alert, Platform } from 'react-native'

import TopTabNavigator from '../../../components/TopTabNavigatorTurismoItem';

import { getOpinions as getOpinionsModel } from '../../../model/Opinions/Opinions'

const TurismoItem = ({ route, navigation }) => {

    const [opinions, setOpinions] = useState({
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });

    const element = route.params.element;
    const showOnMap = route.params.showOnMap;

    useEffect(() => {

        let mounted = true;

        const getOpinions = async () => {
            try {
                const data = await getOpinionsModel(element.tipo, element.id);
                if(data.status != 200) {
                    if(Platform.OS == "android") {
                        ToastAndroid.show('Erro na obtención das opinións do elemento', ToastAndroid.SHORT);
                    } else {
                        Alert.alert('Erro na obtención das opinións do elemento');
                    }
                    return;
                }
                setOpinions({
                    count: data.count,
                    valoracion: data.valoracion,
                    opinions: data.opinions,
                    status: data.status
                });
            } catch (err) {
                console.error(err);
                if(Platform.OS == "android") {
                    ToastAndroid.show('Erro na obtención das opinións do elemento', ToastAndroid.SHORT);
                } else {
                    Alert.alert('Erro na obtención das opinións do elemento');
                }
            }
        }

        if(mounted) {
            getOpinions();
        }

        return () => mounted = false;
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${element.titulo}`
        });
    }, []);

    return(
        <TopTabNavigator element={element} showOnMap={showOnMap} opinions={opinions} />
    )
}

export default TurismoItem;