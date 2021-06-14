/**
 * @fileoverview Tarxeta da sección de Info da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

// compoñentes
import { ChevronRightIcon } from './CustomIcons'

/**
 * Compoñente que conforma a tarxeta para a sección de Info
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementInfo = (props) => {

    const data = props.data;                    // Obxecto que recibe o compoñente para amosar información na tarxeta
    const CardData = props.CardData;            // Compoñente que se recibe para amosalo na tarxeta, podendo existir ou non

    return (
        <Card containerStyle={{ borderWidth: 2, borderColor: "black" }}>
            <View style={styles.card}>
                <Text style={styles.title}>{data.label}</Text>
                {
                    CardData ?                  // Se o compoñente non existe, non se amosa nada
                        <CardData />
                        :
                        <></>
                }
                <ChevronRightIcon />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({              // Constante que agrupa todos os estilos a empregar no presente compoñente
    card: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        flex: 1
    }
});

export default CardElementInfo;