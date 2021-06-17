/**
 * @fileoverview Pantalla de calidade do aire dentro do planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, useEffect, useState, Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

// estilos
import { stylesScroll, customTouchableOpacity } from '../../../../styles/styles';
import { stylesTurismoList } from '../../../../styles/styles';

// compoñentes
import { RefreshIcon } from '../../../../components/CustomIcons';
import Semaforo from '../../../../components/Semaforo';
import ProgressBar from '../../../../components/ProgressBar'

// contexto
import AppContext from '../../../../context/AppContext';

/**
 * Compoñente que conforma a pantalla de calidade do aire no planificador
 * @returns {Component}
 */
const CalidadeAire = () => {

    const [data, setData] = useState([]);                           // Estado que reúne os datos a amosar
    const [loading, setLoading] = useState(false);                  // Estado que indica cando se está cargando a información

    const context = useContext(AppContext);                         // Constante que permite acceder ao contexto

    /**
     * Execútase o contido da función cando cambia os datos de calidade do aire no contexto
     */
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