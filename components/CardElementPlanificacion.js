import React, { useState, useContext } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { PlayIconButton, CloseIconButton, ChevronDownIconButton, ChevronUpIconButton, StopIconButton } from './CustomIcons'

import { stylesCardElementPlanificacion as styles, stylesDropDown as dropdown } from '../styles/styles';

import AppContext from '../context/PlanificadorAppContext';

const CardElementPlanificacion = (props) => {

    const item = props.element;
    const isFirst = props.isFirst;
    const isLast = props.isLast;
    const numberElements = props.numberElements;

    const [tipoVisita, setTipoVisita] = useState(item.features[0].properties.tipo_visita ? item.features[0].properties.tipo_visita : item.features[0].properties.tempo_visita_rapida);

    const context = useContext(AppContext);

    const onDeleteItemPlanificador = props.onDeleteItemPlanificador;

    const closeIconOnPress = () => {
        onDeleteItemPlanificador(item.features[0].properties.id);
        context.resetPlanificacion();
        context.actualizaTempoVisita(0, tipoVisita);
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
                <DropDownPicker
                    items={[
                        { label: 'Visita rápida', value: item.features[0].properties.tempo_visita_rapida },
                        { label: 'Visita lenta', value: item.features[0].properties.tempo_visita_lenta },
                        { label: 'Visita usuario', value: item.features[0].properties.tempo_visita_usuario },
                        { label: 'Visita flexible', value: item.features[0].properties.tempo_visita_usuario }
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

            </View>
            <View style={styles.rowContainer}>
                <View style={styles.tempo}>
                    <Text style={styles.text}>Tempo: </Text>
                    <Text style={styles.textBold}>{tipoVisita > 60 ? <Text>{Number((tipoVisita / 60).toFixed(1))} h</Text> : <Text>{Math.round(tipoVisita)} min</Text>}</Text>
                </View>
            </View>
            <Card.Divider />
            <View style={styles.rowContainer}>
                {
                    isLast ?
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

        </Card >
    )
}

export default CardElementPlanificacion;