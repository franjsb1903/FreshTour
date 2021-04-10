import React from 'react';
import { View, Text, ScrollView, StyleSheet, VirtualizedList } from 'react-native';
import { Title } from 'react-native-paper';
import * as Linking from 'expo-linking';

import { styleTurismoItem as styles } from '../../../styles/styles'

const Informacion = (props) => {

    const element = props.element;

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.viewContainer}>
                <Title style={styles.title}> Localización </Title>
                <View style={styles.viewTextContainer}>
                    <Text style={styles.textBold}>{element.direccion}</Text>
                    <Text style={styles.textBold}>{element.cp}, {element.municipio}, {element.pais}</Text>
                </View>
            </View>
            <View style={styles.viewContainer}>
                <Title style={styles.title}> Datos de visita </Title>
                <View style={styles.viewTextContainer}>
                    <Title style={styles.titleSize}>Prezo</Title>
                    <Text style={styles.text}>Normal: <Text style={styles.textBold}>{element.prezo} €</Text></Text>
                    <Text style={styles.text}>Reducido: <Text style={styles.textBold}>{element.prezo_reducido} €</Text></Text>
                </View>
                <View style={styles.viewTextContainer}>
                    <Title style={styles.titleSize}>Horario</Title>
                    <Text style={styles.textBold}>{element.horario}</Text>
                </View>
                <View style={styles.viewTextContainer}>
                    <Title style={styles.titleSize}>Tempo de visita</Title>
                    <Text style={styles.text}>Tempo rápido: <Text style={styles.textBold}>{element.tempo_visita_rapida} min</Text></Text>
                    <Text style={styles.text}>Tempo lento: <Text style={styles.textBold}>{element.tempo_visita_lenta} min</Text></Text>
                    <Text style={styles.text}>Tempo usuario: <Text style={styles.textBold}>{element.tempo_visita_usuario} min</Text></Text>
                </View>
                <View style={styles.viewTextContainer}>
                    <Title style={styles.titleSize}>URL</Title>
                    <Text style={styles.url} onPress={() => {
                        Linking.openURL(element.url);
                    }}>{element.url}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Informacion;