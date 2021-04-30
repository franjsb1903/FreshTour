import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import { ChevronRightIcon } from './CustomIcons'

const CardElementInfo = (props) => {

    const data = props.data;
    const CardData = props.CardData;

    return (
        <Card containerStyle={{ borderWidth: 2, borderColor: "black" }}>
            <View style={styles.card}>
                <Text style={styles.title}>{data.label}</Text>
                {
                    CardData ? 
                    <CardData />
                    :
                    <></>
                }
                <ChevronRightIcon />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        flex: 1
    }
});

export default CardElementInfo;