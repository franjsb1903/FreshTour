/**
 * @fileoverview Listaxe de opcións no menú de usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements';

// estilos
import { loggedIn as styles } from '../styles/styles'

/**
 * Compoñente que conforma o menú de usuario
 * @param {Object} props 
 * @returns {Component}
 */
const ListItemMenuUser = (props) => {

    const data = props.data;                                // Información a amosar no menú

    return (
        <View>
            <ListItem
                style={styles.listItem}
                containerStyle={styles.listItemContainer}
                onPress={data.onPress}
            >
                <ListItem.Content style={styles.listItemContent}>
                    <ListItem.Title style={styles.labelMenu}>{data.label}</ListItem.Title>
                    {
                        data.data != undefined ?
                            <Text style={styles.numberMenu}>{data.data.length}</Text>
                            :
                            <></>
                    }
                </ListItem.Content>
                {
                    data.label != "Pechar sesión" ?
                        <ListItem.Chevron color="darkgreen" />
                        :
                        <></>
                }
            </ListItem>
        </View>
    )

}

export default ListItemMenuUser;