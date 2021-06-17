/**
 * @fileoverview Pantalla de información sobre o tempo
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

// compoñentes
import CardElementTempo from '../../../components/CardElementTempo';
import NoData from '../../../components/NoData';

/**
 * Compoñente que conforma a pantalla de información sobre o tempo
 * @param {Object} props 
 * @returns {Component}
 */
const TempoScreen = (props) => {

    const data = props.route.params.data;                                   // Información a amosar

    /**
     * Debuxa as tarxetas que se poden ver na pantalla
     * @param {Object} day 
     * @returns {Array}
     */
    const drawCards = (day) => {
        var cards = [];
        const totalData = day.variables[0].values.length;                   // Os datos do tempo divídense en horas, quérense amosar en tres momentos: mañá, tarde e noite
        if (totalData == 24) {                                              // É un día completo, teremos tres tarxetas en tres horas distintas
            for (var i = 7; i < totalData; i += 8) {                        // Avanzamos de 8 en 8 accedendo á información
                cards.push(
                    <CardElementTempo key={i}
                        icon={day.variables[0].values[i].iconURL}
                        temperature={day.variables[1].values[i].value}
                        precipitation={day.variables[2].values[i].value}
                        wind={{
                            icon: day.variables[3].values[i].iconURL,
                            value: day.variables[3].values[i].moduleValue
                        }}
                        day={day.variables[0].values[i].timeInstant}
                        isMultiple={true}
                        momment={i == 7 ? "mañá" : i == 15 ? "tarde" : "noite"} />
                )
            }
        } else if (totalData < 24 && totalData >= 16) {                     // Só dúas tarxetas, en dúas horas distintas
            for (var i = 0; i < totalData; i += (totalData - 1)) {          // Avanzamos en función dos datos totais para obter toda a información
                cards.push(
                    <CardElementTempo key={i}
                        icon={day.variables[0].values[i].iconURL}
                        temperature={day.variables[1].values[i].value}
                        precipitation={day.variables[2].values[i].value}
                        wind={{
                            icon: day.variables[3].values[i].iconURL,
                            value: day.variables[3].values[i].moduleValue
                        }}
                        day={day.variables[0].values[i].timeInstant}
                        momment={i == 0 ? "tarde" : "noite"} />
                )
            }
        } else if (totalData < 16) {                                        // Só un momento do día, accedemos á última información dispoñible
            cards.push(
                <CardElementTempo key={totalData - 1}
                    icon={day.variables[0].values[totalData - 1].iconURL}
                    temperature={day.variables[1].values[totalData - 1].value}
                    precipitation={day.variables[2].values[totalData - 1].value}
                    wind={{
                        icon: day.variables[3].values[totalData - 1].iconURL,
                        value: day.variables[3].values[totalData - 1].moduleValue
                    }}
                    day={day.variables[0].values[totalData - 1].timeInstant}
                    momment={"noite"} />
            )
        }
        return cards;
    }

    return (

        data.features != undefined && data.features[0].properties != undefined ?
            <ScrollView contentContainerStyle={{ alignItems: "center" }} style={{ marginBottom: 20, marginTop: 20 }} >
                <CardElementTempo
                    icon={data.features[0].properties.days[0].variables[0].values[0].iconURL}
                    temperature={data.features[0].properties.days[0].variables[1].values[0].value}
                    precipitation={data.features[0].properties.days[0].variables[2].values[0].value}
                    wind={{
                        icon: data.features[0].properties.days[0].variables[3].values[0].iconURL,
                        value: data.features[0].properties.days[0].variables[3].values[0].moduleValue
                    }}
                    day={data.features[0].properties.days[0].variables[2].values[0].timeInstant} />
                <View style={{ flexDirection: "row" }}>
                    {
                        drawCards(data.features[0].properties.days[0])
                    }
                </View>
                <View style={{ flexDirection: "row" }}>
                    {
                        drawCards(data.features[0].properties.days[1])
                    }
                </View>
                <View style={{ flexDirection: "row" }}>
                    {
                        drawCards(data.features[0].properties.days[2])
                    }
                </View>
            </ScrollView>
            :
            <NoData />
    );
}

export default TempoScreen;