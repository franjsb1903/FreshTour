/**
 * @fileoverview Tarxeta que se emprega para amosar a ruta entre dous elementos da planificación do planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, Component } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

// estilos
import { stylesCardElementRuta as styles } from '../styles/styles'

/**
 * Compoñente que conforma a tarxeta que amosa a ruta entre dous elementos da planificación
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementRutaPlanificacion = (props) => {

    const anterior = props.anterior;                                    // Obxecto que reúne a información do elemento anterior ao actual na planificación
    const element = props.element;                                      // Obxecto que reúne a información do elemento actual
    const position = props.position;                                    // Enteiro que indica a posición actual na planificación

    const [route, setstate] = useState({});                             // Estado que garda os datos da ruta actual da planificación

    /**
     * Cando cambie o atributo route de props, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        try {
            const data = props.route;
            if (mounted) {
                setstate(data);
            }
        } catch (err) {
            console.error(err);
        }

        return () => mounted = false;
    }, [props.route])

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.title}>Ruta <Text style={styles.titleBold}>{anterior.features[0].properties.titulo}</Text> a <Text style={styles.titleBold}>{element.features[0].properties.titulo}</Text></Text>
            </View>
            <Card.Divider />
            {
                route == undefined || route.features == undefined || route.features[0].properties.segments[position] == undefined ?
                    <Text style={styles.text}>Calculando ruta...</Text> :
                    <View style={styles.rowContainer}>
                        <View style={{ flex: 1, justifyContent: "flex-start" }}>
                            <Text style={styles.textTempo}>Tempo: <Text style={styles.text}>{
                                Math.round(route.features[0].properties.segments[position].duration / 60) > 60 ?
                                    <Text>{Number((route.features[0].properties.segments[position].duration / 3600).toFixed(1))} h</Text> :
                                    <Text>{Math.round(route.features[0].properties.segments[position].duration / 60)} min</Text>
                            }</Text></Text>
                        </View>
                        <View style={{ justifyContent: "flex-end" }}>
                            <Text style={styles.textDistancia}>Distancia: <Text style={styles.text}>{(route.features[0].properties.segments[position].distance).toFixed(1)} km</Text></Text>
                        </View>
                    </View>
            }

        </Card >
    )
}

export default CardElementRutaPlanificacion;