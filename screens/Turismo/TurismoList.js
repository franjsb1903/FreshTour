import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, ToastAndroid, Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';

import ProgressBar from '../../components/ProgressBar';
import { getData, getElement, getGeoElement, getGeoElementJson } from '../../model/Turismo/Turismo';
import CardElement from '../../components/CardElementTurismo';
import CustomSearchBar from '../../components/CustomSearchBar';

import { stylesTurismoList as styles } from '../../styles/styles'

const Turism = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    const data = props.route.params.data;

    useEffect(() => {
        let mounted = true;
        async function getElements() {
            try {
                const token = await SecureStore.getItemAsync('id_token');
                var data = await getData(token);
                if (mounted) {
                    setState({
                        loading: false,
                        data: data
                    });
                }
                if (data.status != 200) {
                    ToastAndroid.show(data.message, ToastAndroid.SHORT);
                }
            } catch (err) {
                console.error(err);
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        }
        if (!data) {
            getElements();
        } else {
            setState({
                loading: false,
                data: data
            })
        }

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
            if (element.status != 200) {
                ToastAndroid.show(element.message, ToastAndroid.SHORT);
                return;
            }
            if (element != undefined && element.turismo.length > 0) {
                setState({
                    data: element,
                    loading: false
                });
            } else {
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        } catch (err) {
            ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
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
            props.navigation.navigate('Map');
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
                !data ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> :
                    <></>
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
                    state.data.turismo != undefined ?
                        state.data.status != 200 ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
                            </View> :
                            state.data == undefined || state.data.turismo.length == 0 ?
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                    <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
                                </View> :
                                state.data.turismo.map(element => {
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
                        :
                        state.data == undefined ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
                            </View> :
                            state.data.length == 0 ?
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