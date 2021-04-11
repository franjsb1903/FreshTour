import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { stylesPlanificadorScreens as styles } from '../../../../styles/styles'

const Instrucions = () => {
    return (
        <ScrollView style={styles.scroll}>
            <Text>Instrucions</Text>
        </ScrollView>
    );
}

export default Instrucions;