import React, { useState, useContext, useEffect } from 'react'
import { Text, View, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { PlayIconButton, CloseIconButton, ChevronDownIconButton, ChevronUpIconButton, StopIconButton } from './CustomIcons'

import { stylesCardElementPlanificacion as styles, stylesDropDown as dropdown } from '../styles/styles';

import AppContext from './PlanificadorAppContext';

const CardElementPlanificacion = (props) => {

    const item = props.element;
    const isFirst = props.isFirst;
    const isLast = props.isLast;

    const [tipoVisita, setTipoVisita] = useState(item.features[0].properties.tempo_visita_rapida);

    const context = useContext(AppContext);
/*
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            context.initTempoVisita(tipoVisita, 0);
        }
        return () => mounted = false;
    }, [])*/

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.rowContainer}>
                {
                    isFirst ?
                        <></>
                        :
                        <View style={styles.chevron}>
                            <ChevronUpIconButton />
                        </View>
                }
                <View style={styles.closeContainer}>
                    <CloseIconButton style={styles.iconClose} />
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
                    onChangeItem={item => {
                        context.actualizaTempoVisita(item.value, tipoVisita);
                        setTipoVisita(item.value);
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
                    <Text style={styles.textBold}>{tipoVisita} min</Text>
                </View>
            </View>
            <Card.Divider />
            <View style={styles.rowContainer}>
                {
                    isLast ?
                        <></>
                        : <View style={styles.chevron}>
                            <ChevronDownIconButton />
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