/**
 * @fileoverview Pantalla de listaxe de elementos de hospedaxe
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
import * as Linking from 'expo-linking';

// compoñentes
import ProgressBar from '../../components/ProgressBar';
import CardElement from '../../components/CardElementLecer';
import CustomSearchBar from '../../components/CustomSearchBar';
import NoData from '../../components/NoData';
import DropDown from '../../components/CustomDropDown';
import { PlusIconButton } from '../../components/CustomIcons';
import ModalConfirmacion from '../../components/ModalConfirmacion';

// propiedades
import properties from '../../properties/properties_expo'

// modelo
import { getAll, getGeoElement, filterSort, addFav, quitFav, getByName, getFavByName, favFilterSort } from '../../model/Hospedaxe/Hospedaxe'

// Util
import { getToken, shouldDeleteToken } from '../../Util/TokenUtil'

// estilos
import { stylesTurismoList as styles } from '../../styles/styles'

/**
 * Compoñente que conforma a listaxe de elementos de hospedaxe
 * @param {Object} props 
 * @returns {Component}
 */
const Hospedaxe = (props) => {

    const [state, setState] = useState({                                    // Estado que reúne os elementos a amosar e controla se a pantalla está cargando información
        loading: true,
        data: []
    });
    const [modal, setModal] = useState(false);                              // Estado que controla a visualización dun modal
    const [dropDownValue, setDropDownValue] = useState("all_valoracion");   // Estado que garda o valor actual do dropdown

    const [refreshing, setRefreshing] = useState(false);                    // Estado que indica cando se está a refrescar a pantalla

    const data = props.route.params.data;                                   // Array que reúne os datos a amosar, neste caso os favoritos do usuario

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal(!modal);
    }

    /**
     * Obtén datos a amosar e os garda no estado
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns 
     */
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
     * Cando se monta o compoñente, execútase o contido da función
     */
    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            data ?
                props.navigation.setOptions({                               // Establécense opcións de navegación na pantalla actual
                    title: "Lugares de hospedaxe favoritos"
                })
                :
                props.navigation.setOptions({
                    title: "Lugares de hospedaxe"
                })
        }

        return () => mounted = false;
    }, []);

    /**
     * Cando se monta o compoñente, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        const abortController = new AbortController();                      // Controla unha chamada web, evitando perdas de memoria
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

    /**
     * Refresca a pantalla
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
     * Xeolocaliza un elemento no mapa
     * @param {Number} id 
     * @param {String} tipo 
     * @param {String} subtipo 
     * @returns
     */
    const showOnMap = async (id, tipo, subtipo) => {
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
            const update = props.route.params.updateItem;                   // Función que permite xeolocalizar un elemento no mapa
            update(text, subtipo);
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
     * Realiza unha busca dun elemento por nome
     * @param {String} name 
     */
    const doSearch = async (name) => {
        try {
            var element;
            const token = await getToken('id_token');                       // Obtención do token de usuario
            if (!data) {                                                    // En función de se existen datos favoritos ou non, búscase de entre todos os elementos ou so aqueles favoritos do usuario
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
     * Compoñente que conforma a listaxe dos elementos en si mesma
     * @param {Object} props 
     * @returns {Component}
     */
    const ListData = (props) => {

        const data = props.data;                                            // Array de elementos a listar
        const navigate = props.navigate;                                    // Instancia para empregar a navegación

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

    const itemsDropDown = [                                                 // Elementos do dropdown
        { label: 'Ordear por valoración', value: 'all_valoracion' },
        { label: 'Ordear por título', value: 'all_titulo' },
        { label: 'Aloxamentos por valoración', value: 'aloxamento_valoracion' },
        { label: 'Aloxamentos por título', value: 'aloxamento_titulo' },
        { label: 'Camping por valoración', value: 'camping_valoracion' },
        { label: 'Camping por título', value: 'camping_titulo' },
        { label: 'Caravanas por valoración', value: 'caravanas_valoracion' },
        { label: 'Caravanas por título', value: 'caravanas_titulo' },
        { label: 'Hostais por valoración', value: 'hostais_valoracion' },
        { label: 'Hostais por título', value: 'hostais_titulo' },
        { label: 'Hoteis por valoración', value: 'hoteis_valoracion' },
        { label: 'Hoteis por título', value: 'hoteis_titulo' },
        { label: 'Moteis por valoración', value: 'moteis_valoracion' },
        { label: 'Moteis por título', value: 'moteis_titulo' },
        { label: 'Vivendas por valoración', value: 'vivendas_valoracion' },
        { label: 'Vivendas por título', value: 'vivendas_titulo' }
    ];

    /**
     * Execútase cada vez que cambia o elemento seleccionado no dropdown
     * @param {Object} item 
     * @returns 
     */
    const onChangeDropDown = async (item) => {
        try {
            setState({
                loading: true,
                data: []
            });

            const token = await getToken('id_token');                       // Obtense o token de usuario
            var elements;
            if (!data) {                                                    // Fíltranse e ordénanse os elementos en función da opción seleccionada
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

    /**
     * Execútase cando se presiona o botón co símbolo +
     */
    const onPressPlus = () => {
        showModal();
    }

    /**
     * Execútase cando o usuario decide confirmar a operación de engadir un novo elemento no modal
     */
    const onConfirmAdd = () => {
        Linking.openURL(properties.openstreetmap.edit);                     // Redirixe ao usuario
    }

    return (

        state.loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View>
            :
            <>
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
                    <View style={{ padding: 20, flexDirection: "row" }}>
                        <PlusIconButton style={{ flex: 1 }} _onPress={onPressPlus} />
                        <DropDown items={itemsDropDown} onChange={onChangeDropDown} style={[dropDownStyles, { flex: 1 }]} container={{ flex: 1 }} defaultValue={dropDownValue} />
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
                <ModalConfirmacion showModal={showModal} modal={modal} confirm={onConfirmAdd} text={"Para engadir un novo elemento, será redirixido á páxina de OpenStreetMap. Siga as instrucións da páxina para facelo."} />
            </>
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