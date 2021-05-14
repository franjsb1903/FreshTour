import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import CardElementTempo from '../../../components/CardElementTempo';
import NoData from '../../../components/NoData';

import { stylesScroll } from '../../../styles/styles'

const TempoScreen = (props) => {

    const data = props.route.params.data;

    const drawCards = (day) => {
        var cards = [];
        const totalData = day.variables[0].values.length;
        if (totalData == 24) {
            for (var i = 7; i < totalData; i += 8) {
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
        } else if (totalData < 24 && totalData >= 16) {
            for (var i = 0; i < totalData; i += (totalData - 1)) {
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
        } else if (totalData < 16) {
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