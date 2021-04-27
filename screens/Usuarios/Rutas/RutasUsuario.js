import React, { useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../../styles/styles';
import * as SecureStore from 'expo-secure-store';

import CardElementRuta from '../../../components/CardElementRuta';
import NoData from '../../../components/NoData'

const OpinionsUsuario = (props) => {

    const planificacions = props.route.params.planificacions;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                planificacions.length == 0 ?
                    <NoData />
                    :
                    planificacions.map(planificacion => {
                        return (
                            <CardElementRuta key={planificacion.id} planificacion={planificacion} isUser={true} />
                        )
                    })
            }
        </ScrollView>
    )
}

export default OpinionsUsuario;