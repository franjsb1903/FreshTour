import React from 'react';
import { Text, View, ScrollView, Vibration } from 'react-native';

import { SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton } from '../../../../components/CustomIcons';

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow } from '../../../../styles/styles';

const Planificacion = () => {
    return (
        <ScrollView style={styles.scroll}>
            <View style={stylesRow.container}>
                <View style={styles.leftIconsContainer}>
                    <SaveIconButton />
                    <ShareIconButton />
                </View>
                <View style={styles.centerIconsContainer}>
                    <WalkIconButton />
                    <BicycleIconButton />
                </View>
                <View style={styles.rightIconsContainer}>
                    <MapIconButton />
                </View>
            </View>
        </ScrollView>
    );
}

export default Planificacion;