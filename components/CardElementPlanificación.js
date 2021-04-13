import React, { useState } from 'react'
import { Text, View, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { PlayIconButton, CloseIconButton, ChevronDownIconButton, ChevronUpIconButton, StopIconButton } from '../components/CustomIcons'

import { stylesCardElementPlanificacion as styles, flexRowContainer } from '../styles/styles'

const CardElementPlanificacion = (props) => {

    const item = props.element;

    const [tipoVisita, setTipoVisita] = useState(item.features[0].properties.tempo_visita_rapida);

    return (
        <Card containerStyle={styles.container}>
            <View style={styles.closeContainer}>
                <CloseIconButton style={styles.iconClose} />
            </View>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={2}>{item.features[0].properties.titulo}</Text>
                    </View>
                    <DropDownPicker
                        items={[
                            { label: 'Visita rápida', value: item.features[0].properties.tempo_visita_rapida },
                            { label: 'Visita lenta', value: item.features[0].properties.tempo_visita_lenta }
                        ]}
                        containerStyle={styles.dropDown}
                        defaultValue={tipoVisita}
                        onChangeItem={item => setTipoVisita(item.value)}

                    />
                </View>
                <View style={styles.rowContainer}>

                    <View style={styles.iconsContainer}>
                        <PlayIconButton />
                        <StopIconButton />
                    </View>
                    <View style={styles.tempo}>
                        <Text>Tempo: </Text>
                        <Text>{tipoVisita} h</Text>
                    </View>
                    <View style={styles.chevron}>
                        <ChevronUpIconButton />
                        <ChevronDownIconButton />
                    </View>
                </View>
            </View>
        </Card >
    )
}

export default CardElementPlanificacion;