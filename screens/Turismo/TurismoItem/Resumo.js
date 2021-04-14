import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { getCountElement } from '../../../model/Opinions/Opinions';
import { styleTurismoItem as styles, stylesScroll, flexRowContainer as container } from '../../../styles/styles'

import { HeartIconButton, MapIconButton, CalendarIconButton } from '../../../components/CustomIcons'
import Stars from '../../../components/CustomStarsDisplay';

const Resumo = (props) => {

    const [countOpinions, setCountOpinions] = useState(0);

    const element = props.element;
    const showOnMap = props.showOnMap;

    useEffect(() => {
        const updateCountOpinions = async () => {
            const count = await getCountElement(element.tipo, element.id);
            if (count == undefined) {
                setCountOpinions(undefined);
                return;
            } 
            setCountOpinions(count[0].count);
        }
        updateCountOpinions();
    }, []);

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={container.container}>
                <Stars style={styles.stars} value={element.valoracion} />
                {
                    countOpinions != undefined ?
                        <Text style={styles.valoracion}>{countOpinions} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }
                <HeartIconButton style={styles.rightIcons} />
                <CalendarIconButton
                    style={styles.rightIcons} />
                <MapIconButton
                    showOnMap={showOnMap}
                    item={element}
                    style={styles.rightIcons} />
            </View>
            <View style={styles.resumoContainer}>
                <Text style={styles.resumo}>{element.resumo}</Text>
            </View>
        </ScrollView>
    )
}

export default Resumo;