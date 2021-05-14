import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { stylesCardElement as stylesCard } from '../styles/styles';
import { ShareIconButtonBlack, SharedIconButtonBlack, CloseIconButton, EditIconButton, CalendarOutlineIconButton, HeartIconButton, HeartOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import { deletePlanificacion, getElements as getElementsModel } from '../model/Planificador/Planificador';
import ModalInicioSesion from './ModalInicioSesion';
import ModalConfirmacion from './ModalConfirmacion';

import { onQuitFav, onPressFav, onShare } from './Common';

import { getToken, shouldDeleteToken } from '../Util/TokenUtil'

import AppContext from '../context/PlanificadorAppContext';

const CardElementRuta = (props) => {

    const [shared, setShared] = useState(false);
    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);
    const [confirmacionShare, setConfirmacionShare] = useState(false);
    const [elements, setElements] = useState([]);

    const planificacion = props.planificacion;
    const isUser = props.isUser;

    const context = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => {
        let mounted = true;

        const abortController = new AbortController();
        const signal = abortController.signal;

        const getElements = async () => {
            try {
                const elements = await getElementsModel(planificacion.id, signal);
                if (elements.status != 200) {
                    showMessage({
                        message: elements.message,
                        type: "danger"
                    });
                    return;
                }
                if (mounted) {
                    setElements(elements.elementos);
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        if (mounted) {
            setShared(planificacion.esta_compartida);
            setFav(planificacion.favorito);
            //getElements();
        }

        return () => {
            mounted = false;
            abortController.abort();
        }
    }, []);

    const changeFav = () => {
        setFav(!fav);
    }

    const showConfirmacion = () => {
        setConfirmacion(!confirmacion);
    }

    const showConfirmacionShare = () => {
        setConfirmacionShare(!confirmacionShare);
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const changeShare = () => {
        setShared(!shared);
    }

    const showOnPlanificacion = async () => {
        try {
            await context.addElementsToPlanificacion(elements, planificacion, navigation);
        } catch (err) {
            console.error(err.message);
            showMessage({
                message: 'Erro na planificación',
                type: "danger"
            });
        }
    }

    const onDelete = async () => {
        try {
            const token = await getToken('id_token');
            if (!token) {
                showMessage({
                    message: 'Non se pode identificar ao usuario',
                    type: "danger"
                });
                return;
            }
            const response = await deletePlanificacion(planificacion.id, token);
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger"
                    });
                    return;
                }
            }
            navigation.navigate("User");
        } catch (err) {
            showMessage({
                message: 'Erro eliminando a planificación',
                type: "danger"
            });
            return;
        }
    }

    const onEdit = async () => {
        try {
            navigation.navigate('GardarPlanificacion', {
                titulo: planificacion.titulo,
                edit: planificacion
            })
        } catch (err) {
            console.error(err);
        }
    }

    const HeartIcons = () => {

        return (
            fav ?
                <>
                    <HeartIconButton onQuitFav={async () => {
                        await onQuitFav(changeFav, planificacion, context);
                    }} />
                </>
                :
                <>
                    <HeartOutlineIconButton onPressFav={async () => {
                        await onPressFav(changeFav, planificacion, changeModal, context);
                    }} />
                </>
        )
    }

    return (
        <>
            <Card containerStyle={styles.container}>
                <View style={stylesCard.rowView}>
                    <Card.Title style={stylesCard.title}>{planificacion.titulo}</Card.Title>
                    {
                        isUser ?
                            <CloseIconButton closeIconOnPress={showConfirmacion} />
                            :
                            <></>
                    }
                </View>
                <Card.Divider />
                <View style={stylesCard.rowView}>
                    <View style={stylesCard.columnView}>
                        <Text style={[stylesCard.textBold, { fontStyle: "italic" }]}>Distancia</Text>
                        <Text style={stylesCard.text}>{planificacion.distancia} km</Text>
                    </View>
                    <View style={stylesCard.columnView}>
                        <Text style={[stylesCard.textBold, { fontStyle: "italic" }]}>Tempo total</Text>
                        <Text style={stylesCard.text}>{Math.round(planificacion.tempo_ruta / 60) + planificacion.tempo_visita > 60 ?
                            <Text>{Number((planificacion.tempo_ruta / 3600 + planificacion.tempo_visita / 60).toFixed(1))} h</Text> :
                            <Text>{Math.round(planificacion.tempo_ruta / 60) + planificacion.tempo_visita} min</Text>}</Text>
                    </View>
                    <View style={stylesCard.columnView}>
                        <Text style={[stylesCard.textBold, { fontStyle: "italic" }]}>Tempo visita</Text>
                        <Text style={stylesCard.text}>{planificacion.tempo_visita > 60 ? <Text>{Number((planificacion.tempo_visita / 60).toFixed(1))} h</Text> : <Text>{Math.round(planificacion.tempo_visita)} min</Text>}</Text>
                    </View>
                    <View style={stylesCard.columnView}>
                        <Text style={[stylesCard.textBold, { fontStyle: "italic" }]}>Tempo ruta</Text>
                        <Text style={stylesCard.text}>{(planificacion.tempo_ruta / 60) > 60 ? <Text>{Number((planificacion.tempo_ruta / 3600).toFixed(1))} h</Text>
                            : <Text>{Math.round(planificacion.tempo_ruta / 60)} min</Text>}</Text>
                    </View>
                </View>
                <Card.Divider />
                <View style={{ padding: 10 }}>
                    <Text style={stylesCard.text}>{planificacion.comentario}</Text>
                </View>
                <Card.Divider />
                <View style={[stylesCard.rowView, { justifyContent: "flex-end" }]}>
                    <Stars value={planificacion.valoracion} />
                    <View style={{ flex: 1 }}></View>
                    {
                        isUser ?
                            shared ?
                                <>
                                    <SharedIconButtonBlack _onPress={() => {
                                        showConfirmacionShare();
                                    }} />
                                    <EditIconButton onPress={onEdit} />
                                </>
                                :
                                <>
                                    <ShareIconButtonBlack _onPress={() => {
                                        showConfirmacionShare();
                                    }} />
                                    <EditIconButton onPress={onEdit} />
                                </>
                            :
                            planificacion.id_actual_usuario ?
                                planificacion.id_actual_usuario != planificacion.id_usuario ?
                                    <HeartIcons />
                                    :
                                    <></>
                                :
                                <HeartIcons />
                    }
                </View>
                <Card.Divider />
                <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>{planificacion.usuario}</Text>
            </Card >
            <ModalInicioSesion modal={modal} showModal={changeModal} />
            <ModalConfirmacion modal={confirmacion} showModal={showConfirmacion} confirm={onDelete} text={"A planificación borrarase para sempre, está seguro?"} />
            <ModalConfirmacion modal={confirmacionShare} showModal={showConfirmacionShare} confirm={() => {
                onShare(changeShare, shared, planificacion);
            }} text={"Ao compartir unha planificación, todos os usuarios poderán vela. Está seguro?"} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 10,
        backgroundColor: "#fff"
    }
});

export default CardElementRuta;