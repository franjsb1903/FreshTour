import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';
import { ToastAndroid } from 'react-native'

import { getRoute } from '../model/Planificador/Planificador';

const AppContextProvider = (props) => {

    const [turismoItems, setTurismoItems] = useState({
        items: []
    });

    const [coordinates, setCoordinates] = useState([]);

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
                    const route = await getRoute(coordinates);
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

    const settings = {
        addItem: addItem,
        route: route,
        existItem: existItem,
        coordinates: coordinates,
        turismoItems: turismoItems.items,
        actualizaTempoVisita: actualizaTempoVisita,
        tempoVisita: tempoVisita,
        updateItems: updateItems
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