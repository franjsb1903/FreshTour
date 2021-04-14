import React, { useContext, useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import AppContext from '../../../../components/PlanificadorAppContext'

import { stylesScroll as styles } from '../../../../styles/styles'

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

    return (
        <ScrollView style={styles.scroll}>
            
        </ScrollView>
    );
}

export default Instrucions;