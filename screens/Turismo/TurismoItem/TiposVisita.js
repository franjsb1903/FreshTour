import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper'

import { stylesBorderContainer as styles, stylesScroll } from '../../../styles/styles';
import properties from '../../../properties/properties_expo'

const TiposVisita = (props) => {

    const element = props.element;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={styles.viewContainer}>
                <Title style={styles.title}>Visita rápida</Title>
                <Text style={styles.text}>{element.comentario_visita_rapida}</Text>
            </View>
            <View style={styles.viewContainer}>
                <Title style={styles.title}>Visita lenta</Title>
                <Text style={styles.text}>{element.comentario_visita_lenta}</Text>
            </View>
            <View style={styles.viewContainer}>
                <Title style={styles.title}>Visita usuario</Title>
                <Text style={styles.text}>{properties.turismoItem.comentario_visita_usuario}</Text>
            </View>
        </ScrollView>
    )
}

export default TiposVisita;