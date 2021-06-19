/**
 * @fileoverview Pantalla de resumo dun elemento concreto ou planificación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, useContext, Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

// estilos
import { styleTurismoItem as styles, stylesScroll } from '../../styles/styles'

// compoñentes
import { HeartIconButton, HeartOutlineIconButton, MapIconButton, CalendarIconButton, CalendarOutlineIconButton, CalendarPlusIconButton, CalendarPlusOutlineIconButton } from '../../components/CustomIcons'
import Stars from '../../components/CustomStarsDisplay';
import ModalInicioSesion from '../../components/ModalInicioSesion';
import { onPressFav, onQuitFav } from '../../components/Common';

// modelo
import { addElementoFav, deleteElementoFav } from '../../model/Planificador/Planificador';

// contexto
import AppContext from '../../context/AppContext';

/**
 * Compoñente que conforma a pantalla de resumo dun elemento ou planificación
 * @param {Object} props 
 * @returns {Component}
 */
const Resumo = (props) => {

    const [added, setAdded] = useState(false);                  // Estado que indica se o elemento está engadido ou non á planificación
    const [fav, setFav] = useState(false);                      // Estado que indica se lo elemento é favorito ou non
    const [modal, setModal] = useState(false);                  // Estado que controla a visualización dun modal

    const context = useContext(AppContext);                     // Constante que permite acceder ao contexto da aplicación

    const element = props.element;                              // Obxecto que reúne a información do elemento
    const showOnMap = props.showOnMap;                          // Función para xeolocalizar o elemento no mapa
    const opinions = props.opinions;                            // Obxecto que reúne as opinións do elemento
    const isRuta = props.isRuta;                                // Boolean que indica se é o resumo dunha ruta
    const onRefresh = props.onRefresh;                          // Función para refrescar a pantalla
    const showOnPlanificacion = props.showOnPlanificacion;      // Función para amosar a planificación neste caso no planificador
    const isElementoRuta = props.isElementoRuta;                // Boolean que indica se é o resumo do elemento dunha planificación

    /**
     * Oculta ou amosa o modal
     */
    const showModal = () => {
        setModal(!modal);
    }

    /**
     * Cando se constrúe o compoñente, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setAdded(context.existItem(element.id, element.tipo));
            setFav(element.favorito);
        }

        return () => mounted = false;
    }, []);

    /**
     * Cambia o estado do elemento indicando que foi engadido á planificación
     */
    const changeAdd = () => {
        setAdded(true);
        if (onRefresh)
            onRefresh();
    }

    /**
     * Cambia o estado do elemento ou planificación, de favorito a non favorito ou viceversa
     */
    const changeFav = () => {
        setFav(!fav);
        if (onRefresh)
            onRefresh();
    }

    /**
     * Compoñente que conforma o botón de favorito
     * @returns {Component}
     */
    const HeartIcons = () => {
        return (
            fav ?
                <HeartIconButton onQuitFav={() => {
                    onQuitFav(changeFav, element, context, element.tipo == "Planificación" ? deleteElementoFav : undefined);
                }} />
                :
                <HeartOutlineIconButton onPressFav={() => {
                    onPressFav(changeFav, element, showModal, context, element.tipo == "Planificación" ? addElementoFav : undefined);
                }} />
        )
    }


    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={[styles.container, styles.background]}>
                <Stars style={styles.stars} value={opinions.valoracion} />
                {
                    opinions.count != undefined && opinions.status == 200 ?
                        <Text style={styles.valoracion}>{opinions.count} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }

                {
                    isRuta || isElementoRuta ?
                        element.id_actual_usuario || isElementoRuta ?
                            element.id_actual_usuario == element.id_usuario || isElementoRuta ?
                                <></>
                                :
                                <HeartIcons />
                            :
                            <HeartIcons />
                        :
                        <HeartIcons />

                }

                {
                    isElementoRuta ?
                        <></>
                        :
                        isRuta ?
                            <CalendarOutlineIconButton style={styles.rightIcons} _onPress={showOnPlanificacion} changeAdd={!isRuta ? changeAdd : undefined} addToPlanificacion={!isRuta ? context.addToPlanificacion : undefined} item={element} added={added} />
                            :
                            added ?
                                <CalendarPlusIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} /> :
                                <CalendarPlusOutlineIconButton style={styles.rightIcons} _onPress={showOnPlanificacion} changeAdd={!isRuta ? changeAdd : undefined} addToPlanificacion={!isRuta ? context.addToPlanificacion : undefined} item={element} added={added} />
                }
                {
                    isRuta ?
                        <></>
                        : <MapIconButton
                            showOnMap={showOnMap}
                            item={element}
                            style={styles.rightIcons} />
                }
            </View>
            <View style={styles.resumoContainer}>
                <Text style={styles.resumo}>{isElementoRuta ? element.resumo : isRuta ? element.comentario : element.resumo}</Text>
            </View>
            <ModalInicioSesion modal={modal} showModal={showModal} />
        </ScrollView>
    )
}

export default Resumo;