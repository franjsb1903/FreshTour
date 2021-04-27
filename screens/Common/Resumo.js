import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import { getCountElement } from '../../model/Opinions/Opinions';
import { styleTurismoItem as styles, stylesScroll } from '../../styles/styles'
import { HeartIconButton, HeartOutlineIconButton, MapIconButton, CalendarIconButton, CalendarOutlineIconButton } from '../../components/CustomIcons'
import Stars from '../../components/CustomStarsDisplay';
import ModalInicioSesion from '../../components/ModalInicioSesion';
import * as SecureStore from 'expo-secure-store';

import { onPressFav, onQuitFav } from '../../components/Common'

import AppContext from '../../context/PlanificadorAppContext';

const Resumo = (props) => {

    const [added, setAdded] = useState(false);
    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);

    const context = useContext(AppContext);

    const element = props.element;
    const showOnMap = props.showOnMap;
    const opinions = props.opinions;
    const isRuta = props.isRuta;
    const onRefresh = props.onRefresh;

    const showModal = () => {
        setModal(!modal);
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (!isRuta)
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
        onRefresh();
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const HeartIcons = () => {
        return (
            fav ?
                <HeartIconButton onQuitFav={() => {
                    onQuitFav(changeFav, element, context);
                }} />
                :
                <HeartOutlineIconButton onPressFav={() => {
                    onPressFav(changeFav, element, changeModal, context);
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
                    isRuta ?
                        element.id_actual_usuario ?
                            element.id_actual_usuario != element.id_usuario ?
                                <HeartIcons />
                                :
                                <></>
                            : <HeartIcons />
                        : <HeartIcons />
                }
                {
                    added ?
                        <CalendarIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} /> :
                        <CalendarOutlineIconButton style={styles.rightIcons} changeAdd={isRuta ? changeAdd : undefined} addToPlanificacion={isRuta ? context.addToPlanificacion : undefined} item={element} added={added} />
                }
                {
                    isRuta ?
                        <></>
                        : <MapIconButton
                            showOnMap={isRuta ? showOnMap : undefined}
                            item={element}
                            style={styles.rightIcons} />
                }
            </View>
            <View style={styles.resumoContainer}>
                <Text style={styles.resumo}>{isRuta ? element.comentario : element.resumo}</Text>
            </View>
            <ModalInicioSesion modal={modal} showModal={showModal} />
        </ScrollView>
    )
}

export default Resumo;