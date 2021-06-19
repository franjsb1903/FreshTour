/**
 * @fileoverview Pantalla de info da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, Component } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

// estilos
import { stylesScroll } from '../../styles/styles';

// compoñentes
import CardElement from '../../components/CardElementInfo'
import ProgressBar from '../../components/ProgressBar';
import Semaforo from '../../components/Semaforo';
import { MailIcon } from '../../components/CustomIcons';

// modelo
import { getCovidData, getTempoData } from '../../model/Info/Info';
import { getRealTimeData as getRealTimeDataCalidade } from '../../model/CalidadeAire/CalidadeAire';

// estilos
import { stylesTurismoList as progress } from '../../styles/styles';

/**
 * Compoñente que conforma a pantalla de Info da aplicación
 * @returns {Component}
 */
const Info = () => {

    const [data, setData] = useState({                                      // Estado que reúne a información de COVID, tempo e calidade do aire
        covid: {},
        tempo: {},
        calidade: {}
    })
    const [loading, setLoading] = useState(false);                          // Estado que indica cando a pantalla está cargando información

    const isFocused = useIsFocused();                                       // Constante que determina cando a pantalla é accedida polo usuario

    var today = new Date();                                                 // Construción da data actual
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');                 // Xaneiro é 0
    var yyyy = today.getFullYear();
    const date = yyyy + "-" + mm + "-" + dd;

    /**
     * Cando se accede á pantalla, execútase o contido da función
     */
    useEffect(() => {
        let mounted = true;

        const abortController = new AbortController();                      // Controla a chamada web, para evitar problemas de perdas de memoria mentres se constrúe o compoñente
        const signal = abortController.signal;
        /**
         * Obtén a información
         */
        const getData = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                }
                const covidData = await getCovidData(signal);
                const tempoData = await getTempoData(signal);
                const calidadeData = await getRealTimeDataCalidade(signal);
                if (mounted) {
                    setData({
                        covid: covidData,
                        tempo: tempoData,
                        calidade: calidadeData
                    });
                }
                if (mounted) {
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        if (mounted)
            getData();

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, [isFocused]);

    const navigation = useNavigation();                                                 // Constante que permite empregar a navegación

    /**
     * Información a amosar na tarxeta da COVID na pantalla
     * @returns {Component}
     */
    const DataCovidCard = () => {

        var datos = undefined;
        if (data.covid.dates != undefined) {
            datos = data.covid.dates[date].countries.Spain.regions[0].sub_regions[0];
        }

        return (
            <View style={styles.row}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
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

    /**
     * Información a amosar na tarxeta do tempo da pantalla
     * @returns {Component}
     */
    const DataTempoCard = () => {
        var icon = undefined;
        var temperature = undefined;
        if (data.tempo.features != undefined) {
            icon = data.tempo.features[0].properties.days[0].variables[0].values[0].iconURL;
            temperature = data.tempo.features[0].properties.days[0].variables[1].values[0].value;
        }
        return (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: icon }} />
                <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: "bold" }}>{temperature} ºC</Text>
            </View>
        )
    }

    /**
     * Información a amosar na tarxeta da calidade do aire da pantalla
     * @returns {Component}
     */
    const DataCalidadeCard = () => {

        return (
            data.calidade ?
                <View style={[styles.row, { flex: 1 }]}>
                    <View style={styles.column}>
                        <Text style={styles.title}>NO2</Text>
                        <Semaforo type={"no2"} value={data.calidade.no2} size={30} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>O3</Text>
                        <Semaforo type={"o3"} value={data.calidade.o3} size={30} />
                    </View>
                </View>
                :
                <></>
        )
    };

    /**
     * Contido da pantalla de consellos da viaxe
     * @returns {Component}
     */
    const ConsellosViaxe = () => (
        <>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.titleGrande}>O tempo</Text>
                <Text style={styles.text}>Santiago de Compostela está situada no oeste de España a pouco máis de media hora da costa atlántica, sendo así un lugar moi dado ás chuvias e á humidade. Recoméndase, polo tanto, revisar o tempo antes de acudir á cidade, xa que en caso de facer calor este pode ser moi abafante, e as chuvias moi traicioneiras.</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.titleGrande}>Onde comer</Text>
                <Text style={styles.text}>A cidade conta con múltiples lugares de hostalaría onde xantar. Ao redor da propia Catedral e preto da mesma existen moitos moi interesantes, sendo unha área recomendada ao coincidir cunha zona amplamente turística. Na zona do Parque da Alameda e Porta Facheira atópanse outros tantos dun prezo máis axeitado e reducido.</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.titleGrande}>Cando visitala</Text>
                <Text style={styles.text}>Recoméndase a visita da cidade en calquera época do ano. No mes de maio celébrase a Ascensión, unha festividade na que se pode disfrutar de diversas actividades. En xullo, o Apóstolo, sendo unha data moi sinalada no calendario é polo tanto recomendada. Nos meses de Nadal, a partir de novembro, a cidade vístese de gala para recibir a Papá Noel e os Reis Magos, así como para celebrar a entrada do novo ano, con gran cantidade de luces por toda a cidade.</Text>
            </View>
        </>
    )

    /**
     * Contido da pantalla Sobre nós
     * @returns {Component}
     */
    const SobreNos = () => (

        <View style={{ paddingTop: 20 }}>
            <Text style={styles.text}>FreshTour: A túa visita saudable a Santiago de Compostela, é unha aplicación de turismo á capital galega, levada a cabo no ámbito do desarrollo dun Traballo de Fin de Grado na Universidade de Santiago de Compostela. A aplicación conta con gran cantidade de funcionalidades que permiten levar a cabo unha planificación temporal para visitar a cidade, con elementos turísticos, lugares de hospedaxe e actividades de lecer a realizar. Tamén poderá almacenar elementos como favoritos e engadir comentarios, así como gardar unha planificación e compartila con outros usuarios, podendo visualizar toda esta información no seu perfil. Do mesmo xeito, pode consultar as planificacións que realicen outros usuarios.</Text>
            <Text style={styles.text}>Sen dúbida a característica máis diferenciadora desta aplicación é o feito de contar con información de calidade do aire na cidade, tanto no apartado de información da aplicación como cando se constrúe unha planificación. Esta información de calidade do aire procede dos datos que recolle o proxecto TRAFAIR en Santiago de Compostela.</Text>
            <Text style={styles.text}>Os encargados desta aplicación somos Francisco Javier Saa Besteiro (desarrollador da propia app) e José Ramón Ríos Viqueira (colaborador e guía na súa realización). Pola nosa parte, queremos agradecerche enormemente que empregues a nosa aplicación. Ten moito traballo detrás para que poida axudarche o máximo posible na túa visita. Calquera suxestión, cambios ou melloras, por favor, non dudes en realizalas, contactando con nós a través do correo que aparece no apartado de Contacto. Grazas de novo!</Text>
        </View>
    )

    /**
     * Contido da pantalla de contacto
     * @returns {Component}
     */
    const Contacto = () => (
        <View style={[styles.row, { paddingTop: 20 }]}>
            <MailIcon size={30} style={{ margin: 5 }} />
            <Text style={[styles.text, { margin: 5 }]}>franciscojavier.saa@rai.usc.es</Text>
        </View>
    )

    /**
     * Array cas tarxetas a amosar na pantalla actual
     */
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
            data: data.tempo,
            CardData: DataTempoCard,
            onPress: () => navigation.navigate("TempoScreen", {
                data: data.tempo
            })
        },
        {
            id: 3,
            label: "CALIDADE DO AIRE",
            data: data.calidade,
            CardData: DataCalidadeCard,
            onPress: () => navigation.navigate("CalidadeAireScreen", {
                data: data.calidade
            })
        },
        {
            id: 4,
            label: "INFORMACIÓN CALIDADE AIRE",
            data: [],
            onPress: () => navigation.navigate("InfoCalidadeAire")
        },
        {
            id: 5,
            label: "CONSELLOS DA VIAXE",
            data: [],
            onPress: () => navigation.navigate('InfoCommon', {
                titulo: "Consellos da viaxe",
                Content: ConsellosViaxe
            })
        },
        {
            id: 6,
            label: "SOBRE NÓS",
            data: [],
            onPress: () => navigation.navigate('InfoCommon', {
                titulo: "Sobre nós",
                Content: SobreNos
            })
        },
        {
            id: 7,
            label: "CONTACTO",
            data: [],
            onPress: () => navigation.navigate('InfoCommon', {
                titulo: "Contacto",
                Content: Contacto
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
    },
    titleGrande: {
        fontSize: 25,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    text: {
        fontSize: 20,
        textAlign: "justify"
    }
});

export default Info;