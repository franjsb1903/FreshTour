import React from 'react'
import { StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'

const CustomSearchBar = (props) => {

    const [search, setSearch] = useState({
        search: ''
    });

    const updateSearch = (newSearch) => {
        setSearch({ ...search, search: newSearch });
    }

    const doSearch = this.props.doSearch;
    const setItems = this.props.setItems;
    const items = this.props.items;

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
                setItems({
                    data: [],
                    loading: false
                })
            }}
        />
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1
    },
    searchBar: {
        backgroundColor: "#fff"
    },
    searchBarBorder: {
        backgroundColor: "#3cb371"
    }
})

export default CustomSearchBar;