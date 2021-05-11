import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylesScroll } from '../../styles/styles';
import CardElement from '../../components/CardElementInfo'
import ProgressBar from '../../components/ProgressBar';

import { stylesTurismoList as progress } from '../../styles/styles'

const LecerList = (props) => {

    const navigation = useNavigation();

    const updateItem = props.route.params.updateItem;

    const cardsData = [
        {
            id: 1,
            label: "Hostaleria",
            onPress: () => navigation.navigate("HostalariaList", {
                updateItem: updateItem
            })
        },
        {
            id: 2,
            label: "Actividades de ocio",
            onPress: () => console.log("O TEMPO")
        },
        {
            id: 3,
            label: "Outras actividades",
            data: [],
            onPress: () => navigation.navigate('InfoCommon')
        }
    ];

    return (
        loading ?
            <View style={progress.container}>
                <ProgressBar />
            </View> :
            <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
                {
                    cardsData.map(data => {
                        return (
                            <TouchableOpacity key={data.id} onPress={() => data.onPress()}>
                                <CardElement data={data} />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
    )
}

export default LecerList;