import React from 'react';
import { Text, ImageBackground, Image, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import { getImageUri } from '../Util/ImageUtil';

const CardElement = (props) => {

    const item = props.item;

    var localUri = getImageUri(item.imaxe);

    return (
        <Card pointerEvents="none">
            {
                localUri != undefined ?
                    <ImageBackground source={{ uri: localUri }} 
                    style={styles.image}
                    imageStyle={{ opacity: 0.3 }}>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Divider />
                        <Text style={{ textAlign: "justify" }}> {item.contexto} </Text>
                    </ImageBackground>
                    :
                    <View>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Divider />
                        <Text> {item.contexto} </Text>
                    </View>
            }
        </Card>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

})

export default CardElement;