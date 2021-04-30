import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native'

import { stylesScroll } from '../../../styles/styles'

const CovidScreen = (props) => {

    const data = props.route.params.data;

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={[stylesScroll.containerScroll, { padding: 20 }]}>
            <View style={styles.row}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>NIVEL: </Text>
                <Text style={{ fontSize: 25, color: "#ffd700" }}>MEDIO</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.title}>DATOS ACTUALIZADOS</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.smallTitle}>Novos contaxios</Text>
                        <Text style={styles.textRows}>{data.today_new_confirmed} casos</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.smallTitle}>Variación con onte</Text>
                        <Text style={styles.textRows}>{parseFloat(data.today_vs_yesterday_confirmed).toFixed(5)}</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <Text style={styles.smallTitle}>Total dende inicio</Text>
                    <Text style={styles.textRows}>{data.today_confirmed} casos</Text>
                </View>
                <View style={[styles.column, { flex: 2 }]}>
                    <Text style={styles.smallTitle}>Fonte</Text>
                    <Text style={styles.textRows}>{data.source}</Text>
                </View>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={styles.title}>RESTRICIÓNS VIXENTES</Text>
                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.textRest}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna urna, elementum at massa sed, vulputate egestas elit. Cras semper odio nec aliquet tincidunt. Etiam gravida lacus ac luctus dapibus. Sed semper elit id dolor elementum aliquet. Duis at eros est. Aliquam sollicitudin enim at eros auctor, sed posuere arcu gravida. Morbi id sem consectetur, egestas metus ac, varius ex. Phasellus luctus dictum elit, vitae hendrerit velit ornare at. Morbi scelerisque cursus risus eget mollis. Sed malesuada eget purus at tincidunt. Pellentesque magna elit, varius ac enim quis, blandit faucibus diam. Maecenas vehicula nibh sed nisl scelerisque, at finibus ligula dignissim. In id accumsan mi.
                        Morbi egestas dictum augue, eget elementum augue elementum nec. Cras at lacinia leo. Aliquam in lorem nisl. Curabitur lobortis velit in felis malesuada, vel accumsan libero consectetur. Fusce tincidunt felis vestibulum sodales laoreet. Proin dictum fermentum sapien, nec euismod magna tincidunt id. Sed vitae dolor id nibh pretium gravida ac non erat. Duis at massa nec ipsum venenatis efficitur non vitae lectus. Integer quis est quam. Morbi lacinia accumsan facilisis. Donec ut tristique ex. Suspendisse vitae dapibus erat, sagittis sodales erat.</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    column: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        padding: 10,
        justifyContent: "center"
    },
    smallTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    textRows: {
        fontSize: 18
    },
    textRest: {
        fontSize: 20,
        textAlign: "justify"
    }
});

export default CovidScreen;