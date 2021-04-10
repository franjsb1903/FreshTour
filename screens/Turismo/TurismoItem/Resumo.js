import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { getCountElement } from '../../../model/Opinions/Opinions';
import properties from '../../../properties/properties_expo'
import { styleTurismoItem as styles } from '../../../styles/styles'

import { HeartIconButton, MapIconButton, CalendarIconButton } from '../../../components/CustomIcon'
import Stars from '../../../components/CustomStarsDisplay';

const Resumo = (props) => {

    const [countOpinions, setCountOpinions] = useState(0);

    const element = props.element;
    const showOnMap = props.showOnMap;

    useEffect(() => {
        const updateCountOpinions = async () => {
            const count = await getCountElement(element.tipo, element.id);
            setCountOpinions(count[0].count);
        }
        updateCountOpinions();
    }, [])

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.resumoContainer}>
                <Stars style={styles.resumoStars} value={element.valoracion} />
                <Text style={styles.resumoText}>{countOpinions} valoracións</Text>
                <HeartIconButton style={styles.resumoIconElements} />
                <CalendarIconButton style={styles.resumoIconElements} />
                <MapIconButton
                    showOnMap={showOnMap}
                    item={element} 
                    style={styles.resumoIconElements}/>
            </View>
            <View style={styles.resumoContainerText}>
                <Text style={styles.resumo}>{element.resumo}</Text>
            </View>
        </ScrollView>
    )
}

export default Resumo;