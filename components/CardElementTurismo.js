import React, { useContext, useEffect, useState } from 'react'
import { Text, ImageBackground, View, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';

import { getImageUri } from '../Util/ImageUtil';
import * as SecureStore from 'expo-secure-store';

import { HeartIconButton, CalendarIconButton, CalendarOutlineIconButton, MapIconButton, HeartOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import ModalInicioSesion from './ModalInicioSesion';

import { stylesCardElement as styles, modal as modalStyle } from '../styles/styles';

import AppContext from '../context/PlanificadorAppContext';

const CardElement = (props) => {

    const [added, setAdded] = useState(false);
    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);

    const context = useContext(AppContext);

    const isAdded = context.existItem;
    const item = props.item;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const value = isAdded(item.id);
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

    const onPressFav = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            if (!token) {
                setModal(true);
            } else {
                await context.addElementoFav(token, changeFav, item);
            }
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro engadindo elemento como favorito', ToastAndroid.show);
        }
    }

    const onQuitFav = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            await context.deleteElementoFav(token, changeFav, item);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro quitando elemento como favorito', ToastAndroid.show);
        }
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
                                <View style={styles.iconRow}>
                                    {
                                        fav ?
                                            <HeartIconButton onQuitFav={onQuitFav} />
                                            :
                                            <HeartOutlineIconButton onPressFav={onPressFav} />
                                    }

                                    {
                                        added ?
                                            <CalendarIconButton changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={item} added={added} /> :
                                            <CalendarOutlineIconButton changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={item} added={added} />
                                    }
                                    <MapIconButton showOnMap={showOnMap} item={item} />
                                </View>
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
                                            <CalendarIconButton changeAdd={changeAdd} addToPlanificacion={addToPlanificacion} item={item} /> :
                                            <CalendarOutlineIconButton changeAdd={changeAdd} addToPlanificacion={addToPlanificacion} item={item} />
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