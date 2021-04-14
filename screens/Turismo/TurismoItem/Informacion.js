import React from 'react';
import { View, Text, ScrollView, StyleSheet, VirtualizedList } from 'react-native';
import { Title } from 'react-native-paper';
import * as Linking from 'expo-linking';

import { styleTurismoItem as styles, stylesBorderContainer as borderStyle, stylesScroll } from '../../../styles/styles'

const Informacion = (props) => {

    const element = props.element;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={borderStyle.viewContainer}>
                <Title style={borderStyle.title}> Localización </Title>
                <View style={borderStyle.viewTextContainer}>
                    <Text style={borderStyle.textBold}>{element.direccion}</Text>
                    <Text style={borderStyle.textBold}>{element.cp}, {element.municipio}, {element.pais}</Text>
                </View>
            </View>
            <View style={borderStyle.viewContainer}>
                <Title style={borderStyle.title}> Datos de visita </Title>
                <View style={borderStyle.viewTextContainer}>
                    <Title style={borderStyle.titleSize}>Prezo</Title>
                    <Text style={borderStyle.text}>Normal: <Text style={borderStyle.textBold}>{element.prezo} €</Text></Text>
                    <Text style={borderStyle.text}>Reducido: <Text style={borderStyle.textBold}>{element.prezo_reducido} €</Text></Text>
                </View>
                <View style={borderStyle.viewTextContainer}>
                    <Title style={borderStyle.titleSize}>Horario</Title>
                    <Text style={borderStyle.textBold}>{element.horario}</Text>
                </View>
                <View style={borderStyle.viewTextContainer}>
                    <Title style={borderStyle.titleSize}>Tempo de visita</Title>
                    <Text style={borderStyle.text}>Tempo rápido: <Text style={borderStyle.textBold}>{element.tempo_visita_rapida} min</Text></Text>
                    <Text style={borderStyle.text}>Tempo lento: <Text style={borderStyle.textBold}>{element.tempo_visita_lenta} min</Text></Text>
                    <Text style={borderStyle.text}>Tempo usuario: <Text style={borderStyle.textBold}>{element.tempo_visita_usuario} min</Text></Text>
                </View>
                <View style={borderStyle.viewTextContainer}>
                    <Title style={borderStyle.titleSize}>URL</Title>
                    <Text style={styles.url} onPress={() => {
                        Linking.openURL(element.url);
                    }}>{element.url}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Informacion;