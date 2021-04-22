import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import { getCountElement } from '../../../model/Opinions/Opinions';
import { styleTurismoItem as styles, stylesScroll } from '../../../styles/styles'
import { HeartIconButton, HeartOutlineIconButton, MapIconButton, CalendarIconButton, CalendarOutlineIconButton } from '../../../components/CustomIcons'
import Stars from '../../../components/CustomStarsDisplay';
import ModalInicioSesion from '../../../components/ModalInicioSesion';
import * as SecureStore from 'expo-secure-store';

import AppContext from '../../../context/PlanificadorAppContext';

const Resumo = (props) => {

    const [added, setAdded] = useState(false);
    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);

    const context = useContext(AppContext);

    const element = props.element;
    const showOnMap = props.showOnMap;
    const opinions = props.opinions;

    const showModal = () => {
        setModal(!modal);
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setAdded(context.existItem(element.id));
            setFav(element.favorito);
        }

        return () => mounted = false;
    }, []);

    const changeAdd = () => {
        setAdded(true);
    }

    const changeFav = () => {
        setFav(!fav);
    }

    const onPressFav = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            if (!token) {
                setModal(true);
            } else {
                await context.addElementoFav(token, changeFav, element);
            }
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro engadindo elemento como favorito', ToastAndroid.show);
        }
    }

    const onQuitFav = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            await context.deleteElementoFav(token, changeFav, element);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro quitando elemento como favorito', ToastAndroid.show);
        }
    }

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={[styles.container, styles.background]}>
                <Stars style={styles.stars} value={opinions.valoracion ? opinions.valoracion : 0} />
                {
                    opinions.count != undefined && opinions.status == 200 ?
                        <Text style={styles.valoracion}>{opinions.count} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }
                {
                    fav ?
                        <HeartIconButton onQuitFav={onQuitFav} />
                        :
                        <HeartOutlineIconButton onPressFav={onPressFav} />
                }
                {
                    added ?
                        <CalendarIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} /> :
                        <CalendarOutlineIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} />
                }
                <MapIconButton
                    showOnMap={showOnMap}
                    item={element}
                    style={styles.rightIcons} />
            </View>
            <View style={styles.resumoContainer}>
                <Text style={styles.resumo}>{element.resumo}</Text>
            </View>
            <ModalInicioSesion modal={modal} showModal={showModal} />
        </ScrollView>
    )
}

export default Resumo;