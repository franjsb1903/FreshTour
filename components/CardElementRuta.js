/**
 * @fileoverview Tarxeta que se emprega para amosar unha planificación compartida por un usuario na listaxe de rutas recomendadas, ou unha planificación gardada por un usuario sen chegar a compartila
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useEffect, useContext, Component } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

// modelo
import { addElementoFav, deleteElementoFav } from '../model/Planificador/Planificador';
import { deletePlanificacion, getElements as getElementsModel } from '../model/Planificador/Planificador';

// estilos
import { stylesCardElement as stylesCard } from '../styles/styles';

// compoñentes
import { ShareIconButtonBlack, SharedIconButtonBlack, CloseIconButton, EditIconButton, HeartIconButton, HeartOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import ModalInicioSesion from './ModalInicioSesion';
import ModalConfirmacion from './ModalConfirmacion';
import { onQuitFav, onPressFav, onShare } from './Common';

// Util
import { getToken, shouldDeleteToken } from '../Util/TokenUtil'

// contexto
import AppContext from '../context/AppContext';

/**
 * Compoñente que conforma a tarxeta que amosa unha planificación recomendada ou unha planificación gardada por un usuario
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementRuta = (props) => {

    const [shared, setShared] = useState(false);                                    // Estado que indica que a ruta está compartida (funcionalidade propia de planificación gardada polo usuario sen compartir)
    const [fav, setFav] = useState(false);                                          // Estado que indica se a ruta é favorita ou non
    const [modal, setModal] = useState(false);                                      // Estado que amosa ou oculta un modal
    const [confirmacion, setConfirmacion] = useState(false);                        // Estado que amosa ou oculta un modal de confirmación
    const [confirmacionShare, setConfirmacionShare] = useState(false);              // Estado que amosa ou oculta un modal de confirmación na compartición dunha planificación

    const planificacion = props.planificacion;                                      // Obxecto que reúne os datos da planificación concreta
    const isUser = props.isUser;                                                    // Boolean que indica que se a planificación se amosa no ámbito do usuario

    const context = useContext(AppContext);                                         // Constante que permite acceder ao contexto
    const navigation = useNavigation();                                             // Constante que permite empregar os métodos de navegación na aplicación

    /**
     * Cando se monta o compoñente, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setShared(planificacion.esta_compartida);
            setFav(planificacion.favorito);
        }

        return () => {
            mounted = false;
        }
    }, []);

    /**
     * Cambia o estado dun elemento, de favorito a non favorito ou viceversa
     */
    const changeFav = () => {
        setFav(!fav);
    }

    /**
     * Amosa ou oculta o modal de confirmación
     */
    const showConfirmacion = () => {
        setConfirmacion(!confirmacion);
    }

    /**
     * Amosa ou oculta o modal de confirmación de compartición
     */
    const showConfirmacionShare = () => {
        setConfirmacionShare(!confirmacionShare);
    }

    /**
     * Amosa ou oculta o modal
     */
    const changeModal = () => {
        setModal(!modal);
    }

    /**
     * Cambia o estado do elemento, de compartida a non compartida ou viceversa
     */
    const changeShare = () => {
        setShared(!shared);
    }

    /**
     * Eliminación dunha planificación
     */
    const onDelete = async () => {
        try {
            const token = await getToken('id_token');
            if (!token) {
                showMessage({
                    message: 'Non se pode identificar ao usuario',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return;
            }
            const response = await deletePlanificacion(planificacion.id, token);
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                    return;
                }
            }
            if(context.planificacion.id == planificacion.id) {                      // Se a planificación a eliminar coincide ca actualmente activa, bórrase esta última do planificador
                context.resetPlanificacion();
            }
            navigation.navigate("User");
        } catch (err) {
            console.log(err);
            showMessage({
                message: 'Erro eliminando a planificación',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
            return;
        }
    }

    /**
     * Edición dunha planificación
     */
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

    /**
     * Compoñente que conforma a icona de corazón, amosando unha ou outra en función de se é favorita ou non
     * @returns {Component}
     */
    const HeartIcons = () => {

        return (
            fav ?
                <>
                    <HeartIconButton onQuitFav={async () => {
                        await onQuitFav(changeFav, planificacion, context, deleteElementoFav);
                    }} />
                </>
                :
                <>
                    <HeartOutlineIconButton onPressFav={async () => {
                        await onPressFav(changeFav, planificacion, changeModal, context, addElementoFav);
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
                                planificacion.id_actual_usuario != planificacion.id_usuario ?   // No caso de que a planificación que se amosa nas rutas recomendadas sexa unha do usuario actual, non se mostrará a icona de corazón, para engadila como favorita
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
            }} text={shared ? "Ao deixar de compartir esta planificación, todos os usuarios deixarán de vela. Está seguro?" : "Ao compartir unha planificación, todos os usuarios poderán vela. Está seguro?"} />
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