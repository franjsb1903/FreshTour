import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ToastAndroid, Alert, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { stylesCardElement as stylesCard } from '../styles/styles';
import { ShareIconButtonBlack, SharedIconButtonBlack, CloseIconButton, EditIconButton, CalendarOutlineIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';
import { sharePlanificacion } from '../model/Planificador/Planificador'

const CardElementRuta = (props) => {

    const [shared, setShared] = useState(false);
    const planificacion = props.planificacion;
    const isUser = props.isUser;

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setShared(planificacion.esta_compartida);
        }

        return () => mounted = false;
    }, []);

    const onShare = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
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

    return (
        <Card containerStyle={styles.container}>
            <View style={stylesCard.rowView}>
                <Card.Title style={stylesCard.title}>{planificacion.titulo}</Card.Title>
                <Stars value={planificacion.valoracion} />
                <CloseIconButton />
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
                {
                    isUser ?
                        shared ?
                            <>
                                <SharedIconButtonBlack _onPress={onShare} />
                                <EditIconButton />
                                <CalendarOutlineIconButton />
                            </>
                            :
                            <>
                                <ShareIconButtonBlack _onPress={onShare} />
                                <EditIconButton />
                                <CalendarOutlineIconButton />
                            </>
                        :
                        <CalendarOutlineIconButton />
                }
            </View>
        </Card >
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