import React, { useEffect, useState } from 'react'
import { Text, View, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { PlayIconButton, CloseIconButton, ChevronDownIconButton, ChevronUpIconButton, StopIconButton } from '../components/CustomIcons'

import { stylesCardElementRuta as styles } from '../styles/styles'

const CardElementRutaPlanificacion = (props) => {

    const anterior = props.anterior;
    const element = props.element;
    const position = props.position;

    const [route, setstate] = useState({})

    useEffect(() => {
        let mounted = true;
        try {
            const data = JSON.parse(props.route)
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
                    <Text>Waiting</Text> :
                    <View style={styles.rowContainer}>
                        <View style={{ flex: 1, justifyContent: "flex-start" }}>
                            <Text style={styles.textTempo}>Tempo: <Text style={styles.text}>{Math.round(route.features[0].properties.segments[position].duration / 60)} min</Text></Text>
                        </View>
                        <View style={{ justifyContent: "flex-end" }}>
                            <Text style={styles.textDistancia}>Distancia: <Text style={styles.text}>{route.features[0].properties.segments[position].distance} km</Text></Text>
                        </View>
                    </View>
            }

        </Card >
    )
}

export default CardElementRutaPlanificacion;