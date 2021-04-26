import React, { useEffect, useState, useContext } from 'react'
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, ToastAndroid, Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';

import { useIsFocused } from '@react-navigation/native';

import ProgressBar from '../../../components/ProgressBar';
import { getPlanificacions as getPlanificacionsModel } from '../../../model/Planificador/Planificador'
import CardElement from '../../../components/CardElementRuta';
import NoData from '../../../components/NoData';

import AppContext from '../../../context/PlanificadorAppContext'

import { stylesTurismoList as styles, stylesScroll } from '../../../styles/styles'

const Turism = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({
                title: "Rutas recomendadas"
            })
        }

        return () => mounted = false;
    }, []);

    const isFocused = useIsFocused();
    const context = useContext(AppContext)

    const onGetData = async (mounted) => {
        var data = await getPlanificacionsModel();
        if (data.status != 200) {
            if (mounted) {
                setState({
                    loading: false,
                    data: undefined
                });
            }
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            return;
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
        const reload = async () => {
            try {
                if (mounted) {
                    setState({
                        loading: true,
                        data: []
                    });
                }
                await onGetData(mounted);
            } catch (err) {
                console.error(err);
                ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
            }
        }

        reload();

    }, [isFocused]);

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
                        onPress={() => console.log("epa")}>
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

export default Turism;