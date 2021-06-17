/**
 * @fileoverview Pantalla de listaxe de elementos de lecer
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
import ProgressBar from '../../../components/ProgressBar';
import CardElement from '../../../components/CardElementLecer';
import CustomSearchBar from '../../../components/CustomSearchBar';
import NoData from '../../../components/NoData';
import DropDown from '../../../components/CustomDropDown';
import { PlusIconButton } from '../../../components/CustomIcons';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

// propiedades
import properties from '../../../properties/properties_expo'

// Util
import { getToken, shouldDeleteToken } from '../../../Util/TokenUtil'

// estilos
import { stylesTurismoList as styles } from '../../../styles/styles'

/**
 * Compoñente que conforma a listaxe de elementos de lecer
 * @param {Object} props 
 * @returns {Component}
 */
const CommonLecerList = (props) => {

    const [state, setState] = useState({                                        // Estado que reúne a información e indica cando se están cargando datos
        loading: true,
        data: []
    });

    const [modal, setModal] = useState(false);                                  // Estado que controla a visualización dun modal

    const [dropDownValue, setDropDownValue] = useState("all_valoracion");       // Estado que reúne a selección actual do dropdown

    const [refreshing, setRefreshing] = useState(false);                        // Estado que indica se se está a refrescar a pantalla

    const data = props.route.params.data;                                       // Array de datos a amosar dende a pantalla de usuario, isto é, os favoritos do usuario
    const model = props.route.params.model;                                     // Función do modelo
    const titulo = props.route.params.titulo;                                   // Título da pantalla

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal(!modal);
    }

    /**
     * Obtén información da listaxe
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns 
     */
    const onGetData = async (mounted, signal) => {
        const token = await getToken('id_token');                               // Obtén o token de usuario
        var data = await model.getAll(signal, token);
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
     * Execútase o contido da función cando se constrúe o compoñente
     */
    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({                                       // Fíxanse opcións de navegación
                title: titulo
            })
        }

        return () => mounted = false;
    }, []);

    /**
     * Execútase o contido da función cando se constrúe o compoñente
     */
    useEffect(() => {
        let mounted = true;

        const abortController = new AbortController();                          // Control de chamada web
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
     * Refresca a pantalla actual
     */
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await onGetData(true);
            setRefreshing(false);
            setDropDownValue("all_valoracion");
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
            const text = await model.getGeoElement(id, tipo);
            if (text == undefined) {
                showMessage({
                    message: 'Erro xeolocalizando elemento, probe de novo',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return;
            }
            const update = props.route.params.updateItem;                               // Función para xeolocalizar o elemento no mapa
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
     * Busca un elemento por nome
     * @param {String} name 
     */
    const doSearch = async (name) => {
        try {
            var element;
            const token = await getToken('id_token');                                   // Obtense o token do usuario
            if (!data) {                                                                // Se existen datos favoritos, búscase entre estes, senón, entre todos os datos
                element = await model.getByName(token, name);
            } else {
                element = await model.getFavByName(token, name);
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
     * Listaxe en si mesma dos elementos
     * @param {Object} props 
     * @returns {Component}
     */
    const ListData = (props) => {

        const data = props.data;                                // Array de datos a listar
        const navigate = props.navigate;                        // Instancia para empregar a navegación

        return (
            data == undefined ?
                <NoData /> :
                data.map(element => {
                    return (
                        <TouchableOpacity
                            key={element.id}
                            onPress={() => {
                                navigate('CommonLecerItem', {
                                    lecer: element
                                })
                            }}>
                            <CardElement element={element} showOnMap={showOnMap} addFav={model.addFav} quitFav={model.quitFav} />
                        </TouchableOpacity>
                    )
                })
        )
    }

    const itemsDropDown = props.route.params.itemsDropDown;     // Elementos do dropdown

    /**
     * Execútase cando cambia a selección do usuario
     * @param {Object} item 
     * @returns 
     */
    const onChangeDropDown = async (item) => {
        try {
            setState({
                loading: true,
                data: []
            });

            const token = await getToken('id_token');
            var elements;
            if (!data) {
                elements = await model.filterSort(item.value, token);
            } else {
                elements = await model.favFilterSort(item.value, token);
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
     * Execútase cando se pulsa o botón +
     */
    const onPressPlus = () => {
        showModal();
    }

    /**
     * Execútase cando se confirma a operación de engadir un novo elemento polo usuario
     */
    const onConfirmAdd = () => {
        Linking.openURL(properties.openstreetmap.edit);
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
                            state.data.lecer != undefined ?
                                state.data.status != 200 ?
                                    <NoData /> :
                                    state.data.lecer.length == 0 ?
                                        <NoData /> :
                                        <ListData data={state.data.lecer} navigate={props.navigation.navigate} />
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

export default CommonLecerList;