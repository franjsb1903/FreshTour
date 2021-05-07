import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import Stars from './CustomStarsDisplay';
import { stylesCardElement as stylesCard } from '../styles/styles';
import { HeartIconButton, CalendarIconButton, CalendarOutlineIconButton, MapIconButton, HeartOutlineIconButton } from './CustomIcons';

const CardElementOpinion = (props) => {

    const element = props.element;
    const showOnMap = props.showOnMap;

    return (
        <Card containerStyle={{ padding: 25 }}>
            <View style={stylesCard.rowView}>
                <Card.Title style={stylesCard.title}>{element.titulo ? element.titulo : element.sub_tag}</Card.Title>
                <Stars value={element.valoracion} />
            </View>
            <Card.Divider />
            <View style={stylesCard.rowView}>
                <View style={{ flex: 1.3 }}>
                    <Text style={styles.textBold}>Tipo: {element.sub_tag} </Text>
                </View>
                <View style={styles.iconRow}>
                    <MapIconButton onMapClick={() => {
                        showOnMap(element.id, element.tipo, element.sub_tag);
                    }} />
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({

});

export default CardElementOpinion;