import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper'

import {styleTurismoItem} from '../../../styles/styles';
import properties from '../../../properties/properties_expo'

const TiposVisita = (props) => {

    const element = props.element;

    return (
        <ScrollView style={styleTurismoItem.scroll}>
            <View style={styleTurismoItem.viewContainer}>
                <Title style={styleTurismoItem.title}>Visita rápida</Title>
                <Text style={styleTurismoItem.text}>{element.comentario_visita_rapida}</Text>
            </View>
            <View style={styleTurismoItem.viewContainer}>
                <Title style={styleTurismoItem.title}>Visita lenta</Title>
                <Text style={styleTurismoItem.text}>{element.comentario_visita_lenta}</Text>
            </View>
            <View style={styleTurismoItem.viewContainer}>
                <Title style={styleTurismoItem.title}>Visita usuario</Title>
                <Text style={styleTurismoItem.text}>{properties.turismoItem.comentario_visita_usuario}</Text>
            </View>
        </ScrollView>
    )
}

export default TiposVisita;