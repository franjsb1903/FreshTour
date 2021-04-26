import React, { useContext } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../../styles/styles';
import * as SecureStore from 'expo-secure-store';

import CardElementOpinion from '../../../components/CardElementOpinion';
import AppContext from '../../../context/PlanificadorAppContext';
import { noElementsStyle as noElementsStyles } from '../../../styles/styles';

const OpinionsUsuario = (props) => {

    const opinions = props.route.params.opinions;
    const usuario = props.route.params.usuario;

    const context = useContext(AppContext);

    const onEdit = (opinion) => {
        try {
            props.navigation.navigate('NewComment', {
                titulo: opinion.elemento,
                comment: opinion
            })
        } catch (err) {
            console.error(err);
        }
    }

    const onDelete = async (opinion) => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
            if(!token) {
                ToastAndroid.show('Non se pode identificar ao usuario', ToastAndroid.SHORT);
                return;
            }
            await context.deleteOpinion(token, opinion.id_elemento, opinion.tipo, opinion.id);
            props.navigation.navigate('User');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                opinions.length == 0 ?
                    <View style={noElementsStyles.noElementsContainer}>
                        <Text style={noElementsStyles.textNoElements}>Non realizou ningún comentario</Text>
                    </View>
                    :
                    opinions.map(opinion => {
                        return (
                            <CardElementOpinion key={opinion.id} opinion={opinion} usuario={usuario} isUsuario={true} onEdit={onEdit} onDelete={onDelete} />
                        )
                    })
            }
        </ScrollView>
    )
}

export default OpinionsUsuario;