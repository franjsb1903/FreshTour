/**
 * @fileoverview Tarxeta dun elemento turístico
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, useEffect, useState, Component } from 'react'
import { Text, ImageBackground, View } from 'react-native';
import { Card } from 'react-native-elements';

// Util
import { getImageUri } from '../Util/ImageUtil';

// compoñentes
import { HeartIconButton, MapIconButton, HeartOutlineIconButton, CalendarPlusIconButton, CalendarPlusOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import ModalInicioSesion from './ModalInicioSesion';
import { onPressFav, onQuitFav } from './Common'

// estilos
import { stylesCardElement as styles } from '../styles/styles';

// contexto
import AppContext from '../context/AppContext';

/**
 * Compoñente que conforma a tarxeta dun elemento turístico
 * @param {Object} props 
 * @returns {Component}
 */
const CardElement = (props) => {

    const [added, setAdded] = useState(false);                                      // Estado que controla se un elemento foi engadido á planificación ou non
    const [fav, setFav] = useState(false);                                          // Estado que controla se un elemento foi engadido como favorito ou non
    const [modal, setModal] = useState(false);                                      // Estado que controla a visualización ou non dun modal

    const context = useContext(AppContext);                                         // Constante a partir da cal se pode acceder ao contexto

    const isAdded = context.existItem;                                              // Función do contexto que determina se un elemento está engadido á planificación
    const item = props.item;                                                        // Obxecto que reúne a información do elemento turístico
    const isRuta = props.isRuta;                                                    // Boolean que identifica se se está no contexto dunha ruta recomendada
    const showOnMap = props.showOnMap;                                              // Función para xeolocalizar o elemento no mapa

    const localUri = getImageUri(item.imaxe);

    /**
     * Cando que constrúe o compoñente, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        const value = isAdded(item.id, item.tipo);
        if (mounted) {
            setAdded(value);
            setFav(item.favorito);
        }

        return () => mounted = false;
    }, [])

    /**
     * Cambia o estado do elemento, de non engadido á planificación a engadido
     */
    const changeAdd = () => {
        setAdded(true);
    }

    /**
     * Cambia o estado do elemento, de favorito a non favorito ou viceversa
     */
    const changeFav = () => {
        setFav(!fav);
    }

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <Card containerStyle={[localUri ? styles.imageCardStyle : styles.noImageCardStyle]}>
                {
                    localUri != undefined ?
                        <ImageBackground source={{ uri: localUri }}
                            style={styles.image}
                            imageStyle={{ opacity: 0.3 }}>
                            <View style={styles.rowView}>
                                <Card.Title style={styles.title}>{item.titulo}</Card.Title>
                                <Stars value={item.valoracion} />
                            </View>
                            <Card.Divider />
                            <Text style={styles.text}>{item.contexto}</Text>
                            <Card.Divider />
                            <View style={styles.rowView}>
                                <View style={{ flex: 1.3 }}>
                                    <Text style={styles.textBold}>Tipo: {item.tipo} </Text>
                                </View>
                                {
                                    isRuta ?
                                        <></>
                                        :
                                        <View style={styles.iconRow}>
                                            {
                                                fav ?
                                                    <HeartIconButton onQuitFav={async () => {
                                                        await onQuitFav(changeFav, item, context);
                                                    }} />
                                                    :
                                                    <HeartOutlineIconButton onPressFav={async () => {
                                                        await onPressFav(changeFav, item, showModal, context);
                                                    }} />
                                            }

                                            {
                                                added ?
                                                    <CalendarPlusIconButton changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={item} added={added} /> :
                                                    <CalendarPlusOutlineIconButton changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={item} added={added} />
                                            }
                                            <MapIconButton showOnMap={showOnMap} item={item} />
                                        </View>
                                }
                            </View>
                        </ImageBackground>
                        :
                        <View>
                            <View style={styles.rowView}>
                                <Card.Title style={styles.title}>{item.titulo}</Card.Title>
                                <Stars value={item.valoracion} />
                            </View>
                            <Card.Divider />
                            <Text style={styles.text}>{item.contexto}</Text>
                            <Card.Divider />
                            <View style={styles.rowView}>
                                <View style={{ flex: 1.3 }}>
                                    <Text style={styles.textBold}>Tipo: {item.tipo} </Text>
                                </View>
                                <View style={styles.iconRow}>
                                    <HeartIconButton />
                                    {
                                        added ?
                                            <CalendarPlusIconButton changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={item} added={added} /> :
                                            <CalendarPlusOutlineIconButton changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={item} added={added} />
                                    }
                                    <MapIconButton showOnMap={showOnMap} item={item} />
                                </View>
                            </View>
                        </View>
                }
            </Card >
            <ModalInicioSesion modal={modal} showModal={showModal} />
        </>
    )
}

export default CardElement;