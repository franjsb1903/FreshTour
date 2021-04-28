import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../../styles/styles';

import CardElementRuta from '../../../components/CardElementRuta';
import NoData from '../../../components/NoData';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

const RutasUsuario = (props) => {

    const planificacions = props.route.params.planificacions;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                planificacions.length == 0 ?
                    <NoData />
                    :
                    planificacions.map(planificacion => {
                        return (
                            <TouchableOpacity
                                key={planificacion.id}
                                onPress={() => props.navigation.navigate('RutasRecomendadasItem', {
                                    planificacion: planificacion
                                })}>
                                <CardElementRuta planificacion={planificacion} isUser={true} />
                            </TouchableOpacity>
                        )
                    })
            }
        </ScrollView>
    )
}

export default RutasUsuario;