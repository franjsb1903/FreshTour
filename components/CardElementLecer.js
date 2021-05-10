import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import Stars from './CustomStarsDisplay';
import { stylesCardElement as stylesCard } from '../styles/styles';
import { HeartIconButton, CalendarIconButton, CalendarOutlineIconButton, MapIconButton, HeartOutlineIconButton } from './CustomIcons';
import { onPressFav, onQuitFav } from './Common';
import ModalInicioSesion from './ModalInicioSesion';

import AppContext from '../context/PlanificadorAppContext';

const CardElementOpinion = (props) => {


    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);

    const element = props.element;
    const showOnMap = props.showOnMap;
    const addFav = props.addFav;
    const quitFav = props.quitFav;

    const context = useContext(AppContext);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFav(element.favorito);
        }

        return () => mounted = false;
    }, []);

    const changeFav = () => {
        setFav(!fav);
    }

    const changeModal = () => {
        setModal(!modal);
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
                    <Text style={styles.textBold}>Tipo: {element.sub_tag} </Text>
                </View>
                <View style={stylesCard.iconRow}>
                    {
                        fav ?
                            <HeartIconButton onQuitFav={async () => {
                                await onQuitFav(changeFav, element, context, quitFav);
                            }} />
                            :
                            <HeartOutlineIconButton onPressFav={async () => {
                                await onPressFav(changeFav, element, changeModal, context, addFav);
                            }} />
                    }
                    <MapIconButton onMapClick={() => {
                        showOnMap(element.id, element.tipo, element.sub_tag);
                    }} />
                </View>
            </View>
            <ModalInicioSesion modal={modal} showModal={changeModal} />
        </Card>
    )
}

const styles = StyleSheet.create({

});

export default CardElementOpinion;