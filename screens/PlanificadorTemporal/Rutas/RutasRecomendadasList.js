import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import { showMessage } from "react-native-flash-message";

import ProgressBar from '../../../components/ProgressBar';
import { getPlanificacions as getPlanificacionsModel, sortBy, favSortBy } from '../../../model/Planificador/Planificador'
import CardElement from '../../../components/CardElementRuta';
import NoData from '../../../components/NoData';
import DropDown from '../../../components/CustomDropDown';
import { getByName } from '../../../model/Planificador/Planificador';
import CustomSearchBar from '../../../components/CustomSearchBar';

import { useIsFocused } from '@react-navigation/native';

import { stylesTurismoList as styles, stylesScroll, dropDownBorderStyles as dropdownStyles } from '../../../styles/styles';

import { getToken, shouldDeleteToken } from '../../../Util/TokenUtil'

const RutasRecomendadasList = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("valoracion");

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
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
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
                showMessage({
                    message: 'Erro de conexión',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
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
                type: "danger",
                position: "bottom",
                icon: "danger"
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

    const itemsDropDown = [
        { label: 'Ordear por valoración', value: 'valoracion' },
        { label: 'Menor distancia primeiro', value: 'menor_distancia' },
        { label: 'Maior distancia primeiro', value: 'maior_distancia' },
        { label: 'Menor tempo visita primeiro', value: 'menor_tempo_visita' },
        { label: 'Maior tempo visita primeiro', value: 'maior_distancia' },
        { label: 'Menor tempo ruta primeiro', value: 'menor_tempo_ruta' },
        { label: 'Maior tempo ruta primeiro', value: 'maior_tempo_ruta' },
        { label: 'Menor tempo total primeiro', value: 'menor_tempo_total' },
        { label: 'Maior tempo total primeiro', value: 'maior_tempo_total' }
    ];

    const onChangeDropDown = async (item) => {
        try {
            setState({
                loading: true,
                data: []
            });
            const token = await getToken('id_token');
            var elements;
            if (!data) {
                elements = await sortBy(token, item.value);
            } else {
                elements = await favSortBy(token, item.value);
            }
            if (elements.status != 200 || elements.auth == false) {
                setState({
                    loading: false,
                    data: undefined
                });
                if (!await shouldDeleteToken(elements.message, 'id_token')) {
                    showMessage({
                        message: elements.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
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
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    const doSearch = async (name) => {
        try {
            var element;
            const token = await getToken('id_token');
            element = await getByName(token, name);
            if (element.status != 200) {
                await shouldDeleteToken(element.message, 'id_token');
            }
            if (element != undefined) {
                setState({
                    data: element,
                    loading: false
                });
            } else {
                showMessage({
                    message: 'Erro de conexión',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro de conexión',
                type: "danger",
                position: "bottom",
                icon: "danger"
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
                !data ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> :
                    <></>
            }
                style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
                <View style={{ flex: 0 }}>
                    <CustomSearchBar
                        placeholder="Nome ou Elemento turístico"
                        doSearch={doSearch}
                        updateItems={() => { }}
                        onChange={true}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <DropDown items={itemsDropDown} onChange={onChangeDropDown} style={dropdownStyles} container={{ flex: 1 }} defaultValue={dropDownValue} />
                </View>
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