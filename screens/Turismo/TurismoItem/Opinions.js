import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../../styles/styles';

import Stars from '../../../components/CustomStarsDisplay';
import { CommentIcon } from '../../../components/CustomIcons'

const Opinions = (props) => {

    const opinions = props.opinions;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={[styles.container, styles.background, { justifyContent: "flex-start" }]}>
                <Stars style={styles.stars} value={opinions.valoracion ? opinions.valoracion : 0} />
                {
                    opinions.count != undefined && opinions.status == 200 ?
                        <Text style={styles.valoracion}>{opinions.count} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }
            </View>
            <View>
                <TouchableOpacity style={[styles.container, { justifyContent: "flex-start" }]}>
                    <CommentIcon />
                    <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Realizar un comentario</Text>
                </ TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Opinions;