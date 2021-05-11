import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';
import { getGeoElementJson } from '../model/Turismo/Turismo';
import { getGeoElementJson as getGeoElementJsonHospedaxe } from '../model/Hospedaxe/Hospedaxe'
import { getGeoElementJsonHostalaria } from '../model/Lecer/Lecer'
import { getRoute } from '../model/Planificador/Planificador';
import { addElementoFav as addElementoFavModel, deleteElementoFav as deleteElementoFavModel } from '../model/Turismo/Turismo';
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

    const [tempoVisita, setTempoVisita] = useState(0);

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
                    type: "danger"
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

        const abortController = new AbortController();
        const signal = abortController.signal;

        async function getAsyncRoute() {
            try {
                if (coordinates.length > 1) {
                    const route = await getRoute(coordinates, walking, signal);
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
                    type: "danger"
                });
                console.error(err);
            }
        }

        getAsyncRoute();

        return () => {
            abortController.abort();
            mounted = false;
        }
    }, [walking]);

    const addItem = (item) => {

        var exist = existItem(`${item.features[0].properties.id}`);

        if (!exist) {
            setTurismoItems({
                items: [...turismoItems.items, item]
            });
            const tempo = tempoVisita;
            if (item.features[0].properties.tipo != "Hospedaxe" || item.features[0].properties.tipo != "Hostalaría") {
                initTempoVisita(tempo + item.features[0].properties.tempo_visita_rapida);
            }
            setPlanificacion(undefined);
        }
    };

    const existItem = (id) => {
        var exist = false;
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id) {
                exist = true;
                break;
            }
        }

        return exist;
    }

    const actualizaTempoVisita = (novoTempo, antigoTempo) => {
        console.log(tempoVisita, antigoTempo, novoTempo, tempoVisita - antigoTempo + novoTempo);
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

    const changeOrderUp = (id) => {
        var index;
        var aux = [];
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id) {
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

    const changeOrderDown = (id) => {
        var index;
        var aux = [];
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` == id) {
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
                    type: "info"
                });
                let data;
                if (tipo == "Hospedaxe") {
                    data = await getGeoElementJsonHospedaxe(id);
                } else if(tipo == "Hostalaría") {
                    data = await getGeoElementJsonHostalaria(id);
                } else {
                    data = await getGeoElementJson(id, tipo);
                }
                if (data == undefined || data.features[0] == undefined) {
                    showMessage({
                        message: 'Elemento non engadido',
                        type: "danger"
                    });
                    return;
                }
                addItem(data);
                showMessage({
                    message: 'Elemento engadido á planificación',
                    type: "success"
                });
                return true;
            } else {
                showMessage({
                    message: 'Elemento xa engadido á planificación',
                    type: "warning"
                });
                return false;
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro de conexión',
                type: "danger"
            });
            return false;
        }
    }

    const addElementsToPlanificacion = async (elements, planificacion, navigation) => {
        try {
            const newElements = [];
            setTempoVisita(0);
            var tempo_visita = 0;
            elements.map(async (element) => {
                const data = await getGeoElementJson(element.id, element.tipo);
                data.features[0].properties["tipo_visita"] = element.tipo_visita;
                newElements.push(data);
                if (data.features[0].properties.tipo != "Hospedaxe" || data.features[0].properties.tipo != "Hostalaría") {
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
            });
            setTimeout(() => {
                setTurismoItems({
                    items: newElements
                });
                initTempoVisita(tempo_visita);
                setPlanificacion(planificacion);
                navigation.navigate('Map');
            }, 1000);
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro de conexión',
                type: "danger"
            });
        }
    }

    const changeTipoVisita = (titulo, tipoVisita) => {
        console.log(tipoVisita);
        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.titulo}` == titulo) {
                console.log(e.features[0].properties.titulo, tipoVisita);
                e.features[0].properties["tipo_visita"] = tipoVisita;
                break;
            }
        }
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
        hostalariaFav:[]
    });

    const addElementoFav = async (token, changeFavView, item, model) => {
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
                        type: "danger"
                    });
                    return;
                }
            }
            item.favorito = true;
            changeFavView();
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro marcando o elemento como favorito',
                type: "danger"
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
                        type: "danger"
                    });
                    return;
                }
            }
            item.favorito = false;
            changeFavView();
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro quitando elemento como favorito',
                type: "danger"
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
                hostalariaFav: data.hostalariaFav
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
            hostalariaFav: []
        })
    }

    const settings = {
        addItem: addItem,
        route: route,
        existItem: existItem,
        coordinates: coordinates,
        turismoItems: turismoItems.items,
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
        changeTipoVisita: changeTipoVisita
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