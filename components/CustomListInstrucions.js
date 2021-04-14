import React from 'react';
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements';

import { stylesListInstrucion as styles } from '../styles/styles';

import { MarkerIcon, RouteIcon } from '../components/CustomIcons'

const CustomListInstrucions = (props) => {
    const element = props.element;
    const steps = props.steps;

    return (
        <View>
            <ListItem
                bottomDivider
                containerStyle={styles.background}
            >
                <MarkerIcon />
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>{element.features[0].properties.titulo}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            {
                
                steps ?
                    steps.map((step, index) => {
                        return (
                            <ListItem
                                bottomDivider
                                key={index}
                                containerStyle={styles.background}
                            >
                                <RouteIcon />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.text}>{step.instruction}</ListItem.Title>
                                    <ListItem.Subtitle>{Math.round(step.distance*1000)} m - {step.duration/60 > 60 ? <Text>{Number((step.duration/3600).toFixed(1))} h</Text> : <Text>{Math.round(step.duration/60)} min</Text>}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        )
                    }) :
                    <View></View>
            }
        </View>
    )
}

export default CustomListInstrucions;