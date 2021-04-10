import React from 'react'
import { Text, ImageBackground, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import { IconButton } from 'react-native-paper';

import { getImageUri } from '../Util/ImageUtil';

import { HeartIconButton, CalendarIconButton, MapIconButton } from './CustomIcon'
import Stars from './CustomStarsDisplay'



const CardElement = (props) => {

    const item = props.item;

    const showOnMap = props.showOnMap;

    const localUri = getImageUri(item.imaxe);

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
                                <CalendarIconButton />
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

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    imageCardStyle: {
        padding: 0
    },
    text: {
        textAlign: "justify",
        color: "#000000",
        fontSize: 15
    },
    textBold: {
        textAlign: "justify",
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15
    },
    noImageCardStyle: {
        padding: 15
    },
    rowView: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        flex: 1,
        fontSize: 20
    },
    iconRow: {
        flex: 1,
        flexDirection: "row"
    }
})

export default CardElement;