import React, { useContext, useEffect, useState } from 'react'
import { Text, ImageBackground, View } from 'react-native';
import { Card } from 'react-native-elements';

import { getImageUri } from '../Util/ImageUtil';

import { HeartIconButton, MapIconButton, HeartOutlineIconButton, CalendarPlusIconButton, CalendarPlusOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import ModalInicioSesion from './ModalInicioSesion';

import { onPressFav, onQuitFav } from './Common'

import { stylesCardElement as styles } from '../styles/styles';

import AppContext from '../context/PlanificadorAppContext';

const CardElement = (props) => {

    const [added, setAdded] = useState(false);
    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);

    const context = useContext(AppContext);

    const isAdded = context.existItem;
    const item = props.item;
    const isRuta = props.isRuta;

    useEffect(() => {
        let mounted = true;

        const value = isAdded(item.id, item.tipo);
        if (mounted) {
            setAdded(value);
            setFav(item.favorito);
        }

        return () => mounted = false;
    }, [])

    const changeAdd = () => {
        setAdded(true);
    }

    const changeFav = () => {
        setFav(!fav);
    }

    const showModal = () => {
        setModal(!modal);
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const showOnMap = props.showOnMap;

    const localUri = getImageUri(item.imaxe);

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
                                                        await onPressFav(changeFav, item, changeModal, context);
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