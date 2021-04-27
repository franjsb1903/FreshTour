import React, { useEffect, useState, useContext } from 'react'
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, ToastAndroid, Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';

import ProgressBar from '../../../components/ProgressBar';
import { getPlanificacions as getPlanificacionsModel } from '../../../model/Planificador/Planificador'
import CardElement from '../../../components/CardElementRuta';
import { ListData } from '../../../components/Common';
import NoData from '../../../components/NoData';

import AppContext from '../../../context/PlanificadorAppContext'

import { stylesTurismoList as styles, stylesScroll } from '../../../styles/styles'

const RutasRecomendadasList = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    const context = useContext(AppContext)

    const onGetData = async (mounted, signal) => {
        const token = await SecureStore.getItemAsync('id_token');
        var data = await getPlanificacionsModel(signal, token);
        if (data.status != 200 || data.auth == false) {
            if (mounted) {
                setState({
                    loading: false,
                    data: undefined
                });
            }
            if (data.message == "jwt expired") {
                await SecureStore.deleteItemAsync('id_token');
            } else {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return;
            }
        } else {
            if (mounted) {
                setState({
                    loading: false,
                    data: data
                });
            }
        }
    }

    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();
        const signal = abortController.signal;

        const reload = async () => {
            try {
                if (mounted) {
                    setState({
                        loading: true,
                        data: []
                    });
                }
                const token = await SecureStore.getItemAsync('id_token');
                var data = await getPlanificacionsModel(signal, token);
                if (data.status != 200 || data.auth == false) {
                    if (mounted) {
                        setState({
                            loading: false,
                            data: undefined
                        });
                    }
                    if (data.message == "jwt expired") {
                        await SecureStore.deleteItemAsync('id_token');
                    } else {
                        ToastAndroid.show(data.message, ToastAndroid.SHORT);
                        return;
                    }
                } else {
                    if (mounted) {
                        setState({
                            loading: false,
                            data: data
                        });
                    }
                }
            } catch (err) {
                console.error(err);
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        }

        if (mounted)
            reload();

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await onGetData(true);
            setRefreshing(false);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
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
                        onPress={() => navigate('RutasRecomendadasItem', {
                            planificacion: element
                        })}>
                        <CardElement planificacion={element} />
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
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
                {
                    state.data == undefined ?
                        <NoData />
                        :
                        state.data.status != 200 ?
                            <NoData /> :
                            state.data.planificacions.length == 0 ?
                                <NoData /> :
                                <ListData data={state.data.planificacions} navigate={props.navigation.navigate} />
                }
            </ScrollView>
    )
}

export default RutasRecomendadasList;