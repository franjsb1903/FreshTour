import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import { getCountElement } from '../../../model/Opinions/Opinions';
import { styleTurismoItem as styles, stylesScroll } from '../../../styles/styles'
import { getGeoElementJson } from '../../../model/Turismo/Turismo';
import { HeartIconButton, MapIconButton, CalendarIconButton, CalendarOutlineIconButton } from '../../../components/CustomIcons'
import Stars from '../../../components/CustomStarsDisplay';

import AppContext from '../../../context/PlanificadorAppContext';

const Resumo = (props) => {

    const [countOpinions, setCountOpinions] = useState(0);
    const [added, setAdded] = useState(false);

    const context = useContext(AppContext);

    const element = props.element;
    const showOnMap = props.showOnMap;

    useEffect(() => {
        const updateCountOpinions = async () => {
            const count = await getCountElement(element.tipo, element.id);
            setCountOpinions(count);
        }
        setAdded(context.existItem(element.id));
        updateCountOpinions();
    }, []);

    const changeAdd = () => {
        setAdded(true);
    }

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            <View style={styles.container}>
                <Stars style={styles.stars} value={element.valoracion} />
                {
                    countOpinions != undefined && countOpinions.status == 200 ?
                        <Text style={styles.valoracion}>{countOpinions.count[0].count} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }
                <HeartIconButton style={styles.rightIcons} />
                {
                    added ?
                        <CalendarIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} /> :
                        <CalendarOutlineIconButton style={styles.rightIcons} changeAdd={changeAdd} addToPlanificacion={context.addToPlanificacion} item={element} added={added} />
                }
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