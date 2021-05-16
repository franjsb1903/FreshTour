import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import { styleTurismoItem as styles, stylesScroll } from '../../styles/styles'
import { HeartIconButton, HeartOutlineIconButton, MapIconButton, CalendarIconButton, CalendarOutlineIconButton, CalendarPlusIconButton, CalendarPlusOutlineIconButton } from '../../components/CustomIcons'
import Stars from '../../components/CustomStarsDisplay';
import ModalInicioSesion from '../../components/ModalInicioSesion';

import { onPressFav, onQuitFav } from '../../components/Common';
import { addElementoFav, deleteElementoFav } from '../../model/Planificador/Planificador';

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
    const showOnPlanificacion = props.showOnPlanificacion;
    const isElementoRuta = props.isElementoRuta;

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
        if (onRefresh)
            onRefresh();
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const HeartIcons = () => {
        return (
            fav ?
                <HeartIconButton onQuitFav={() => {
                    onQuitFav(changeFav, element, context, element.tipo == "Planificación" ? deleteElementoFav : undefined);
                }} />
                :
                <HeartOutlineIconButton onPressFav={() => {
                    onPressFav(changeFav, element, changeModal, context, element.tipo == "Planificación" ? addElementoFav : undefined);
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
                        <></>
                        : <HeartIcons />
                }
                {
                    isElementoRuta ?
                        <></>
                        :
                        isRuta ?
                            added ?
                                <CalendarIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} /> :
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