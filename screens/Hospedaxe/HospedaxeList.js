import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native'
import { showMessage } from "react-native-flash-message";
import ProgressBar from '../../components/ProgressBar';
import CardElement from '../../components/CardElementLecer';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';
import DropDown from '../../components/CustomDropDown';

import { getAll, getGeoElement, filterSort, addFav, quitFav, getByName, getFavByName, favFilterSort } from '../../model/Hospedaxe/Hospedaxe'
import { getToken, shouldDeleteToken } from '../../Util/TokenUtil'

import { stylesTurismoList as styles } from '../../styles/styles'

const Hospedaxe = (props) => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [dropDownValue, setDropDownValue] = useState("all_valoracion");

    const [refreshing, setRefreshing] = useState(false);

    const data = props.route.params.data;

    const onGetData = async (mounted, signal) => {
        const token = await getToken('id_token');
        var data = await getAll(signal, token);
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

    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            data ?
                props.navigation.setOptions({
                    title: "Lugares de hospedaxe favoritos"
                })
                :
                props.navigation.setOptions({
                    title: "Lugares de hospedaxe"
                })
        }

        return () => mounted = false;
    }, []);

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

        if (!data) {
            if (mounted)
                reload();
        } else {
            setState({
                loading: false,
                data: data
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

    const doSearch = async (name) => {
        try {
            var element;
            const token = await getToken('id_token');
            if (!data) {
                element = await getByName(token, name);
            } else {
                element = await getFavByName(token, name);
            }
            setDropDownValue('all_valoracion');
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
                    type: "danger"
                });
            }
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
                            onPress={() => {
                                navigate('HospedaxeItem', {
                                    hospedaxe: element
                                })
                            }}>
                            <CardElement element={element} showOnMap={showOnMap} addFav={addFav} quitFav={quitFav} />
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

            const token = await getToken('id_token');
            var elements;
            if (!data) {
                elements = await filterSort(item.value, token);
            } else {
                elements = await favFilterSort(item.value, token);
            }

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
                !data ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : <></>
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
                            state.data.length == 0 ?
                                <NoData />
                                :
                                <View style={{ marginBottom: 15 }}>
                                    <ListData data={data} navigate={props.navigation.navigate} />
                                </View>
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