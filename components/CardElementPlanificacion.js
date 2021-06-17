/**
 * @fileoverview Tarxeta que se emprega para amosar os elementos da planificación do usuario, na pantalla do planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useContext, Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

// compoñentes
import { CloseIconButton, ChevronDownIconButton, ChevronUpIconButton } from './CustomIcons'
import ModalTempo from './ModalTempo';

// estilos
import { stylesCardElementPlanificacion as styles, stylesDropDown as dropdown, customTouchableOpacity as buttonStyle } from '../styles/styles';

// contexto
import AppContext from '../context/AppContext';

/**
 * Compoñente que conforma a tarxeta de elementos dunha planificador no planificador
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementPlanificacion = (props) => {

    const item = props.element;                                         // Obxecto que contén a información dun elemento concreto da planificación
    const isFirst = props.isFirst;                                      // Boolean que indica se o elemento é o primeiro da planificación
    const isLast = props.isLast;                                        // Boolean que indica se o elemento é o último da planificación
    const numberElements = props.numberElements;                        // Enteiro que indica o número de elementos da planificación

    // Estado que contén o tipo de visita ao elemento, inicializado en función de determinadas condicións
    const [tipoVisita, setTipoVisita] = useState(
        item.features[0].properties.tipo == "Hospedaxe" || item.features[0].properties.tipo == "Hostalaría" || item.features[0].properties.tipo == "Ocio" || item.features[0].properties.tipo == "Outra" ?
            item.features[0].properties.tipo_visita ?
                item.features[0].properties.tipo_visita
                :
                parseFloat(0)
            :
            item.features[0].properties.tipo_visita ?
                item.features[0].properties.tipo_visita
                : item.features[0].properties.tempo_visita_rapida);

    const [modal, setModal] = useState(false);                          // Estado que controla a visualización dun modal

    const context = useContext(AppContext);                             // Constante sobre a que se accede ao contexto

    const onDeleteItemPlanificador = props.onDeleteItemPlanificador;    // Función que permite eliminar un elemento da planificación

    /**
     * Executa a acción asociada á eliminación dun elemento da planificación
     */
    const closeIconOnPress = () => {
        onDeleteItemPlanificador(item.features[0].properties.id);
        context.resetPlanificacion();
        context.actualizaTempoVisita(0, tipoVisita);
    }

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal(!modal);
    }

    /**
     * Establece o tempo de visita dun determinado elemento
     * @param {String} tempo 
     */
    const onSetTempo = (tempo) => {
        if(!tempo) {
            tempo = 0;
        }
        const tempoFloat = parseFloat(tempo);
        item.features[0].properties['isFlexible'] = true;
        context.actualizaTempoVisita(tempoFloat, tipoVisita);
        setTipoVisita(tempoFloat);
        context.changeTipoVisita(item.features[0].properties.id, tempoFloat, item.features[0].properties.tipo);
    }

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.rowContainer}>
                {
                    isFirst || numberElements == 1 ?                    // Se é o primeiro ou único elemento, non se amosa a icona        
                        <></>
                        :
                        <View style={styles.chevron}>
                            <ChevronUpIconButton onPressIcon={() => {
                                context.changeOrderUp(item.features[0].properties.id, item.features[0].properties.tipo)
                            }} />
                        </View>
                }
                <View style={styles.closeContainer}>
                    <CloseIconButton
                        style={styles.iconClose}
                        closeIconOnPress={closeIconOnPress} />
                </View>
            </View>
            <Card.Divider />
            <View style={styles.rowContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.features[0].properties.titulo ? item.features[0].properties.titulo : item.features[0].properties.sub_tag}</Text>
                </View>
                {                                                       // Se non é un elemento de lecer ou hospedaxe, amósase un dropdown
                    item.features[0].properties.tipo != "Hospedaxe" && item.features[0].properties.tipo != "Hostalaría"
                        && item.features[0].properties.tipo != "Ocio" && item.features[0].properties.tipo != "Outra" ?
                        <DropDownPicker
                            items={[
                                { label: 'Visita rápida', value: item.features[0].properties.tempo_visita_rapida },
                                { label: 'Visita lenta', value: item.features[0].properties.tempo_visita_lenta },
                                { label: 'Visita usuario', value: item.features[0].properties.tempo_visita_usuario },
                                { label: 'Visita flexible', value: tipoVisita }
                            ]}
                            containerStyle={styles.dropDownContainer}
                            style={dropdown.style}
                            globalTextStyle={dropdown.text}
                            defaultValue={tipoVisita}
                            onChangeItem={e => {
                                if (e.label == "Visita flexible") {
                                    showModal();
                                } else {
                                    context.actualizaTempoVisita(e.value, tipoVisita);
                                    setTipoVisita(e.value);
                                    context.changeTipoVisita(item.features[0].properties.id, e.value, item.features[0].properties.tipo);
                                }
                            }}
                            scrollViewProps={{ heigth: 90 }}
                            dropDownStyle={dropdown.scroll}
                            renderSeperator={() => {
                                return (
                                    <Card.Divider />
                                )
                            }}
                        />
                        :
                        <View style={styles.buttonViewContainer}>
                            <TouchableOpacity style={buttonStyle.buttonContainer} onPress={() => {
                                showModal();
                            }}>
                                <Text style={buttonStyle.buttonTextSmaller}>Establecer tempo</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.tempo}>
                    <Text style={styles.text}>Tempo: </Text>
                    <Text style={styles.textBold}>{tipoVisita ? tipoVisita > 60 ? <Text>{Number((tipoVisita / 60).toFixed(1))} h</Text> : <Text>{Math.round(tipoVisita)} min</Text> : <Text>0 min</Text>}</Text>
                </View>
            </View>
            <Card.Divider />
            <View style={styles.rowContainer}>
                {
                    isLast || numberElements == 1 ?                         // Se é o último ou único elemento, non se amosa a icona
                        <></>
                        : <View style={styles.chevron}>
                            <ChevronDownIconButton onPressIcon={() => {
                                context.changeOrderDown(item.features[0].properties.id, item.features[0].properties.tipo)
                            }} />
                        </View>
                }
            </View>
            <ModalTempo modal={modal} showModal={showModal} _onCorrect={onSetTempo} />
        </Card >
    )
}

export default CardElementPlanificacion;