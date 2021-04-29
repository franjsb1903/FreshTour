import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { showMessage } from "react-native-flash-message";

import ProgressBar from '../../../components/ProgressBar';
import { getPlanificacions as getPlanificacionsModel } from '../../../model/Planificador/Planificador'
import CardElement from '../../../components/CardElementRuta';
import NoData from '../../../components/NoData';

import { useIsFocused } from '@react-navigation/native';

import { stylesTurismoList as styles, stylesScroll } from '../../../styles/styles';

import { getToken, shouldDeleteToken } from '../../../Util/TokenUtil'

const RutasRecomendadasList = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    let data;
    if (props.route.params != undefined) {
        data = props.route.params.data;
    }

    const onGetData = async (mounted, signal) => {
        const token = await getToken('id_token');
        var data = await getPlanificacionsModel(signal, token);
        if (data.status != 200 || data.auth == false) {
            if (mounted) {
                setState({
                    loading: false,
                    data: undefined
                });
            }
            if (!await shouldDeleteToken(data.message, 'id_token')) {
                showMessage({
                    message: data.message,
                    type: "danger"
                });
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
                await onGetData(mounted, signal);
            } catch (err) {
                console.error(err);
                showMessage({
                    message: 'Erro de conexión',
                    type: "danger"
                });
            }
        }

        if (!data) {
            if (mounted)
                reload();
        } else {
            if (mounted) {
                setState({
                    data: data,
                    loading: false
                });
            }
        }

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, [isFocused]);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await onGetData(true);
            setRefreshing(false);
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro de conexión',
                type: "danger"
            });
        }
    }

    const ListData = (props) => {

        const data = props.data;
        const navigate = props.navigate;

        return (
            data == undefined ?
                <NoData /> :
                data.map(element => {
                    return (
                        <TouchableOpacity
                            key={element.id}
                            onPress={() => navigate('RutasRecomendadasItem', {
                                planificacion: element,
                                onRefresh: onRefresh
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
                !data ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> :
                    <></>
            }
                style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
                {
                    state.data == undefined ?
                        <NoData />
                        :
                        state.data.planificacions != undefined ?
                            state.data.status != 200 ?
                                <NoData /> :
                                state.data.planificacions.length == 0 ?
                                    <NoData /> :
                                    <ListData data={state.data.planificacions} navigate={props.navigation.navigate} />
                            :
                            state.data.length == 0 ?
                                <NoData />
                                :
                                <ListData data={data} navigate={props.navigation.navigate} />
                }
            </ScrollView>
    )
}

export default RutasRecomendadasList;