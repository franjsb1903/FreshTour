import React from 'react';
import { Text, ImageBackground, Image, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import { getImageUri } from '../Util/ImageUtil';

const localUri = undefined;

const CardElement = (props) => {

    const item = props.item;

    const localUri = getImageUri(item.imaxe);

    return (
        <Card pointerEvents="none" containerStyle={[localUri ? styles.imageCardStyle : styles.noImageCardStyle]}>
            {
                localUri != undefined ?
                    <ImageBackground source={{ uri: localUri }}
                        style={styles.image}
                        imageStyle={{ opacity: 0.3 }}>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Divider />
                        <Text style={ styles.text }> {item.contexto} </Text>
                    </ImageBackground>
                    :
                    <View>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Divider />
                        <Text style={ styles.text }> {item.contexto} </Text>
                    </View>
            }
        </Card>
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
        color: "#000000"
    },
    noImageCardStyle: {
        padding: 15
    }
})

export default CardElement;