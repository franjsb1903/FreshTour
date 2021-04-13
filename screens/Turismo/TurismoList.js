import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, ToastAndroid, Platform } from 'react-native'

import ProgressBar from '../../components/ProgressBar';
import { getData, getElement, getGeoElement, getGeoElementJson } from '../../model/Turismo/Turismo';
import CardElement from '../../components/CardElementTurismo';
import CustomSearchBar from '../../components/CustomSearchBar';

import AppContextProvider from '../../components/PlanificadorAppContextProvider';

import { stylesTurismoList as styles } from '../../styles/styles'

const Turism = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function getElements() {
            try {
                var data = await getData();
                if (mounted) {
                    setState({
                        loading: false,
                        data: data
                    });
                }
            } catch (err) {
                console.error(err);
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        }
        getElements();

        return () => mounted = false;

    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            var data = await getData();
            setState({
                loading: false,
                data: data
            });
            if (Platform.OS == "android") {
                ToastAndroid.show('Puntos de interese actualizados', ToastAndroid.SHORT);
            }
            setRefreshing(false);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
        }
    }

    const doSearch = async (data) => {
        try {
            const element = await getElement(data);
            if (element != undefined && element.length > 0) {
                setState({
                    data: element,
                    loading: false
                });
            } else {
                ToastAndroid.show('Non se atopa o elemento', ToastAndroid.SHORT);
            }
        } catch (err) {
            ToastAndroid.show('Non se atopa o elemento', ToastAndroid.SHORT);
        }
    }

    const showOnMap = async (id) => {
        try {
            const text = await getGeoElement(id);
            if (text == undefined) {
                ToastAndroid.show('Erro xeolocalizando elemento, probe de novo', ToastAndroid.SHORT);
                return;
            }
            const update = props.route.params.updateItem;
            update(text);
            props.navigation.navigate('BottomTabNavigator');
        } catch (err) {
            ToastAndroid.show('Erro xeolocalizando elemento, probe de novo', ToastAndroid.SHORT);
        }
    }

    return (

        state.loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View>
            :
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                    style={styles.scroll}>
                    <View style={{ flex: 0 }}>
                        <CustomSearchBar
                            placeholder="Nome"
                            doSearch={doSearch}
                            updateItems={() => { }}
                            onChange={true}
                        />
                    </View>
                    {
                        state.data == undefined || state.data.length == 0 ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
                            </View> :
                            state.data.map(element => {
                                return (
                                    <TouchableOpacity
                                        key={element.id}
                                        onPress={() => props.navigation.navigate('TurismoItem', {
                                            element: element,
                                            showOnMap: showOnMap
                                        })}>
                                        <CardElement item={element} showOnMap={showOnMap} getGeoElementJson={getGeoElementJson} />
                                    </TouchableOpacity>
                                )
                            })

                    }
                </ScrollView>
    )
}

export default Turism;