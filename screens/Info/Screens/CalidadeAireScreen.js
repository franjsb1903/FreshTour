/**
 * @fileoverview Pantalla de calidade do aire
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native'

// compoñentes
import Semaforo from '../../../components/Semaforo';

// estilos
import { stylesScroll } from '../../../styles/styles'

/**
 * Compoñente que conforma a pantalla de calidade do aire
 * @param {Object} props 
 * @returns {Component}
 */
const CalidadeAireScreen = (props) => {

    const data = props.route.params.data;               // Información a amosar

    return (
        <>
            <ScrollView style={stylesScroll.scroll} contentContainerStyle={{ padding: 30, marginTop: 30 }}>
                <View style={styles.view}>
                    <Text style={styles.title}>Dióxido de Nitróxeno (NO2)</Text>
                    <Semaforo type={"no2"} value={data.no2} size={70} />
                </View>
                <View style={styles.view}>
                    <Text style={styles.title}>Ozono (O3)</Text>
                    <Semaforo type={"o3"} value={data.o3} size={70} />
                </View>

            </ScrollView>
            <View style={[styles.view, stylesScroll.scroll, { padding: 50 }]}>
                <Text style={{ fontSize: 15, fontStyle: "italic", textAlign: "justify" }}>
                    Nesta ventá poderá ver un resumo da calidade do aire na cidade de Santiago de Compostela no momento actual da consulta, concretamente dos gases NO2 (Dióxido de Nitróxeno) e O3 (Ozono). Para ver o significado das iconas, consulte na pantalla "Info" o apartado "información calidade aire".
        </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        fontStyle: "italic"
    }
});

export default CalidadeAireScreen;