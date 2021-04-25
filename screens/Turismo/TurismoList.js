import React, { useEffect, useState, useContext } from 'react'
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, ToastAndroid, Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';

import { useIsFocused } from '@react-navigation/native';

import ProgressBar from '../../components/ProgressBar';
import { getData, getElement, getGeoElement, getGeoElementJson } from '../../model/Turismo/Turismo';
import { getElementFavByName } from '../../model/Usuarios/Usuarios';
import CardElement from '../../components/CardElementTurismo';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';

import AppContext from '../../context/PlanificadorAppContext'

import { stylesTurismoList as styles } from '../../styles/styles'

const Turism = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    const data = props.route.params.data;

    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            data ?
                props.navigation.setOptions({
                    title: "Elementos turísticos favoritos"
                })
                :
                props.navigation.setOptions({
                    title: "Puntos de interese"
                })
        }

        return () => mounted = false;
    }, []);

    const isFocused = useIsFocused();
    const context = useContext(AppContext)

    const onGetData = async () => {
        const token = await SecureStore.getItemAsync('id_token');
        var data = await getData(token);
        if (data.status != 200 || data.auth == false) {
            setState({
                loading: false,
                data: undefined
            });
            if (data.message == "jwt expired") {
                await SecureStore.deleteItemAsync('id_token');
            } else {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return;
            }
        } else {
            setState({
                loading: false,
                data: data
            });
        }
    }
    
    useEffect(() => {

        let mounted = true;
        const reload = async () => {
            try {
                setState({
                    loading: true,
                    data: []
                });
                await onGetData();
            } catch (err) {
                console.error(err);
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        }

        console.log(data);

        if (mounted) {
            if (!data) {
                reload();
            } else {
                setState({
                    data: context.user.elementosFav,
                    loading: false
                });
            }
        }

    }, [isFocused]);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await onGetData();
            setRefreshing(false);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
        }
    }

    const doSearch = async (name) => {
        try {
            var element;
            if (!data) {
                element = await getElement(name);
            } else {
                const token = await SecureStore.getItemAsync('id_token');
                element = await getElementFavByName(token, name);
            }
            if (element.status != 200) {
                if (element.message == "jwt expired") {
                    await SecureStore.deleteItemAsync('id_token');
                }
            }
            if (element != undefined) {
                setState({
                    data: element,
                    loading: false
                });
            } else {
                console.error(err);
                ToastAndroid.show('Erro de conexiónn', ToastAndroid.SHORT);
            }
        } catch (err) {
            console.error(err);
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

    const ListData = (props) => {

        const data = props.data;
        const navigate = props.navigate;

        return (

            data.map(element => {
                return (
                    <TouchableOpacity
                        key={element.id}
                        onPress={() => navigate('TurismoItem', {
                            element: element,
                            showOnMap: showOnMap
                        })}>
                        <CardElement item={element} showOnMap={showOnMap} getGeoElementJson={getGeoElementJson} />
                    </TouchableOpacity>
                )
            })

        )
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
                    state.data == undefined ?
                        <NoData />
                        :
                        state.data.turismo != undefined ?
                            state.data.status != 200 ?
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                    <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
                                </View> :
                                state.data.turismo.length == 0 ?
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                        <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
                                    </View> :
                                    <ListData data={state.data.turismo} navigate={props.navigation.navigate} />

                            :
                            state.data.length == 0 ?
                                <NoData /> :
                                <ListData data={data} navigate={props.navigation.navigate} />
                }
            </ScrollView>
    )
}

export default Turism;