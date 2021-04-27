import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, ToastAndroid, Alert, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import { stylesCardElement as stylesCard } from '../styles/styles';
import { ShareIconButtonBlack, SharedIconButtonBlack, CloseIconButton, EditIconButton, CalendarOutlineIconButton, HeartIconButton, HeartOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import { sharePlanificacion, deletePlanificacion } from '../model/Planificador/Planificador';
import ModalInicioSesion from './ModalInicioSesion';

import { onQuitFav, onPressFav } from './Common';

import AppContext from '../context/PlanificadorAppContext';

const CardElementRuta = (props) => {

    const [shared, setShared] = useState(false);
    const [fav, setFav] = useState(false);
    const [modal, setModal] = useState(false);

    const planificacion = props.planificacion;
    const isUser = props.isUser;

    const context = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setShared(planificacion.esta_compartida);
            setFav(planificacion.favorito);
        }

        return () => mounted = false;
    }, []);

    const changeFav = () => {
        setFav(!fav);
    }

    const showModal = () => {
        setModal(!modal);
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const onShare = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            if (!token) {
                ToastAndroid.show('Non se pode identificar ao usuario', ToastAndroid.SHORT);
                return;
            }
            const response = await sharePlanificacion(token, !shared, planificacion.id);
            if (response.status != 200) {
                if (Platform.OS == "android") {
                    ToastAndroid.show(response.message, ToastAndroid.SHORT);
                } else {
                    Alert.alert(response.message);
                }
            }
            else {
                setShared(!shared);
            }
        } catch (err) {
            console.error(err);
            if (Platform.OS == "android") {
                ToastAndroid.show('Erro na acción, tenteo de novo', ToastAndroid.SHORT);
            } else {
                Alert.alert('Erro na acción, tenteo de novo');
            }
        }
    }

    const onDelete = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            if (!token) {
                ToastAndroid.show('Non se pode identificar ao usuario', ToastAndroid.SHORT);
                return;
            }
            const response = await deletePlanificacion(planificacion.id, token);
            if (response.status != 200) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                return;
            }
            navigation.navigate("User");
        } catch (err) {
            ToastAndroid.show('Erro eliminando a planificación', ToastAndroid.SHORT);
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
                    <HeartIconButton onQuitFav={() => {
                        onQuitFav(changeFav, planificacion, context);
                    }} />
                    <CalendarOutlineIconButton />
                </>
                :
                <>
                    <HeartOutlineIconButton onPressFav={() => {
                        onPressFav(changeFav, planificacion, changeModal, context);
                    }} />
                    <CalendarOutlineIconButton />
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
                            <CloseIconButton closeIconOnPress={onDelete} />
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
                                    <SharedIconButtonBlack _onPress={onShare} />
                                    <EditIconButton onPress={onEdit} />
                                    <CalendarOutlineIconButton />
                                </>
                                :
                                <>
                                    <ShareIconButtonBlack _onPress={onShare} />
                                    <EditIconButton onPress={onEdit} />
                                    <CalendarOutlineIconButton />
                                </>
                            :
                            planificacion.id_actual_usuario ?
                                planificacion.id_actual_usuario != planificacion.id_usuario ?
                                    <HeartIcons />
                                    :
                                    <CalendarOutlineIconButton />
                                :
                                <HeartIcons />
                    }
                </View>
            </Card >
            <ModalInicioSesion modal={modal} showModal={showModal} />
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