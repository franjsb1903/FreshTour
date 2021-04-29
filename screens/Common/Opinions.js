import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';

import Stars from '../../components/CustomStarsDisplay';
import { CommentIcon } from '../../components/CustomIcons';
import CardElementOpinion from '../../components/CardElementOpinion';
import { noElementsStyle as noElementsStyles } from '../../styles/styles';

const Opinions = (props) => {

    const [refreshing, setRefreshing] = useState(false);

    const opinions = props.opinions;
    const element = props.element;
    const onRefreshOpinions = props.onRefreshOpinions;
    const titulo = props.titulo;
    const isPlanificacion = props.isPlanificacion;

    const navigation = useNavigation();

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            onRefreshOpinions();
            setRefreshing(false);
        } catch (err) {
            ToastAndroid.show('Erro na actualización', ToastAndroid.SHORT);
        }
    }

    const ButtonOpinion = () => (
        <TouchableOpacity style={[styles.container, { justifyContent: "flex-start" }]}
            onPress={() => navigation.navigate('NewComment', {
                element: element,
                titulo: titulo,
                isPlanificacion: isPlanificacion,
                onRefreshOpinions: onRefreshOpinions
            })}>
            <CommentIcon />
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Realizar un comentario</Text>
        </ TouchableOpacity>
    )

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={[styles.container, styles.background, { justifyContent: "flex-start" }]}>
                <Stars style={styles.stars} value={opinions.valoracion} />
                {
                    opinions.count != undefined && opinions.status == 200 ?
                        <Text style={styles.valoracion}>{opinions.count} valoracións</Text>
                        :
                        <Text style={styles.valoracion}></Text>
                }
            </View>
            <View>
                {
                    isPlanificacion ?
                        element.id_actual_usuario ?
                            element.id_actual_usuario != element.id_usuario ?
                                <></>
                                : <ButtonOpinion />
                            : <ButtonOpinion />
                        :
                        <ButtonOpinion />
                }
            </View>
            {
                opinions.opinions.length == 0 ?
                    <></>
                    :
                    opinions.opinions.map(opinion => {
                        return (
                            <CardElementOpinion key={opinion.id} opinion={opinion} />
                        )
                    })
            }
        </ScrollView>
    )
}

export default Opinions;