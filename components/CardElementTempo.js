/**
 * @fileoverview Tarxeta que se emprega para amosar a información do tempo
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';

// compoñentes
import { UmbrellaIcon } from './CustomIcons';

/**
 * Compoñente que conforma a tarxeta para amosar información do tempo
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementTempo = (props) => {

    const icon = props.icon;                                                                    // Icona do tempo
    const temperature = props.temperature;                                                      // Flotante que indica a temperatura
    const precipitation = props.precipitation;                                                  // Flotante que indica a porcentaxe de precipitación
    const wind = props.wind;                                                                    // Flotante que indica a velocidade do tempo
    const isMultiple = props.isMultiple;                                                        // Boolean que indica que é necesario amosar máis dunha tarxeta na mesma liña
    const day = props.day;                                                                      // String que indica a data na que se amosan os datos
    const momment = props.momment;                                                              // String que indica o momento do día no que se amosan os datos

    /**
     * Permite transformar unha data en formato ISO8601 a unha data comprensible por JavaScript
     * @param {String} isostr 
     * @returns {Date}
     */
    function dateFromISO8601(isostr) {
        var parts = isostr.match(/\d+/g);
        return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    }

    const date = dateFromISO8601(day);
    var days = ['Domingo','Luns','Martes','Mércores','Xoves','Venres','Sábado'];

    return (
        <>
            <View style={styles.container} >
                <Text style={[{ color: "grey", fontWeight: "bold" }, isMultiple ? {fontSize: 13} : {fontSize : 18}]}>{days[date.getDay()]} {momment}</Text>
                <Image style={isMultiple ? { width: 55, height: 55, resizeMode: "contain" } : { width: 75, height: 75, resizeMode: "contain" }} source={{ uri: icon }} />
                <Text style={[styles.text, { marginTop: 10 }]}>{temperature} ºC</Text>
                <View style={[styles.view, isMultiple ? {flexDirection: "column"} : {flexDirection: "row"}]}>
                    <UmbrellaIcon size={isMultiple ? 20 : 30} />
                    <Text style={isMultiple ? styles.textMultiple : styles.text}>{precipitation} l/m2</Text>
                </View>
                <View style={[styles.view, isMultiple ? {flexDirection: "column"} : {flexDirection: "row"}]}>
                    <Image source={{ uri: wind.icon }} style={isMultiple ? { height: 20, width: 20, resizeMode: "contain" } : { height: 30, width: 30, resizeMode: "contain" }} />
                    <Text style={isMultiple ? styles.textMultiple : styles.text}>{wind.value} km/h</Text>
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "black",
        width: 200,
        shadowColor: "grey",
        elevation: 10,
        marginTop: 50
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
    },
    textMultiple: {
        fontSize: 13,
        fontWeight: "bold"
    },
    view: { 
        flexDirection: "row", 
        padding: 10, 
        justifyContent: "center", 
        alignItems: "center" 
    }
});

export default CardElementTempo;