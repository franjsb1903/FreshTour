import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar, ActivityIndicator, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import properties from '../properties/properties_expo'

import LeafletMap from '../components/LeafletMap'

const Map = () => {

  const [search, setSearch] = useState({
    search: ''
  });

  const [items, setItems] = useState({
    data: [],
    loading: false
  });

  const [selected, setSelected] = useState({
    selected: ''
  });

  let injectedData = `addLayer(${selected.selected})`;

  useEffect(() => {
    global.map.injectJavaScript(injectedData);
  }, [selected])

  const getElements = async (newSearch) => {
    try {
      if (newSearch.length === 0) {
        setItems({
          data: [],
          loading: false
        });
        return;
      }
      const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.nominatim + newSearch;
      setItems({ loading: true, data: [] });
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setItems({
        data: json,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  }

  const renderFooter = () => {
    if (!items.loading) return null;

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

  const updateSearch = (newSearch) => {
    setSearch({ ...search, search: newSearch });
  }

  const doSearch = (value) => {
    getElements(value);
  }

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

  const selectedItem = async (selected) => {
    const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.nominatim_geojson + selected;
    setSelected({
      selected: ''
    });
    setItems({
      data: [],
      loading: false
    });
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const text = await response.text();
    setSelected({
      selected: text
    });
  }

  return (
    <>
      <SearchBar
        placeholder="Ej: (Catedral, Galeras, Rúa nova...)"
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
      {
        typeof items.data !== 'undefined' && items.data.length > 0 ?
          <FlatList
            data={items.data}
            renderItem={({ item }) => (
              <ListItem
                key={parseInt(`${item.place_id}`)}
                bottomDivider
                onPress={() => selectedItem(`${item.display_name}`)}
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
                  <ListItem.Subtitle> {`${item.type}`} </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={item => item.place_id.toString()}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderSeparator}
            style={{ flexGrow: 0 }}
          />
          :
          <Text style={{ display: "none" }}></Text>
      }
      <LeafletMap />
    </>
  );

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

export default Map;