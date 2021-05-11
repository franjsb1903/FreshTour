import React, { useState, useContext } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { PlayIconButton, CloseIconButton, ChevronDownIconButton, ChevronUpIconButton, StopIconButton } from './CustomIcons'

import { stylesCardElementPlanificacion as styles, stylesDropDown as dropdown, customTouchableOpacity as buttonStyle } from '../styles/styles';

import AppContext from '../context/PlanificadorAppContext';
import ModalTempo from './ModalTempo';

const CardElementPlanificacion = (props) => {

    const item = props.element;
    const isFirst = props.isFirst;
    const isLast = props.isLast;
    const numberElements = props.numberElements;

    const [tipoVisita, setTipoVisita] = useState(
        item.features[0].properties.tipo == "Hospedaxe" || item.features[0].properties.tipo != "Hostalaría" ?
            item.features[0].properties.tipo_visita ?
                item.features[0].properties.tipo_visita
                :
                0
            :
            item.features[0].properties.tipo_visita ?
                item.features[0].properties.tipo_visita
                : item.features[0].properties.tempo_visita_rapida);
                
    const [modal, setModal] = useState(false);

    const context = useContext(AppContext);

    const onDeleteItemPlanificador = props.onDeleteItemPlanificador;

    const closeIconOnPress = () => {
        onDeleteItemPlanificador(item.features[0].properties.id);
        context.resetPlanificacion();
        context.actualizaTempoVisita(0, tipoVisita);
    }

    const showModal = () => {
        setModal(!modal);
    }

    const onSetTempo = (tempo) => {
        const tempoFloat = parseFloat(tempo);
        context.actualizaTempoVisita(tempoFloat, tipoVisita);
        setTipoVisita(tempoFloat);
        context.changeTipoVisita(item.features[0].properties.titulo, tempoFloat);
    }

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.rowContainer}>
                {
                    isFirst || numberElements == 1 ?
                        <></>
                        :
                        <View style={styles.chevron}>
                            <ChevronUpIconButton onPressIcon={context.changeOrderUp} id={item.features[0].properties.id} />
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
                    <Text style={styles.title} numberOfLines={2}>{item.features[0].properties.titulo}</Text>
                </View>
                {
                    item.features[0].properties.tipo != "Hospedaxe" || item.features[0].properties.tipo != "Hostalaría" ?
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
                                context.actualizaTempoVisita(e.value, tipoVisita);
                                setTipoVisita(e.value);
                                context.changeTipoVisita(item.features[0].properties.id, e.value);
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
                    isLast || numberElements == 1 ?
                        <></>
                        : <View style={styles.chevron}>
                            <ChevronDownIconButton onPressIcon={context.changeOrderDown} id={item.features[0].properties.id} />
                        </View>
                }
                <View style={styles.iconsContainer}>
                    <PlayIconButton />
                    <StopIconButton />
                </View>
            </View>
            <ModalTempo modal={modal} showModal={showModal} _onCorrect={onSetTempo} />
        </Card >
    )
}

export default CardElementPlanificacion;