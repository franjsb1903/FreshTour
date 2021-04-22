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
                <AvatarIcon />
                <Text>{opinion.usuario}</Text>
                <Stars />
                <Text>{opinion.data}</Text>
            </View>
        </Card >
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row"
    }
})

export default CardElementOpinion;