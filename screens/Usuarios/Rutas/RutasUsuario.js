import React, { useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../../styles/styles';
import * as SecureStore from 'expo-secure-store';

import CardElementRuta from '../../../components/CardElementRuta';
import AppContext from '../../../context/PlanificadorAppContext';
import { noElementsStyle as noElementsStyles } from '../../../styles/styles';

const OpinionsUsuario = (props) => {

    const planificacions = props.route.params.planificacions;
    const usuario = props.route.params.usuario;

    const context = useContext(AppContext);

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                planificacions.length == 0 ?
                    <View style={noElementsStyles.noElementsContainer}>
                        <Text style={noElementsStyles.textNoElements}>Non ten gardada ningunha planificación</Text>
                    </View>
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