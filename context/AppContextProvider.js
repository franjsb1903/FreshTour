/**
 * @fileoverview Proveedor do contexto da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do contexto
*/

// PLANIFICADOR TEMPORAL

// módulos
import React, { useState, useEffect, Component } from 'react';
import { showMessage } from "react-native-flash-message";

// contexto
import AppContext from './AppContext';

// modelo
import { getGeoElementJson } from '../model/Turismo/Turismo';
import { getGeoElementJson as getGeoElementJsonHospedaxe } from '../model/Hospedaxe/Hospedaxe'
import { getGeoElementJsonHostalaria, getGeoElementJsonOcio, getGeoElementJsonOutras } from '../model/Lecer/Lecer'
import { getRoute } from '../model/Planificador/Planificador';
import { addElementoFav as addElementoFavModel, deleteElementoFav as deleteElementoFavModel } from '../model/Turismo/Turismo';
import { getData as getCalidadeAireData } from '../model/CalidadeAire/CalidadeAire';

// Util
import { shouldDeleteToken } from '../Util/TokenUtil'

/**
 * Proveedor do contexto na aplicación
 * @param {Object} props 
 * @returns {Component}
 */
const AppContextProvider = (props) => {

    const [turismoItems, setTurismoItems] = useState({                          // Estado que reúne os elementos turísticos da planificación
        items: []
    });
    const [coordinates, setCoordinates] = useState([]);                         // Coordenadas dos elementos turísticos da planificación
    const [route, setRoute] = useState({                                        // Ruta asociada á planificación, en formato JSON e formato texto
        route: '',
        routeJson: {}
    });

    const [planificacion, setPlanificacion] = useState(undefined);              // Planificación actual almacenada no planificador

    const [walking, setWalking] = useState(true);                               // Estado que indica se está seleccionada a ruta a pé ou en bicicleta
    const [geoMap, setGeoMap] = useState('');                                   // Estado que permite almacenar datos a xeolocalizar no mapa

    const [tempoVisita, setTempoVisita] = useState(parseFloat(0));              // Estado que indica o tempo de visita total na planificación

    const [calidadeAire, setCalidadeAire] = useState([]);                       // Calidade do aire na planificación

    /**
     * Cando cambia o array que items, execútase o contido da función. Neste caso, obtéñense as súas coordenadas
     */
    useEffect(() => {
        let mounted = true;
        var arrayCoordinates = [];
        turismoItems.items.map(e => {
            const coord = [parseFloat(`${e.features[0].geometry.coordinates[0]}`), parseFloat(`${e.features[0].geometry.coordinates[1]}`)]
            arrayCoordinates.push(coord);
        });
        if (mounted) {
            setCoordinates(arrayCoordinates);
        }

        return () => mounted = false;
    }, [turismoItems.items]);

    /**
     * Cando cambia o array de coordenadas, execútase o contido da función. Neste caso, obtense a ruta
     */
    useEffect(() => {

        let mounted = true;

        async function getAsyncRoute() {
            try {
                if (coordinates.length > 1) {
                    const route = await getRoute(coordinates, walking);
                    if (route != undefined) {
                        if (mounted) {
                            setRoute({
                                route: route,
                                routeJson: JSON.parse(route)
                            });
                        }
                    }
                } else {
                    if (mounted) {
                        setRoute({
                            route: '',
                            routeJson: {}
                        });
                    }
                }
            } catch (err) {
                console.error(err);
                showMessage({
                    message: 'Erro na obtención da ruta',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
            }
        }

        getAsyncRoute();

        return () => {
            mounted = false;
        }
    }, [coordinates]);

    /**
     * Cando cambia o perfil de ruta, execútase o contido da función, obtendo de novo a ruta
     */
    useEffect(() => {
        let mounted = true;

        async function getAsyncRoute() {
            try {
                if (coordinates.length > 1) {
                    const route = await getRoute(coordinates, walking);
                    if (route != undefined) {
                        if (mounted) {
                            setRoute({
                                route: route,
                                routeJson: JSON.parse(route)
                            });
                        }
                    }
                } else {
                    if (mounted) {
                        setRoute({
                            route: '',
                            routeJson: {}
                        });
                    }
                }
            } catch (err) {
                showMessage({
                    message: 'Erro na obtención da ruta',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                console.error(err);
            }
        }

        getAsyncRoute();

        return () => {
            mounted = false;
        }
    }, [walking]);

    /**
     * Formatea unha determinada data
     * @param {Date} date 
     * @returns {String}
     */
    const formatDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        const dataString = hours - 2 + ":" + minutes
        return dataString;
    }

    /**
     * Obtén a calidade do aire
     * @param {Boolean} mounted 
     */
    const onGetDataCalidadeAire = async (mounted) => {
        try {
            const first = turismoItems.items[0];
            let actual = new Date();
            actual.setHours(actual.getHours() + 2);                                                     // Necesario para obter os datos no horario actual
            let calidadeArray = [];
            const calidade = await getCalidadeAireData(first.features[0].geometry.coordinates[1], first.features[0].geometry.coordinates[0], actual.toISOString());
            const calidadeObject = {
                text: calidade,
                date: "actual (inicio da ruta)"
            }
            calidadeArray.push(calidadeObject);

            if (route.routeJson != undefined) {
                var seconds = 0;
                for (var i = 0; i < route.routeJson.features[0].properties.segments.length; i++) {      // A partir dos segmentos da ruta, contrúese a calidade do aire en rangos de 60 minutos, tendo en conta os tempos de visita
                    const segment = route.routeJson.features[0].properties.segments[i];
                    const itemFirst = turismoItems.items[i];
                    const itemSecond = turismoItems.items[i + 1];
                    seconds += itemFirst.features[0].properties.tipo_visita ? parseFloat(itemFirst.features[0].properties.tipo_visita) * 60 : parseFloat(itemFirst.features[0].properties.tempo_visita_rapida) * 60;
                    if (seconds >= 3600) {                                                              // Para cada segmento, compróbase se se superan os 60 minutos a partir do tempo de visita ao primeiro elemento. Nese caso, obtense a calidade do aire nas coordenadas actuais do segmento
                        const coord = itemFirst.features[0].geometry.coordinates;
                        actual.setHours(actual.getHours() + 1);
                        const calidade = await getCalidadeAireData(coord[1], coord[0], actual.toISOString());
                        const dataString = formatDate(actual) + " en " + itemFirst.features[0].properties.titulo;
                        const calidadeObject = {
                            text: calidade,
                            date: dataString
                        }
                        calidadeArray.push(calidadeObject);
                        seconds = seconds - 3600;

                    }
                    for (var j = 0; j < segment.steps.length; j++) {                                    // Para cada segmento, recórrense os seus pasos ata completar os 60 minutos, se é que se completan
                        const step = segment.steps[j];
                        seconds += parseFloat(step.duration);
                        if (seconds >= 3600) {
                            const coord = route.routeJson.features[0].geometry.coordinates[step.way_points[0]];
                            actual.setHours(actual.getHours() + 1);
                            const calidade = await getCalidadeAireData(coord[1], coord[0], actual.toISOString());
                            const dataString = formatDate(actual) + " en ruta de " + itemFirst.features[0].properties.titulo + " a " + itemSecond.features[0].properties.titulo;
                            const calidadeObject = {
                                text: calidade,
                                date: dataString
                            }
                            calidadeArray.push(calidadeObject);
                            seconds = seconds - 3600;
                        }
                    }
                    seconds += itemSecond.features[0].properties.tipo_visita ? parseFloat(itemSecond.features[0].properties.tipo_visita) * 60 : parseFloat(itemSecond.features[0].properties.tempo_visita_rapida) * 60;
                    if (seconds >= 3600) {                                                              // Compróbase se se superan os 60 minutos tendo en conta os tempos de visita do segundo elemento
                        const coord = itemSecond.features[0].geometry.coordinates;
                        actual.setHours(actual.getHours() + 1);
                        const calidade = await getCalidadeAireData(coord[1], coord[0], actual.toISOString());
                        const dataString = formatDate(actual) + " en " + itemSecond.features[0].properties.titulo;
                        const calidadeObject = {
                            text: calidade,
                            date: dataString
                        }
                        calidadeArray.push(calidadeObject);
                        seconds = seconds - 3600;
                    }
                }
            }
            if (mounted) {
                setCalidadeAire(calidadeArray);
            }

        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Non se puido obter a información da calidade do aire',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Cando cambia a ruta, execútase o contido da función obtendo a calidade do aire
     */
    useEffect(() => {
        let mounted = true;

        const getData = async () => {
            await onGetDataCalidadeAire(mounted);
        }

        if (turismoItems.items.length > 1) {
            getData();
        }

        return () => {
            mounted = false;
        }
    }, [route.routeJson]);

    /**
     * Engade un elemento á planificación
     * @param {Object} item 
     */
    const addItem = (item) => {

        var exist = existItem(`${item.features[0].properties.id}`, item.features[0].properties.tipo);

        if (!exist) {
            setTurismoItems({
                items: [...turismoItems.items, item]
            });
            const tempo = tempoVisita;
            if (item.features[0].properties.tipo != "Hospedaxe" && item.features[0].properties.tipo != "Hostalaría" && item.features[0].properties.tipo != "Ocio" && item.features[0].properties.tipo != "Outra") {
                initTempoVisita(tempo + item.features[0].properties.tempo_visita_rapida);
            }
            setPlanificacion(undefined);
        }
    };

    /**
     * Determina se un elemento xa foi engadido á planificación
     * @param {Number} id 
     * @param {String} tipo 
     * @returns 
     */
    const existItem = (id, tipo) => {
        var exist = false;
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id && e.features[0].properties.tipo == tipo) {
                exist = true;
                break;
            }
        }

        return exist;
    }

    /**
     * Actualiza o tempo de visita da planificación
     * @param {Number} novoTempo 
     * @param {Number} antigoTempo 
     */
    const actualizaTempoVisita = (novoTempo, antigoTempo) => {
        setTempoVisita(tempoVisita - antigoTempo + novoTempo);
    }

    /**
     * Reinicializa o tempo de visita da planificación
     * @param {Number} tempo 
     */
    const initTempoVisita = (tempo) => {
        setTempoVisita(tempo);
    }

    /**
     * Actualiza os elementos da planificación
     * @param {Array} newItems 
     */
    const updateItems = (newItems) => {
        setTurismoItems({
            items: newItems
        });
        setTempoVisita(0);
        setPlanificacion(undefined);
    }

    /**
     * Cambia o perfil da planificación
     */
    const changeProfile = () => {
        setWalking(!walking);
    }

    /**
     * Resetea a planificación almacenada
     */
    const resetPlanificacion = () => {
        setPlanificacion(undefined);
    }

    /**
     * Actualiza a planificación almacenada
     * @param {Object} planificacion 
     */
    const updatePlanificacion = (planificacion) => {
        setPlanificacion(planificacion);
    }

    /**
     * Cambia a orde hacia arriba dun elemento da planificación
     * @param {Number} id 
     * @param {String} tipo 
     */
    const changeOrderUp = (id, tipo) => {
        var index;
        var aux = [];
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id && e.features[0].properties.tipo == tipo) {
                index = i;
            }
            aux.push(e);
        }
        var elementDown = aux[index];
        var elementUp = aux[index - 1];
        aux[index] = elementUp;
        aux[index - 1] = elementDown;
        setTurismoItems({
            items: aux
        });
        setPlanificacion(undefined);
    }

    /**
     * Cambia a orde hacia abaixo dun elemento da planificación
     * @param {Number} id 
     * @param {String} tipo 
     */
    const changeOrderDown = (id, tipo) => {
        var index;
        var aux = [];
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id && e.features[0].properties.tipo == tipo) {
                index = i;
            }
            aux.push(e);
        }
        var elementUp = aux[index];
        var elementDown = aux[index + 1];
        aux[index] = elementDown;
        aux[index + 1] = elementUp;
        setTurismoItems({
            items: aux
        });
        setPlanificacion(undefined);
    }

    /**
     * Engade un elemento á planificación
     * @param {Number} id 
     * @param {Boolean} added 
     * @param {String} tipo 
     * @returns {Boolean}
     */
    const addToPlanificacion = async (id, added, tipo) => {
        try {
            if (!added) {
                showMessage({
                    message: 'Cargando...',
                    type: "info",
                    position: "bottom",
                    icon: "info"
                });
                let data = await getDataJson(id, tipo);

                if (data == undefined || data.features[0] == undefined) {
                    showMessage({
                        message: 'Elemento non engadido',
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                    return;
                }
                addItem(data);
                showMessage({
                    message: 'Elemento engadido á planificación',
                    type: "success",
                    position: "bottom",
                    icon: "success"
                });
                return true;
            } else {
                showMessage({
                    message: 'Elemento xa engadido á planificación',
                    type: "warning",
                    position: "bottom",
                    icon: "warning"
                });
                return false;
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro de conexión',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
            return false;
        }
    }

    /**
     * Obtén información xeográfica dun determinado elemento en formato JSON
     * @param {Number} id 
     * @param {String} tipo 
     * @returns {Object}
     */
    const getDataJson = async (id, tipo) => {
        let data;
        switch (tipo) {
            case "Hospedaxe":
                data = await getGeoElementJsonHospedaxe(id);
                break;
            case "Hostalaría":
                data = await getGeoElementJsonHostalaria(id);
                break;
            case "Ocio":
                data = await getGeoElementJsonOcio(id);
                break;
            case "Outra":
                data = await getGeoElementJsonOutras(id);
                break;
            default:
                data = await getGeoElementJson(id, tipo);
                break;
        }

        return data;
    }

    /**
     * Engade una serie de elementos á planificación dunha vez
     * @param {Array} elements 
     * @param {Object} planificacion 
     * @param {Object} navigation 
     */
    const addElementsToPlanificacion = async (elements, planificacion, navigation) => {
        try {
            showMessage({
                message: 'Cargando...',
                type: "info",
                position: "bottom",
                icon: "info"
            });
            const newElements = [];
            setTempoVisita(0);
            var tempo_visita = 0;
            await Promise.all(elements.map(async (element) => {
                const data = await getDataJson(element.id, element.tipo);
                data.features[0].properties["tipo_visita"] = element.tipo_visita;
                newElements[element.posicion_visita] = data;
                if (data.features[0].properties.tipo != "Hospedaxe" && data.features[0].properties.tipo != "Hostalaría" && data.features[0].properties.tipo != "Ocio" && data.features[0].properties.tipo != "Outra") {
                    if (element.tipo_visita != null) {
                        tempo_visita += element.tipo_visita;
                    } else {
                        tempo_visita += data.features[0].properties.tempo_visita_rapida;
                    }
                } else {
                    if (element.tipo_visita != null) {
                        tempo_visita += element.tipo_visita;
                    }
                }
            }));
            setTurismoItems({
                items: newElements
            });
            initTempoVisita(parseFloat(tempo_visita));
            setPlanificacion(planificacion);
            navigation.navigate('Map');
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
     * Cambia o tipo de visita dun determinado elemento da planificación
     * @param {Number} id 
     * @param {Number} tipoVisita 
     * @param {String} tipo 
     */
    const changeTipoVisita = async (id, tipoVisita, tipo) => {
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id && e.features[0].properties.tipo == tipo) {
                e.features[0].properties["tipo_visita"] = tipoVisita;
                break;
            }
        }
        if (turismoItems.items.length > 1)
            await onGetDataCalidadeAire(true);
        setPlanificacion(undefined);
    }

    /**
     * Actualiza información xeográfica a amosar no mapa
     * @param {String} text 
     */
    const updateGeoMap = (text) => {
        setGeoMap(text);
    }

    // USUARIOS

    const [user, setUser] = useState({                  // Estado que almacena a información dun usuario
        user: {},
        isLoggedIn: false,
        planificacions: [],
        planificacionsFav: [],
        opinions: [],
        elementosFav: [],
        hospedaxesFav: [],
        hostalariaFav: [],
        ocioFav: [],
        outrasFav: []
    });

    /**
     * Engade un elemento como favorito
     * @param {String} token 
     * @param {Function} changeFavView 
     * @param {Object} item 
     * @param {Function} model 
     * @param {Function} changeModal 
     * @returns 
     */
    const addElementoFav = async (token, changeFavView, item, model, changeModal) => {
        try {
            let response;
            if (!model) {
                response = await addElementoFavModel(token, item.id, item.tipo);
            } else {
                response = await model(token, item.id);
            }
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                } else {
                    changeModal();
                }
                return;
            }
            item.favorito = true;
            changeFavView();
            showMessage({
                message: 'Pode ver os seu elementos favoritos no seu perfil',
                type: "info",
                position: "bottom",
                icon: "info"
            });
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro marcando o elemento como favorito',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Quita un elemento como favorito
     * @param {String} token 
     * @param {Function} changeFavView 
     * @param {Object} item 
     * @param {Function} model 
     * @returns 
     */
    const deleteElementoFav = async (token, changeFavView, item, model) => {
        try {
            let response;
            if (!model) {
                response = await deleteElementoFavModel(token, item.id, item.tipo);
            } else {
                response = await model(token, item.id);
            }
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                }
                return;
            }
            item.favorito = false;
            changeFavView();
            showMessage({
                message: 'Pode ver os seus elementos favoritos no seu perfil',
                type: "info",
                position: "bottom",
                icon: "info"
            });
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro quitando elemento como favorito',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Almacena un novo usuario
     * @param {Object} data 
     */
    const setNewUser = (data) => {
        if (data != undefined) {
            setUser({
                user: data.user,
                isLoggedIn: true,
                planificacions: data.planificacions,
                planificacionsFav: data.planificacionsFav,
                opinions: data.opinions,
                elementosFav: data.elementosFav,
                hospedaxesFav: data.hospedaxesFav,
                hostalariaFav: data.hostalariaFav,
                ocioFav: data.ocioFav,
                outrasFav: data.outrasFav
            })
        }
    }

    /**
     * Reinicia un usuario almacenado
     */
    const resetUser = () => {
        setUser({
            user: {},
            isLoggedIn: false,
            planificacions: [],
            planificacionsFav: [],
            opinions: [],
            elementosFav: [],
            hospedaxesFav: [],
            hostalariaFav: [],
            ocioFav: [],
            outrasFav: []
        })
    }

    const settings = {                                      // Settings do contexto, exportando todas aquelas funcionalidades que sexan necesario empregalas noutros lugares
        addItem: addItem,
        route: route,
        existItem: existItem,
        coordinates: coordinates,
        turismoItems: turismoItems.items,
        calidadeAire: calidadeAire,
        actualizaTempoVisita: actualizaTempoVisita,
        tempoVisita: tempoVisita,
        updateItems: updateItems,
        changeProfile: changeProfile,
        walking: walking,
        changeOrderUp: changeOrderUp,
        changeOrderDown: changeOrderDown,
        addToPlanificacion: addToPlanificacion,
        user: user,
        addElementoFav: addElementoFav,
        setUser: setNewUser,
        resetUser: resetUser,
        deleteElementoFav: deleteElementoFav,
        updateGeoMap: updateGeoMap,
        geoMap: geoMap,
        addElementsToPlanificacion: addElementsToPlanificacion,
        planificacion: planificacion,
        resetPlanificacion: resetPlanificacion,
        updatePlanificacion: updatePlanificacion,
        changeTipoVisita: changeTipoVisita,
        refreshCalidadeAire: onGetDataCalidadeAire
    }

    return (
        <AppContext.Provider value={settings}>
            {
                props.children
            }
        </AppContext.Provider>
    )
}

export default AppContextProvider;