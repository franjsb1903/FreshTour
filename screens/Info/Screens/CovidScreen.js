/**
 * @fileoverview Pantalla de información sobre a COVID
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import * as Linking from 'expo-linking';

// estilos
import { stylesScroll, styleURL } from '../../../styles/styles'

/**
 * Compoñente que conforma a pantalla de información da COVID
 * @param {Object} props 
 * @returns {Component}
 */
const CovidScreen = (props) => {

    const data = props.route.params.data;               // Información a amosar

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={[stylesScroll.containerScroll, { padding: 20 }]}>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.title}>DATOS ACTUALIZADOS</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.smallTitle}>Novos contaxios</Text>
                        <Text style={styles.textRows}>{data.today_new_confirmed} casos</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.smallTitle}>Variación con onte</Text>
                        <Text style={styles.textRows}>{parseFloat(data.today_vs_yesterday_confirmed).toFixed(5)}</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <Text style={styles.smallTitle}>Total dende inicio</Text>
                    <Text style={styles.textRows}>{data.today_confirmed} casos</Text>
                </View>
                <View style={[styles.column, { flex: 2 }]}>
                    <Text style={styles.smallTitle}>Fonte</Text>
                    <Text style={styles.textRows}>{data.source}</Text>
                </View>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.title}>RESTRICIÓNS VIXENTES</Text>
                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.textRest}>Pode consultar as restricións vixentes na seguinte páxina web:</Text>
                    <Text style={styleURL.url} onPress={() => {
                        Linking.openURL('https://coronavirus.sergas.es/Contidos/Restriccions-concellos?idioma=es');
                    }}>https://coronavirus.sergas.es/Contidos/Restriccions-concellos?idioma=es</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    column: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        padding: 10,
        justifyContent: "center"
    },
    smallTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    textRows: {
        fontSize: 18
    },
    textRest: {
        fontSize: 20,
        textAlign: "justify"
    }
});

export default CovidScreen;