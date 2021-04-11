import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { stylesPlanificadorScreens as styles } from '../../../../styles/styles'

const DatosRuta = () => {
    return (
        <ScrollView style={styles.scroll}>
            <Text>Datos de ruta</Text>
        </ScrollView>
    );
}

export default DatosRuta;