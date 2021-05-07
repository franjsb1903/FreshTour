import React, { useEffect, useState, useContext } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native'
import { showMessage } from "react-native-flash-message";
import { Divider } from 'react-native-elements';
import ProgressBar from '../../components/ProgressBar';
import CardElement from '../../components/CardElementLecer';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';

import AppContext from '../../context/PlanificadorAppContext';

import { getAll } from '../../model/Hospedaxe/Hospedaxe'
import { getToken, shouldDeleteToken } from '../../Util/TokenUtil'

import { stylesTurismoList as styles } from '../../styles/styles'

const Hospedaxe = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);

    const context = useContext(AppContext)

    const onGetData = async (mounted, signal) => {
        var data = await getAll(signal);
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
                if (mounted)
                    setState({
                        loading: true,
                        data: []
                    });
                await onGetData(mounted, signal);
            } catch (err) {
                console.error(err);
                showMessage({
                    message: 'Erro de conexión',
                    type: "danger"
                });
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
                            onPress={() => {}}>
                            <CardElement element={element} />
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
                style={styles.scroll}>
                <View style={{ flex: 0 }}>
                    <CustomSearchBar
                        placeholder="Nome"
                        doSearch={() => { }}
                        updateItems={() => { }}
                        onChange={true}
                    />
                </View>
                {
                    state.data == undefined ?
                        <NoData />
                        :
                        state.data.hospedaxe != undefined ?
                            state.data.status != 200 ?
                                <NoData /> :
                                state.data.hospedaxe.length == 0 ?
                                    <NoData /> :
                                    <ListData data={state.data.hospedaxe} navigate={props.navigation.navigate} />
                            :
                            <NoData />
                }
            </ScrollView>
    )
}

export default Hospedaxe;