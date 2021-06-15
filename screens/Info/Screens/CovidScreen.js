import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import * as Linking from 'expo-linking';

import { stylesScroll, styleURL } from '../../../styles/styles'

const CovidScreen = (props) => {

    const data = props.route.params.data;

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