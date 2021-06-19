/**
 * @fileoverview Listaxe de instrucións da ruta da planificación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements';

// estilos
import { stylesListInstrucion as styles } from '../styles/styles';

// compoñentes
import { MarkerIcon, RouteIcon } from '../components/CustomIcons'

/**
 * Compoñente que conforma a listaxe de instrucións da ruta da planificación
 * @param {*} props 
 * @returns 
 */
const CustomListInstrucions = (props) => {
    const element = props.element;              // Elemento da planificación
    const steps = props.steps;                  // Pasos da ruta

    return (
        <View>
            <ListItem
                bottomDivider
                containerStyle={styles.background}
            >
                <MarkerIcon />
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>{element.features[0].properties.titulo ? element.features[0].properties.titulo : element.features[0].properties.sub_tag}</ListItem.Title>
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