/**
 * @fileoverview Spinner de carga
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

/**
 * Compoñente que conforma o spinner de carga
 * @returns {Component}
 */
const ProgressBar = () => (
    <View style={styles.progressBar}>
        <ActivityIndicator size="large" color="#EA0000" />
    </View>
);

const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProgressBar;