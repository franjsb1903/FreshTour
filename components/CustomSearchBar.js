/**
 * @fileoverview Barra de busca personalizada
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, Component } from 'react'
import { SearchBar } from 'react-native-elements'

// estilos
import { stylesSearchBar as styles } from '../styles/styles'

/**
 * Compoñente que conforma a barra de busca personalizada
 * @param {Object} props 
 * @returns {Component}
 */
const CustomSearchBar = (props) => {

    const [search, setSearch] = useState({                  // Estado que garda a busca do usuario
        search: ''
    });

    const doSearch = props.doSearch;                        // Función que permite realizar a busca
    const updateItems = props.updateItems;                  // Función que permite xeolocalizar o elemento no mapa

    /**
     * Actualiza a busca do usuario cada vez que escribe unha nova letra
     * @param {String} newSearch 
     */
    const updateSearch = (newSearch) => {
        setSearch({ ...search, search: newSearch });
        if (props.onChange) {
            doSearch(newSearch);
        }
    }

    return (
        <SearchBar
            placeholder={props.placeholder}
            lightTheme
            value={search.search}
            onChangeText={(search) => updateSearch(search)}
            inputContainerStyle={styles.searchBar}
            containerStyle={styles.searchBarBorder}
            round={true}
            showLoading={true}
            onCancel={(e) => {
                doSearch(e.nativeEvent.text);
            }}
            onPressOut={(e) => doSearch(e.nativeEvent.text)}
            onEndEditing={(e) => doSearch(e.nativeEvent.text)}
            onClear={() => {
                setSearch({ search: '' });
                updateItems();
            }}
        />
    )
}

export default CustomSearchBar;