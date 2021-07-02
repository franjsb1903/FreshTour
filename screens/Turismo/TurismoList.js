/**
 * @fileoverview Listaxe de elementos turísticos
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, Component } from 'react'
import { View, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native'
import { showMessage } from "react-native-flash-message";
import { Divider } from 'react-native-elements';

// compoñentes
import ProgressBar from '../../components/ProgressBar';
import CardElement from '../../components/CardElementTurismo';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';
import DropDown from '../../components/CustomDropDown';

// modelo
import { getData, getElement, getGeoElement, getGeoElementJson, sortBy, favsSortBy } from '../../model/Turismo/Turismo';
import { getElementFavByName } from '../../model/Turismo/Turismo';

// Util
import { getToken, shouldDeleteToken } from '../../Util/TokenUtil'

// estilos
import { stylesTurismoList as styles } from '../../styles/styles'

/**
 * Compoñente que conforma a listaxe de elementos turísticos
 * @param {Object} props 
 * @returns {Component}
 */
const Turism = (props) => {

    const [state, setState] = useState({                                // Estado que almacena a información a amosar e controla cando a pantalla está cargando información
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);                // Estado que indica cando a pantalla se está a refrescar
    const [dropDownValue, setDropDownValue] = useState("valoracion");   // Estado que almacena a elección actual do DropDown

    const data = props.route.params.data;                               // Datos a amosar, cando se accede dende a pantalla de usuario como elementos favoritos
    let elemento = props.route.params.elemento;                         // Elemento concreto a amosar

    /**
     * Execútase cando se monta o compoñente, establecendo opcións de navegación
     */
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

    /**
     * Obtén a información da listaxe
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns 
     */
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

    /**
     * Execútase cando se monta o compoñente, obtendo a información da listaxe
     */
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
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
            }
        }

        if (elemento) {
            props.navigation.navigate('TurismoItem', {
                element: elemento,
                showOnMap: showOnMap,
                onRefresh: onRefresh
            })
            elemento = undefined;
            if (mounted)
                reload();
        } else if (!data) {
            if (mounted)
                reload();
        } else {
            setState({
                data: data,
                loading: false
            });
        }

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, []);

    /**
     * Refresca a información da listaxe
     */
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

    /**
     * Busca un elemento por nome
     * @param {String} name 
     */
    const doSearch = async (name) => {
        try {
            var element;
            const token = await getToken('id_token');
            if (!data) {
                element = await getElement(name, token);
            } else {
                element = await getElementFavByName(token, name);
            }
            setDropDownValue('valoracion');
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

    /**
     * Xeolocaliza un elemento no mapa
     * @param {Number} id 
     * @param {String} tipo 
     * @returns 
     */
    const showOnMap = async (id, tipo) => {
        try {
            const text = await getGeoElement(id, tipo);
            if (text == undefined) {
                showMessage({
                    message: 'Erro xeolocalizando elemento, probe de novo',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return;
            }
            const update = props.route.params.updateItem;
            update(text);
            props.navigation.navigate('Map');
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro xeolocalizando elemento, probe de novo',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Constrúe a listaxe en si mesma
     * @param {Object} props 
     * @returns {Component}
     */
    const ListData = (props) => {

        const data = props.data;                    // Información a listar
        const navigate = props.navigate;            // Instancia para empregar a navegación

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
                            <CardElement item={element} showOnMap={showOnMap} getGeoElementJson={getGeoElementJson} Separator={<Divider />} />
                        </TouchableOpacity>
                    )
                })

        )
    }

    const itemsDropDown = [                         // Items do DropDown
        { label: 'Ordenar por valoración', value: 'valoracion' },
        { label: 'Ordenar por título', value: 'titulo' }
    ];

    /**
     * Execútase cando cambia a selección do DropDown do usuario, reordenando os elementos
     * @param {String} item 
     * @returns 
     */
    const onChangeDropDown = async (item) => {
        try {
            setState({
                loading: true,
                data: []
            });
            const token = await getToken('id_token');
            var elements
            if (!data) {
                elements = await sortBy(item.value, token);
            } else {
                elements = await favsSortBy(item.value, token);
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

    return (

        state.loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView style={styles.scroll} refreshControl={
                !data ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> :
                    <></>
            }>
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
                        state.data.turismo != undefined ?
                            state.data.status != 200 ?
                                <NoData /> :
                                state.data.turismo.length == 0 ?
                                    <NoData /> :
                                    <ListData data={state.data.turismo} navigate={props.navigation.navigate} />

                            :
                            state.data.length == 0 ?
                                <NoData /> :
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

export default Turism;