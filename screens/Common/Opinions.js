/**
 * @fileoverview Pantalla de opinións da aplicación sobre un elemento concreto ou planificación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulo
import React, { useState, Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// estilos
import { stylesScroll, styleTurismoItem as styles } from '../../styles/styles';

// compoñentes
import Stars from '../../components/CustomStarsDisplay';
import { CommentIcon } from '../../components/CustomIcons';
import CardElementOpinion from '../../components/CardElementOpinion';

/**
 * Compoñente que conforma a pantalla de opinións dun elemento concreto ou planificación
 * @param {Object} props 
 * @returns {Component}
 */
const Opinions = (props) => {

    const [refreshing, setRefreshing] = useState(false);                // Estado que indica cando se ten que refrescar a pantalla

    const opinions = props.opinions;                                    // Obxecto que contén as opinións a amosar
    const element = props.element;                                      // Obxecto que reúnde a información do elemento concreto
    const onRefreshOpinions = props.onRefreshOpinions;                  // Función que permite refrescar as opinións
    const titulo = props.titulo;                                        // Título da pantalla
    const isPlanificacion = props.isPlanificacion;                      // Boolean que indica se é unha planificación
    const isHospedaxe = props.isHospedaxe;                              // Boolean que indica se é un elemento de hospedaxe
    const isLecer = props.isLecer;                                      // Boolean que indica se é un elemento de lecer
    const navigation = useNavigation();                                 // Constante que permite empregar a navegación

    /**
     * Permite refrescar a pantalla
     */
    const onRefresh = async () => {
        try {
            setRefreshing(true);
            onRefreshOpinions();
            setRefreshing(false);
        } catch (err) {
            ToastAndroid.show('Erro na actualización', ToastAndroid.SHORT);
        }
    }

    /**
     * Botón para engadir un novo comentario
     * @returns {Component}
     */
    const ButtonOpinion = () => (
        <TouchableOpacity style={[styles.container, { justifyContent: "flex-start" }]}
            onPress={() => navigation.navigate('NewComment', {
                element: element,
                titulo: titulo,
                isPlanificacion: isPlanificacion,
                onRefreshOpinions: onRefreshOpinions,
                isHospedaxe: isHospedaxe,
                isLecer: isLecer
            })}>
            <CommentIcon />
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Realizar un comentario</Text>
        </ TouchableOpacity>
    )

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={[styles.container, styles.background, { justifyContent: "flex-start" }]}>
                <Stars style={styles.stars} value={opinions.valoracion} />
                {
                    opinions.count != undefined && opinions.status == 200 ?
                        <Text style={styles.valoracion}>{opinions.count} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }
            </View>
            <View>
                {
                    isPlanificacion ?
                        element.id_actual_usuario ?
                            element.id_actual_usuario == element.id_usuario ?
                                <></>
                                : <ButtonOpinion />
                            : <ButtonOpinion />
                        :
                        <ButtonOpinion />
                }
            </View>
            {
                opinions.opinions.length == 0 ?
                    <></>
                    :
                    opinions.opinions.map(opinion => {
                        return (
                            <CardElementOpinion key={opinion.id} opinion={opinion} />
                        )
                    })
            }
        </ScrollView>
    )
}

export default Opinions;