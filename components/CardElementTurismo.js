import React, { useContext, useEffect, useState } from 'react'
import { Text, ImageBackground, View, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';

import { getImageUri } from '../Util/ImageUtil';

import { HeartIconButton, CalendarIconButton, CalendarOutlineIconButton, MapIconButton } from './CustomIcons';
import Stars from './CustomStarsDisplay';

import { stylesCardElement as styles } from '../styles/styles'

import AppContext from './PlanificadorAppContext';

const CardElement = (props) => {

    const [added, setAdded] = useState(false)

    const context = useContext(AppContext);

    const isAdded = context.existItem;
    const item = props.item;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const value = isAdded(item.id);
            setAdded(value);
        }
        return () => mounted = false;
    }, [])

    const changeAdd = () => {
        setAdded(true);
    }

    const showOnMap = props.showOnMap;
    const getGeoElementJson = props.getGeoElementJson;

    const localUri = getImageUri(item.imaxe);

    const addToPlanificacion = async (id) => {
        try {
            const data = await getGeoElementJson(id);
            if (data == undefined) {
                ToastAndroid.show('Elemento non engadido', ToastAndroid.SHORT);
                return;
            }
            context.addItem(data);
        } catch (err) {
            console.log(err);
            ToastAndroid.show('Erro de conexión', ToastAndroid.SHORT);
        }
    }

    return (
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
                                <HeartIconButton />
                                {
                                    added ?
                                        <CalendarIconButton changeAdd={changeAdd} addToPlanificacion={addToPlanificacion} item={item} /> :
                                        <CalendarOutlineIconButton changeAdd={changeAdd} addToPlanificacion={addToPlanificacion} item={item} />
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
                                <CalendarIconButton />
                                <MapIconButton showOnMap={showOnMap} item={item} />
                            </View>
                        </View>
                    </View>
            }
        </Card >
    )
}

export default CardElement;