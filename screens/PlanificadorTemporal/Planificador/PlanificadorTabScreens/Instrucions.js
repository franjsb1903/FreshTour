import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import AppContext from '../../../../context/PlanificadorAppContext';

import CustomListInstrucions from '../../../../components/CustomListInstrucions';
import NoElementsPlanificadorView from '../../../../components/NoElementsPlanificadorView';

import { stylesScroll as styles } from '../../../../styles/styles';

const Instrucions = () => {

    const [data, setData] = useState(undefined);
    const [items, setItems] = useState([]);
    const context = useContext(AppContext);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setData(context.route.routeJson);
        }

        return () => mounted = false;
    }, [context.route.routeJson]);

    useEffect(() => {
        let mounted = true;

        if (mounted)
            setItems(context.turismoItems);

        return () => mounted = false;
    }, [context.turismoItems]);

    const drawList = () => {
        var list = [];
        for (var i = 0; i < items.length - 1; i++) {
            list.push(
                <CustomListInstrucions key={i} element={items[i]} steps={data.features[0].properties.segments[i].steps} />
            );
        }
        list.push(
            <CustomListInstrucions key={items[items.length - 1].features[0].properties.id} element={items[items.length - 1]} steps={undefined} />
        )
        return list;
    }

    return (
        data && data.features && data.features[0].properties.segments[items.length - 2] ?
            <ScrollView style={styles.scroll}>
                {drawList()}
            </ScrollView>
            :
            <NoElementsPlanificadorView />
    );
}

export default Instrucions;