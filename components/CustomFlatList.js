/**
 * @fileoverview Lista de elementos cando o usuario busca un lugar para xeolocalizar no mapa, na pantalla principal
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react'
import { View, FlatList } from 'react-native';
import { ActivityIndicator, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Compoñente que conforma a lista de lugares buscados polo usuario
 * @param {Object} props 
 * @returns {Component}
 */
const CustomFlatList = (props) => {

    /**
     * Separador entre elementos
     * @returns {Component}
     */
    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "0%"
                }}
            />
        );
    };

    /**
     * ListFooterComponent do compoñente
     * @returns {Component}
     */
    const renderFooter = () => {
        if (!props.data.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    return (
        <FlatList
            data={props.data.data}
            renderItem={({ item }) => (
                <ListItem
                    key={parseInt(`${item.place_id}`)}
                    bottomDivider
                    onPress={() => props.selectedItem(`${item.display_name}`)}
                >
                    <ListItem.Chevron />
                    {
                        `${item.icon}` === "undefined" ?
                            <Icon name="flag" size={26} />
                            :
                            <Avatar source={{ uri: `${item.icon}` }} />
                    }
                    <ListItem.Content>
                        <ListItem.Title> {`${item.display_name}`} </ListItem.Title>
                        <ListItem.Subtitle> {
                            `${item.address.road}` != "undefined" ? `${item.address.road}` : `${item.address.leisure}` != "undefined" ?
                                `${item.address.leisure}` :
                                `${item.address.place_of_worship}` != "undefined" ?
                                    `${item.address.place_of_worship}` :
                                    "Santiago de Compostela"
                        } </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )}
            keyExtractor={item => item.place_id.toString()}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderSeparator}
            style={{ flexGrow: 0 }}
        />
    )
}

export default CustomFlatList;