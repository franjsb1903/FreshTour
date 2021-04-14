import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';

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
        turismoItems.items.map(e => {
            const coord = [parseFloat(`${e.features[0].geometry.coordinates[0]}`), parseFloat(`${e.features[0].geometry.coordinates[1]}`)]
            if (!existCoordinate(coord)) {
                setCoordinates([...coordinates, coord]);
            }
        });
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
                }
            } catch (err) {
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

    const existCoordinate = (coordinate) => {
        var exist = false;

        for (var i = 0; i < coordinates.length; i++) {
            const e = coordinates[i];
            if (e[0] === coordinate[0] && e[1] == coordinate[1]) {
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

    const settings = {
        addItem: addItem,
        route: route,
        existItem: existItem,
        coordinates: coordinates,
        turismoItems: turismoItems.items,
        actualizaTempoVisita: actualizaTempoVisita,
        tempoVisita: tempoVisita
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