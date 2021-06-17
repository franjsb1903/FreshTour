/**
 * @fileoverview Pantalla de tipos de visita dun elemento turístico concreto
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Title } from 'react-native-paper'

// estilos
import { stylesBorderContainer as styles, stylesScroll } from '../../../styles/styles';

// propiedades
import properties from '../../../properties/properties_expo'

/**
 * Compoñente que conforma a pantalla de tipos de visita dun elemento turístico concreto
 * @param {Object} props 
 * @returns {Component}
 */
const TiposVisita = (props) => {

    const element = props.element;          // Elemento turístico

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