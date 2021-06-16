/**
 * @fileoverview Compoñente común para indicar que non hai elementos que amosar
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { View, Text } from 'react-native'

/**
 * Compoñente común para indicar que non hai elementos que amosar
 * @returns {Component}
 */
const NoData = () => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", padding: 50 }}>
            <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
        </View>
    )
}

export default NoData;