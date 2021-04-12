import React, { useState, useEffect } from 'react';
import AppContext from './PlanificadorAppContext';

import { getRoute } from '../model/Planificador/Planificador';

const AppContextProvider = (props) => {
    const [turismoItems, setTurismoItems] = useState({
        items: []
    });

    const [coordinates, setCoordinates] = useState([]);

    const [route, setRoute] = useState('');

    useEffect(() => {
        turismoItems.items.map(e => {
            setCoordinates([...coordinates, `${e.features[0].geometry.coordinates}`]);
        });
    }, [turismoItems.items]);

    useEffect(() => {
        getRoute(coordinates);
    }, [coordinates])
 
    const addItem = (item) => {
        var exist = false;

        for(var i = 0; i<turismoItems.items.length; i++) {
            const e = turismoItems.items[i];
            if (`${e.features[0].properties.id}` === `${item.features[0].properties.id}`) {
                exist = true;
                break;
            }
        }

        if (!exist) {
            setTurismoItems({
                items: [...turismoItems.items, item]
            });
        }
    };

    const settings = {
        addItem: addItem
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