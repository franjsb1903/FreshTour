/**
 * @fileoverview Tarxeta que se emprega na listaxe de elementos de lecer (actividades de lecer e lugares de hospedaxe)
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useEffect, useContext, Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';

// compoñentes
import Stars from './CustomStarsDisplay';
import { stylesCardElement as stylesCard } from '../styles/styles';
import { HeartIconButton, CalendarPlusIconButton, CalendarPlusOutlineIconButton, MapIconButton, HeartOutlineIconButton } from './CustomIcons';
import { onPressFav, onQuitFav } from './Common';
import ModalInicioSesion from './ModalInicioSesion';

// contexto
import AppContext from '../context/AppContext';

/**
 * Compoñente que conforma a tarxeta a empregar na listaxe de elementos de lecer e hospedaxe
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementLecer = (props) => {

    const [added, setAdded] = useState(false);              // Estado que indica se un elemento xa foi engadido á planificación
    const [fav, setFav] = useState(false);                  // Estado que indica se un elemento é favorito do usuario
    const [modal, setModal] = useState(false);              // Estado que controla a visualización dun modal
    const [loading, setLoading] = useState(false);

    const element = props.element;                          // Obxecto que agrupa a información do elemento asociado á tarxeta
    const showOnMap = props.showOnMap;                      // Función que permite xeolocalizar un elemento no mapa
    const addFav = props.addFav;                            // Función que permite engadir o elemento como favorito
    const quitFav = props.quitFav;                          // Función que permite quitar o elemento como favorito
    const isRuta = props.isRuta;                            // Boolean que indica se a tarxeta está sendo amosada no contexto dunha ruta

    const context = useContext(AppContext);                 // Constante sobre a que se accede ao contexto da aplicación

    const isAdded = context.existItem;                      // Función do contexto que indica se un elemento está engadido á planificación

    /**
     * Cando se monta o compoñente, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        const value = isAdded(element.id, element.tipo);    // Boolean que indican se o elemento está engadido á planificación
        if (mounted) {
            setAdded(value);
            setFav(element.favorito);
        }

        return () => mounted = false;
    }, []);

    /**
     * Cambia o estado dun elemento, de favorito a non favorito ou viceversa
     */
    const changeFav = () => {
        setFav(!fav);
    }

    /**
     * Amosa ou oculta o modal
     */
    const changeModal = () => {
        setModal(!modal);
    }

    /**
     * Cambia o estado o elemento, de non engadido á planificación a engadido
     */
    const changeAdd = () => {
        setAdded(true);
        setLoading(false);
    }

    const changeLoading = () => {
        setLoading(!loading);
    }

    return (
        <Card containerStyle={{ padding: 25 }}>
            <View style={stylesCard.rowView}>
                <Card.Title style={stylesCard.title}>{element.titulo ? element.titulo : element.sub_tag}</Card.Title>
                <Stars value={element.valoracion} />
            </View>
            <Card.Divider />
            <View style={stylesCard.rowView}>
                <View style={{ flex: 1.3 }}>
                    <Text style={stylesCard.textBold}>Tipo: {element.sub_tag} </Text>
                </View>
                {
                    isRuta ?                                    // Se está no contexto da ruta, non se amosa nada
                        <></>
                        :
                        <View style={stylesCard.iconRow}>
                            {
                                fav ?                           // Se o elemento é favorito do usuario ou non, amósase unha icona ou outra
                                    <HeartIconButton onQuitFav={async () => {
                                        await onQuitFav(changeFav, element, context, quitFav);
                                    }} />
                                    :
                                    <HeartOutlineIconButton onPressFav={async () => {
                                        await onPressFav(changeFav, element, changeModal, context, addFav);
                                    }} />
                            }
                            {
                                !loading ?
                                added ?
                                <CalendarPlusIconButton addToPlanificacion={context.addToPlanificacion} item={element} added={added} changeAdd={changeAdd} /> :
                                <CalendarPlusOutlineIconButton addToPlanificacion={context.addToPlanificacion} item={element} added={added} changeAdd={changeAdd} loading={changeLoading} />
                                :
                                <ActivityIndicator size="large" color="#EA0000" />
                            }
                            <MapIconButton onMapClick={async () => {
                                await showOnMap(element.id, element.tipo, element.sub_tag);
                            }} />
                        </View>
                }
            </View>
            <ModalInicioSesion modal={modal} showModal={changeModal} />
        </Card>
    )
}

export default CardElementLecer;