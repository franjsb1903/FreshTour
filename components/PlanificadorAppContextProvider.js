import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';

import { getRoute } from '../model/Planificador/Planificador';

const AppContextProvider = (props) => {

    const [turismoItems, setTurismoItems] = useState({
        items: []
    });

    const [coordinates, setCoordinates] = useState([]);

    const [route, setRoute] = useState('');

    const [routeJson, setRouteJson] = useState({});

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
                        setRoute(route);
                        setRouteJson(JSON.parse(route));
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
        }
    };

    const existItem = (id) => {
        var exist = false;

        for (var i = 0; i < turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` === id) {
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

    const settings = {
        addItem: addItem,
        route: route,
        existItem: existItem,
        routeJson: routeJson,
        coordinates: coordinates,
        turismoItems: turismoItems.items
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