import React, {useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';
import { stylesScroll, styleTurismoItem as styles } from '../../../styles/styles';
import { useNavigation } from '@react-navigation/native';

import Stars from '../../../components/CustomStarsDisplay';
import { CommentIcon } from '../../../components/CustomIcons';
import CardElementOpinion from '../../../components/CardElementOpinion'

const Opinions = (props) => {

    const [refreshing, setRefreshing] = useState(false);

    const opinions = props.opinions;
    const element = props.element;
    const onRefreshOpinions = props.onRefreshOpinions;
    const titulo = props.titulo;

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
                <TouchableOpacity style={[styles.container, { justifyContent: "flex-start" }]}
                    onPress={() => navigation.navigate('NewComment', {
                        element: element,
                        titulo: titulo
                    })}>
                    <CommentIcon />
                    <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Realizar un comentario</Text>
                </ TouchableOpacity>
            </View>
            {
                opinions.opinions.length == 0 ?
                    <View>
                        <Text>Realiza un primeiro comentario!</Text>
                    </View>
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