import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { stylesScroll } from '../../styles/styles';
import CardElement from '../../components/CardElementInfo'
import ProgressBar from '../../components/ProgressBar';

import { getCovidData } from '../../model/Info/Info'
import { stylesTurismoList as progress } from '../../styles/styles'

const Info = () => {

    const [data, setData] = useState({
        covid: {}
    })
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const date = yyyy + "-" + mm + "-" + dd;

    useEffect(() => {
        let mounted = true;

        const abortController = new AbortController();
        const signal = abortController.signal;

        const getData = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                }
                const data = await getCovidData(signal);
                if (mounted) {
                    setData({
                        covid: data
                    });
                }
                if (mounted) {
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setLoading(false);
                }
                showMessage({
                    message: 'Erro de conexión',
                    type: "danger"
                });
            }
        }

        getData();

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, [isFocused]);

    const navigation = useNavigation();

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu odio et dui gravida faucibus. Praesent vel efficitur augue, ac cursus ligula. Praesent nec est tortor. Pellentesque malesuada auctor sapien, vel elementum metus pharetra id. Phasellus at eros sed ligula convallis laoreet. Proin in quam vitae tortor suscipit malesuada quis vitae ligula. Etiam eleifend laoreet aliquam. Donec auctor efficitur egestas. Cras quis finibus risus. Sed bibendum ante ut velit faucibus, eu pellentesque tortor ornare. Sed aliquet blandit ligula, sit amet semper orci ultrices ac. Morbi tempus non massa sed faucibus. Phasellus vitae auctor arcu. Etiam dictum, augue eu accumsan lobortis, sapien quam rutrum sapien, nec rutrum massa nibh quis lorem.Donec venenatis auctor iaculis.Sed sed accumsan odio.Suspendisse tincidunt pretium mattis.Praesent euismod tempus risus non eleifend.Interdum et malesuada fames ac ante ipsum primis in faucibus.Quisque bibendum tincidunt arcu a consequat.Etiam lacinia urna ornare magna commodo ultrices.Donec sollicitudin odio in pharetra dictum."


    const DataCovidCard = () => {

        var datos = undefined;
        if (data.covid.dates != undefined) {
            datos = data.covid.dates[date].countries.Spain.regions[0].sub_regions[0];
        }

        return (
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.title}>Nivel</Text>
                    <Text style={{ fontSize: 18, color: "#ffd700" }}>Medio</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.title}>Novos</Text>
                    {
                        datos ?
                            <Text style={{ fontSize: 18 }}>{datos.today_new_confirmed}</Text>
                            :
                            <></>
                    }
                </View>
            </View>
        )
    };

    const cardsData = [
        {
            id: 1,
            label: "COVID",
            data: data.covid,
            CardData: DataCovidCard,
            onPress: () => navigation.navigate("CovidScreen", {
                data: data.covid.dates[date].countries.Spain.regions[0].sub_regions[0]
            })
        },
        {
            id: 2,
            label: "O TEMPO",
            data: [],
            onPress: () => console.log("O TEMPO")
        },
        {
            id: 3,
            label: "CONSELLOS DA VIAXE",
            data: [],
            onPress: () => navigation.navigate('InfoCommon', {
                titulo: "Consellos da viaxe",
                text: lorem
            })
        },
        {
            id: 4,
            label: "SOBRE NÓS",
            data: [],
            onPress: () => navigation.navigate('InfoCommon', {
                titulo: "Sobre nós",
                text: lorem
            })
        },
        {
            id: 5,
            label: "CONTACTO",
            data: [],
            onPress: () => navigation.navigate('InfoCommon', {
                titulo: "Contacto",
                text: lorem
            })
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
                                <CardElement data={data} CardData={data.CardData} />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        flex: 2
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default Info;