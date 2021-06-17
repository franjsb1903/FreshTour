import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { stylesScroll, customTouchableOpacity } from '../../../../styles/styles';
import { RefreshIcon } from '../../../../components/CustomIcons';
import Semaforo from '../../../../components/Semaforo';
import { stylesTurismoList } from '../../../../styles/styles';
import ProgressBar from '../../../../components/ProgressBar'

import AppContext from '../../../../context/AppContext';

const CalidadeAire = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const context = useContext(AppContext);

    useEffect(() => {
        let mounted = true;

        if (mounted)
            setData(context.calidadeAire);

        return () => mounted = false;
    }, [context.calidadeAire]);

    return (
        loading ?
            <View style={stylesTurismoList.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
                    <TouchableOpacity style={customTouchableOpacity.buttonContainerSmaller} onPress={async () => {
                        setLoading(true);
                        await context.refreshCalidadeAire(true);
                        setLoading(false);
                    }}>
                        <RefreshIcon />
                    </TouchableOpacity>
                </View>
                {
                    data.map((calidade, index) => {
                        return (
                            <View style={styles.view} key={index}>
                                {
                                    index == 0 ?
                                        <Text style={styles.title}>Calidade do aire {calidade.date}</Text>
                                        :
                                        <Text style={styles.title}>Calidade do aire ás {calidade.date}</Text>
                                }
                                {
                                    calidade.text.split("<?xml").length > 1 ?
                                    <Text style={{ fontSize: 25, textDecorationLine: "underline", color: "darkgreen" }}>Sen datos</Text>
                                    :
                                    <Semaforo type={"no2"} value={calidade.text.split("NODATA_VALUE")[1].split("\n")[1]} size={60} />
                                }
                                
                            </View>
                        )
                    })
                }
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center"
    }
});

export default CalidadeAire;