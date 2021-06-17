/**
 * @fileoverview Pantalla que amosa as rutas almacenadas polo usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

// estilos
import { stylesScroll } from '../../../styles/styles';

// compoñentes
import CardElementRuta from '../../../components/CardElementRuta';
import NoData from '../../../components/NoData';

/**
 * Compoñente que conforma a pantalla na que se amosan as rutas almacenadas polo usuario
 * @param {Object} props 
 * @returns {Component}
 */
const RutasUsuario = (props) => {

    const planificacions = props.route.params.planificacions;           // Array cas planificacións do usuario

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                planificacions.length == 0 ?
                    <NoData />
                    :
                    planificacions.map(planificacion => {
                        return (
                            <TouchableOpacity
                                key={planificacion.id}
                                onPress={() => props.navigation.navigate('RutasRecomendadasItem', {
                                    planificacion: planificacion
                                })}>
                                <CardElementRuta planificacion={planificacion} isUser={true} />
                            </TouchableOpacity>
                        )
                    })
            }
        </ScrollView>
    )
}

export default RutasUsuario;