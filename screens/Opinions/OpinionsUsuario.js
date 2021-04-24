import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../styles/styles';

import CardElementOpinion from '../../components/CardElementOpinion'

const OpinionsUsuario = (props) => {

    const opinions = props.route.params.opinions;
    const usuario = props.route.params.usuario;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                opinions.length == 0 ?
                    <View>
                        <Text>Non realizou ningún comentario</Text>
                    </View>
                    :
                    opinions.map(opinion => {
                        return (
                            <CardElementOpinion key={opinion.id} opinion={opinion} usuario={usuario} isUsuario={true} />
                        )
                    })
            }
        </ScrollView>
    )
}

export default OpinionsUsuario;