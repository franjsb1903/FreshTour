import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'

import { stylesSearchBar as styles } from '../styles/styles'

const CustomSearchBar = (props) => {

    const [search, setSearch] = useState({
        search: ''
    });

    const updateSearch = (newSearch) => {
        setSearch({ ...search, search: newSearch });
        if (props.onChange) {
            doSearch(newSearch);
        }
    }

    const doSearch = props.doSearch;
    const updateItems = props.updateItems;

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