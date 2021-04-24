import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import { AvatarIcon } from './CustomIcons'
import Stars from './CustomStarsDisplay';

const CardElementOpinion = (props) => {

    const opinion = props.opinion;

    return (
        <Card>
            <View style={styles.header}>
                <AvatarIcon size={40} style={{ flex: 1 }} />
                <Text style={{ flex: 2, fontSize: 18, fontWeight: "bold" }}>{opinion.usuario}</Text>
                <Stars style={{ flex: 1 }} value={opinion.valoracion} />
            </View>
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>{opinion.titulo}</Text>
                <Text style={{ fontSize: 20, textAlign: "justify" }}>{opinion.comentario}</Text>
            </View>
            <View style={styles.dataContanier}>
                <Text style={{ justifyContent: "flex-end", flex: 0 }}>{opinion.data}</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    textContainer: {
        alignItems: "flex-start",
        flexDirection: "column",
        padding: 20
    },
    dataContanier: {
        flexDirection: "row",
        justifyContent: "flex-end"
    }
})

export default CardElementOpinion;