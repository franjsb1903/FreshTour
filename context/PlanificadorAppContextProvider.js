import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';
import { getGeoElementJson } from '../model/Turismo/Turismo';
import { getGeoElementJson as getGeoElementJsonHospedaxe } from '../model/Hospedaxe/Hospedaxe'
import { getGeoElementJsonHostalaria, getGeoElementJsonOcio, getGeoElementJsonOutras } from '../model/Lecer/Lecer'
import { getRoute } from '../model/Planificador/Planificador';
import { addElementoFav as addElementoFavModel, deleteElementoFav as deleteElementoFavModel } from '../model/Turismo/Turismo';
import { getData as getCalidadeAireData } from '../model/CalidadeAire/CalidadeAire';
import { showMessage } from "react-native-flash-message";
import { shouldDeleteToken } from '../Util/TokenUtil'

const AppContextProvider = (props) => {

    const [turismoItems, setTurismoItems] = useState({
        items: []
    });
    const [coordinates, setCoordinates] = useState([]);
    const [route, setRoute] = useState({
        route: '',
        routeJson: {}
    });

    const [planificacion, setPlanificacion] = useState(undefined);

    const [walking, setWalking] = useState(true);
    const [geoMap, setGeoMap] = useState('');

    const [tempoVisita, setTempoVisita] = useState(parseFloat(0));

    const [calidadeAire, setCalidadeAire] = useState([]);

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

    const formatDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        const dataString = hours - 2 + ":" + minutes
        return dataString;
    }

    const onGetDataCalidadeAire = async (mounted) => {
        try {
            const first = turismoItems.items[0];
            let actual = new Date();
            actual.setHours(actual.getHours() + 2);
            let calidadeArray = [];
            const calidade = await getCalidadeAireData(first.features[0].geometry.coordinates[1], first.features[0].geometry.coordinates[0], actual.toISOString());
            const calidadeObject = {
                text: calidade,
                date: "actual (inicio da ruta)"
            }
            calidadeArray.push(calidadeObject);

            if (route.routeJson != undefined) {
                var seconds = 0;
                for (var i = 0; i < route.routeJson.features[0].properties.segments.length; i++) {
                    const segment = route.routeJson.features[0].properties.segments[i];
                    const itemFirst = turismoItems.items[i];
                    const itemSecond = turismoItems.items[i + 1];
                    seconds += itemFirst.features[0].properties.tipo_visita ? parseFloat(itemFirst.features[0].properties.tipo_visita) * 60 : parseFloat(itemFirst.features[0].properties.tempo_visita_rapida) * 60;
                    if (seconds >= 3600) {
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
                    for (var j = 0; j < segment.steps.length; j++) {
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
                    if (seconds >= 3600) {
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

    const actualizaTempoVisita = (novoTempo, antigoTempo) => {
        setTempoVisita(tempoVisita - antigoTempo + novoTempo);
    }

    const initTempoVisita = (tempo) => {
        setTempoVisita(tempo);
    }

    const updateItems = (newItems) => {
        setTurismoItems({
            items: newItems
        });
        setTempoVisita(0);
        setPlanificacion(undefined);
    }

    const changeProfile = () => {
        setWalking(!walking);
    }

    const resetPlanificacion = () => {
        setPlanificacion(undefined);
    }

    const updatePlanificacion = (planificacion) => {
        setPlanificacion(planificacion);
    }

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

    const updateGeoMap = (text) => {
        setGeoMap(text);
    }

    const [user, setUser] = useState({
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

    const settings = {
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