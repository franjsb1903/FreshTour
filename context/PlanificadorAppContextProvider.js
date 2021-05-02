import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';
import { getGeoElementJson } from '../model/Turismo/Turismo';
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
                showMessage({
                    message: 'Erro na obtención da ruta',
                    type: "danger"
                });
                console.error(err);
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
            initTempoVisita(tempo + item.features[0].properties.tempo_visita_rapida);
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
        setTempoVisita(tempoVisita - antigoTempo + novoTempo);
    }

    const initTempoVisita = (tempo) => {
        setTempoVisita(tempo);
    }

    const updateItems = (newItems) => {
        setTurismoItems({
            items: newItems
        });
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
                const data = await getGeoElementJson(id, tipo);
                if (data == undefined || data.features[0] == undefined) {
                    showMessage({
                        message: 'Elemento non engadido',
                        type: "danger"
                    });
                    return;
                }
                showMessage({
                    message: 'Elemento engadido á planificación',
                    type: "success"
                });
                addItem(data);
            } else {
                showMessage({
                    message: 'Elemento xa engadido á planificación',
                    type: "warning"
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

    const addElementsToPlanificacion = async (elements, planificacion, navigation) => {
        try {
            const newElements = [];
            setTempoVisita(0);
            var tempo_visita = 0;
            elements.map(async (element) => {
                const data = await getGeoElementJson(element.id);
                newElements.push(data);
                tempo_visita += data.features[0].properties.tempo_visita_rapida;
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

    const updateGeoMap = (text) => {
        setGeoMap(text);
    }

    const [user, setUser] = useState({
        user: {},
        isLoggedIn: false,
        planificacions: [],
        planificacionsFav: [],
        opinions: [],
        elementosFav: []
    });

    const addElementoFav = async (token, changeFavView, item) => {
        try {
            const response = await addElementoFavModel(token, item.id, item.tipo);
            if (response.status != 200) {
                if(!await shouldDeleteToken(response.message, 'id_token')) {
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

    const deleteElementoFav = async (token, changeFavView, item) => {
        try {
            const response = await deleteElementoFavModel(token, item.id, item.tipo);
            if (response.status != 200) {
                if(!await shouldDeleteToken(response.message, 'id_token')) {
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
                elementosFav: data.elementosFav
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
            elementosFav: []
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
        updatePlanificacion: updatePlanificacion
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