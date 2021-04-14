import React, { useEffect, useState } from 'react'
import { Text, View, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';

import { stylesCardInstrucion as styles, flexRowContainer as flex } from '../styles/styles'

const CardElementRutaPlanificacion = (props) => {

    const data = props.data;

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.titleBold}>En {data.distance}:</Text>
            </View>
            <View style={flex.container}>
                <View style={styles.text}>{data.instruction}</View>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.textNormal}>Duracion estimada: {data.duration}</Text>
            </View>
        </Card >
    )
}

export default CardElementRutaPlanificacion;