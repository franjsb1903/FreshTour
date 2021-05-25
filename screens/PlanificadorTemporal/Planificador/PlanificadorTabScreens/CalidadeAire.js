import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import { stylesScroll } from '../../../../styles/styles';
import { RefreshIconButton } from '../../../../components/CustomIcons';

import AppContext from '../../../../context/PlanificadorAppContext';

const CalidadeAire = () => {

    const [data, setData] = useState([]);

    const context = useContext(AppContext);

    useEffect(() => {
        let mounted = true;

        if (mounted)
            setData(context.calidadeAire);

        return () => mounted = false;
    }, [context.calidadeAire]);

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <RefreshIconButton _onPress={async () => {
                await context.refreshCalidadeAire(true);
            }} />
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
                            <Text>{calidade.text.split("NODATA_VALUE")[1].split("\n")[1]}</Text>
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
        fontStyle: "italic"
    }
});

export default CalidadeAire;