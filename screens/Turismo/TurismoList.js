import React, { useEffect, useState, useContext } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl, ToastAndroid } from 'react-native'

import ProgressBar from '../../components/ProgressBar';
import { getData, getElement, getGeoElement, getGeoElementJson } from '../../model/Turismo/Turismo';
import { getElementFavByName } from '../../model/Usuarios/Usuarios';
import CardElement from '../../components/CardElementTurismo';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';

import AppContext from '../../context/PlanificadorAppContext';

import { getToken, shouldDeleteToken } from '../../Util/TokenUtil'

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

    const context = useContext(AppContext)

    const onGetData = async (mounted, signal) => {
        const token = await getToken('id_token');
        var data = await getData(token, signal);
        if (data.status != 200 || data.auth == false) {
            if (mounted) {
                setState({
                    loading: false,
                    data: undefined
                });
            }
            if(!await shouldDeleteToken(data.message, 'id_token')) {
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
                if (mounted)
                    setState({
                        loading: true,
                        data: []
                    });
                await onGetData(mounted, signal);
            } catch (err) {
                console.error(err);
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        }

        if (!data) {
            if (mounted)
                reload();
        } else {
            setState({
                data: context.user.elementosFav,
                loading: false
            });
        }

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

    const doSearch = async (name) => {
        try {
            var element;
            const token = await getToken('id_token');
            if (!data) {
                element = await getElement(name, token);
            } else {
                element = await getElementFavByName(token, name);
            }
            if (element.status != 200) {
                await shouldDeleteToken(element.message, 'id_token');
            }
            if (element != undefined) {
                setState({
                    data: element,
                    loading: false
                });
            } else {
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
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
            console.error(err);
            ToastAndroid.show('Erro xeolocalizando elemento, probe de novo', ToastAndroid.SHORT);
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
                            onPress={() => navigate('TurismoItem', {
                                element: element,
                                showOnMap: showOnMap,
                                onRefresh: onRefresh
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
                                <NoData /> :
                                state.data.turismo.length == 0 ?
                                    <NoData /> :
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