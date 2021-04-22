import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';
import { ToastAndroid } from 'react-native'
import { getGeoElementJson } from '../model/Turismo/Turismo';
import { getRoute } from '../model/Planificador/Planificador';
import { addElementoFav as addElementoFavModel, deleteElementoFav as deleteElementoFavModel } from '../model/Usuarios/Usuarios';

const AppContextProvider = (props) => {

    const [turismoItems, setTurismoItems] = useState({
        items: []
    });

    const [coordinates, setCoordinates] = useState([]);

    const [walking, setWalking] = useState(true);

    const [route, setRoute] = useState({
        route: '',
        routeJson: {}
    });

    const [tempoVisita, setTempoVisita] = useState(0);

    useEffect(() => {
        var arrayCoordinates = [];
        turismoItems.items.map(e => {
            const coord = [parseFloat(`${e.features[0].geometry.coordinates[0]}`), parseFloat(`${e.features[0].geometry.coordinates[1]}`)]
            arrayCoordinates.push(coord);
        });
        setCoordinates(arrayCoordinates);
    }, [turismoItems.items]);

    useEffect(() => {

        async function getAsyncRoute() {
            try {
                if (coordinates.length > 1) {
                    const route = await getRoute(coordinates, walking);
                    if (route != undefined) {
                        setRoute({
                            route: route,
                            routeJson: JSON.parse(route)
                        });
                    }
                } else {
                    setRoute({
                        route: '',
                        routeJson: {}
                    });
                }
            } catch (err) {
                ToastAndroid.show("Erro na obtención da ruta", ToastAndroid.SHORT);
                console.error(err);
            }
        }

        getAsyncRoute();

    }, [coordinates]);

    useEffect(() => {

        async function getAsyncRoute() {
            try {
                if (coordinates.length > 1) {
                    const route = await getRoute(coordinates, walking);
                    if (route != undefined) {
                        setRoute({
                            route: route,
                            routeJson: JSON.parse(route)
                        });
                    }
                } else {
                    setRoute({
                        route: '',
                        routeJson: {}
                    });
                }
            } catch (err) {
                ToastAndroid.show("Erro na obtención da ruta", ToastAndroid.SHORT);
                console.error(err);
            }
        }

        getAsyncRoute();

    }, [walking]);

    const addItem = (item) => {

        var exist = existItem(`${item.features[0].properties.id}`);


        if (!exist) {
            setTurismoItems({
                items: [...turismoItems.items, item]
            });
            const tempo = tempoVisita;
            initTempoVisita(tempo + item.features[0].properties.tempo_visita_rapida);
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
        })
    }

    const changeProfile = () => {
        setWalking(!walking);
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
        var elementUp = aux[index-1];
        aux[index] = elementUp;
        aux[index-1] = elementDown;
        setTurismoItems({
            items: aux
        })
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
        var elementDown = aux[index+1];
        aux[index] = elementDown;
        aux[index+1] = elementUp;
        setTurismoItems({
            items: aux
        })
    }

    const addToPlanificacion = async (id, added) => {
        try {
            if(!added) {
                const data = await getGeoElementJson(id);
                if (data == undefined) {
                    ToastAndroid.show('Elemento non engadido', ToastAndroid.SHORT);
                    return;
                }
                ToastAndroid.show('Elemento engadido á planificación', ToastAndroid.SHORT);
                addItem(data);   
            } else {
                ToastAndroid.show('Elemento xa engadido á planificación', ToastAndroid.SHORT);
            }
        } catch (err) {
            console.log(err);
            ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
        }
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
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                return;
            }
            item.favorito = true;
            setUser({
                user: user.user,
                isLoggedIn: user.isLoggedIn,
                planificacions: user.planificacions,
                planificacionsFav: user.planificacionsFav,
                opinions: user.opinions,
                elementosFav: [...user.elementosFav, item]
            });
            changeFavView();
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro marcando o elemento como favorito', ToastAndroid.SHORT);
        }
    }

    const deleteElementoFavById = (id) => {
        const elementos = user.elementosFav.map((e) => e);
        for(var i=0; i<elementos.length; i++) {
            const fav = elementos[i];
            if(fav.id == id) {
                elementos.splice(i, 1);
                break;
            }
        }
        setUser({
            user: user.user,
            isLoggedIn: user.isLoggedIn,
            planificacions: user.planificacions,
            planificacionsFav: user.planificacionsFav,
            opinions: user.opinions,
            elementosFav: elementos
        });
    }

    const deleteElementoFav = async (token, changeFavView, item) => {
        try {
            const response = await deleteElementoFavModel(token, item.id, item.tipo);
            if(response.status != 200) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                return;
            }
            deleteElementoFavById(item.id);
            item.favorito=false;
            changeFavView();
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro quitando elemento como favorito', ToastAndroid.SHORT);
        }
    }

    const setNewUser = (data) => {
        console.log("object")
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
        deleteElementoFav: deleteElementoFav
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