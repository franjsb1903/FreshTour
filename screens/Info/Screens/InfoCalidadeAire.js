/**
 * @fileoverview Pantalla de información explicativa sobre a calidade do aire
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

// compoñentes
import { HappyIcon, MediumHappyIcon, SadIcon } from '../../../components/CustomIcons';

// estilos
import { stylesScroll } from '../../../styles/styles';

/**
 * Compoñente que conforma a pantalla de información explicativa sobre a calidade do aire
 * @returns {Component}
 */
const InfoCalidadeAire = () => {

    return (
        <ScrollView contentContainerStyle={stylesScroll.containerScroll} style={stylesScroll.scroll}>
            <View style={styles.view}>
                <Text style={styles.title}>De onde procede?</Text>
                <Text style={styles.text}>A información sobre a calidade que pode ver na aplicación procede dos sensores que o proxecto Trafair ten situados na cidade. Eses sensores xeran datos que son empregados para realizar predicións, así como para amosala nesta mesma aplicación de xeito resumido.</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.title}>Que significan as iconas?*</Text>
                <Text style={styles.text}>As iconas permiten amosar de maneira gráfica e intuitiva como é a calidade do aire nun determinado momento.</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.row}>
                        <HappyIcon size={50} style={{ flex: 1 }} />
                        <Text style={styles.textIcon}>A calidade do aire é boa</Text>
                    </View>
                    <View style={styles.row}>
                        <MediumHappyIcon size={50} style={{ flex: 1 }} />
                        <Text style={styles.textIcon}>A calidade do aire non é demasiado boa</Text>
                    </View>
                    <View style={styles.row}>
                        <SadIcon size={50} style={{ flex: 1 }} />
                        <Text style={styles.textIcon}>A calidade do aire é mala</Text>
                    </View>
                </View>
            </View>
            <View style={styles.view}>
                <Text style={styles.title}>Que datos se amosan?</Text>
                <Text style={styles.text}>No apartado de calidade do aire na sección "Info", amósase un resumo da calidade do aire na cidade no intre en que se solicita a información, distinguindo entre o Dióxido de Nitróxeno (NO2) e Ozono (O3).
                
                Na planificación, a calidade do aire móstrase en distintos puntos da ruta en rangos de 60 minutos, tendo en conta os tempos de visita, incumbindo neste caso ao gas NOx.</Text>          
            </View>
            <View style={styles.view}>
                <Text style={styles.title}>En valores numéricos?*</Text>
                <Text style={styles.text}>Os valores numéricos asociados ás iconas son as seguintes:</Text>
                <Text style={styles.subtitle}>NO2</Text>
                <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <HappyIcon size={50} style={{ flex: 1 }} />
                    <Text style={styles.textIcon}>Por debaixo de 150 micg/m3</Text>
                </View>
                <View style={styles.row}>
                    <MediumHappyIcon size={50} style={{ flex: 1 }} />
                    <Text style={styles.textIcon}>Entre 150-200 micg/m3</Text>
                </View>
                <View style={styles.row}>
                    <SadIcon size={50} style={{ flex: 1 }} />
                    <Text style={styles.textIcon}>Por encima de 200 micg/m3</Text>
                </View>
                </View>
                <Text style={styles.subtitle}>O3</Text>
                <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <HappyIcon size={50} style={{ flex: 1 }} />
                    <Text style={styles.textIcon}>Por debaixo de 100 micg/m3</Text>
                </View>
                <View style={styles.row}>
                    <MediumHappyIcon size={50} style={{ flex: 1 }} />
                    <Text style={styles.textIcon}>Entre 100-120 micg/m3</Text>
                </View>
                <View style={styles.row}>
                    <SadIcon size={50} style={{ flex: 1 }} />
                    <Text style={styles.textIcon}>Por encima de 120 micg/m3</Text>
                </View>
                </View>
            </View>
            <View style={styles.view}>
                <Text style={{ fontSize: 15, fontStyle: "italic" }}>*O semáforo de calidade do aire que se pode ver na aplicación non ten base legal.</Text>          
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    subtitle: {
        fontSize: 23,
        fontWeight: "bold",
        padding: 10,
        textDecorationLine: "underline"
    },
    text: {
        fontSize: 18,
        textAlign: "justify"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    rowContainer: {
        padding: 10
    },
    textIcon: {
        fontSize: 18,
        flex: 1,
        marginLeft: 5
    }
});

export default InfoCalidadeAire;