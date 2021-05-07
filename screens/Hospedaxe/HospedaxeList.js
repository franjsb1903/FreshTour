import React, { useEffect, useState, useContext } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native'
import { showMessage } from "react-native-flash-message";
import { Divider } from 'react-native-elements';
import ProgressBar from '../../components/ProgressBar';
import CardElement from '../../components/CardElementLecer';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';
import DropDown from '../../components/CustomDropDown';

import AppContext from '../../context/PlanificadorAppContext';

import { getAll, getGeoElement, filterSort } from '../../model/Hospedaxe/Hospedaxe'
import { getToken, shouldDeleteToken } from '../../Util/TokenUtil'

import { stylesTurismoList as styles } from '../../styles/styles'

const Hospedaxe = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [dropDownValue, setDropDownValue] = useState("all_valoracion");

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

    const showOnMap = async (id, tipo, subtipo) => {
        try {
            const text = await getGeoElement(id, tipo);
            if (text == undefined) {
                showMessage({
                    message: 'Erro xeolocalizando elemento, probe de novo',
                    type: "danger"
                });
                return;
            }
            const update = props.route.params.updateItem;
            update(text, subtipo);
            props.navigation.navigate('Map');
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro xeolocalizando elemento, probe de novo',
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
                            onPress={() => { }}>
                            <CardElement element={element} showOnMap={showOnMap} />
                        </TouchableOpacity>
                    )
                })

        )
    }

    const itemsDropDown = [
        { label: 'Ordear por valoración', value: 'all_valoracion' },
        { label: 'Ordear por título', value: 'all_titulo' },
        { label: 'Hoteis por valoración', value: 'hoteis_valoracion' },
        { label: 'Hoteis por título', value: 'hoteis_titulo' },
        { label: 'Hostais por valoración', value: 'hostais_valoracion' },
        { label: 'Hostais por título', value: 'hostais_titulo' },
        { label: 'Aloxamentos por valoración', value: 'aloxamento_valoracion' },
        { label: 'Aloxamentos por título', value: 'aloxamento_titulo' },
        { label: 'Caravanas por valoración', value: 'caravanas_valoracion' },
        { label: 'Caravanas por título', value: 'caravanas_titulo' },
        { label: 'Vivendas por valoración', value: 'vivendas_valoracion' },
        { label: 'Vivendas por título', value: 'vivendas_titulo' },
        { label: 'Camping por valoración', value: 'camping_valoracion' },
        { label: 'Camping por título', value: 'camping_titulo' },
        { label: 'Moteis por valoración', value: 'moteis_valoracion' },
        { label: 'Moteis por título', value: 'moteis_titulo' }
    ];

    const onChangeDropDown = async (item) => {
        try {
            setState({
                loading: true,
                data: []
            });

            var elements = await filterSort(item.value);

            if (elements.status != 200 || elements.auth == false) {
                setState({
                    loading: false,
                    data: undefined
                });
                if (!await shouldDeleteToken(elements.message, 'id_token')) {
                    showMessage({
                        message: elements.message,
                        type: "danger"
                    });
                    return;
                }
            } else {
                setState({
                    loading: false,
                    data: elements
                });
                setDropDownValue(item.value);
            }

        } catch (err) {
            console.error(err);
            showMessage({
                message: "Erro na ordeación",
                type: "danger"
            });
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
                        doSearch={() => { }}
                        updateItems={() => { }}
                        onChange={true}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <DropDown items={itemsDropDown} onChange={onChangeDropDown} style={dropDownStyles} container={{ flex: 1 }} defaultValue={dropDownValue} />
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

const dropDownStyles = StyleSheet.create({
    style: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000"
    },
    scroll: {
        backgroundColor: "#fff",
        height: 110
    },
    text: {
        fontSize: 15,
        color: "#000"
    }
});

export default Hospedaxe;