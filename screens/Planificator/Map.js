import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import properties from '../../properties/properties_expo'

import { getSearchData } from '../../DataManagement/DataManagement'

import LeafletMap from '../../components/LeafletMap'
import CustomSearchBar from '../../components/CustomSearchBar';
import CustomFlatList from '../../components/CustomFlatList'

const Map = (props) => {

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
      setItems({ loading: true, data: [] });
      const json = await getSearchData(newSearch);
      setItems({
        data: json,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  }

  const doSearch = (value) => {
    getElements(value);
  }

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

  const updateItems = () => {
    setItems({
      data: [],
      loading: false
    })
  }

  return (
    <>
      <View style={styles.header}>
        <CustomSearchBar
          placeholder="Ej: (Catedral, Galeras, Rúa nova...)"
          doSearch={doSearch}
          updateItems={updateItems}
        />
        <Button color="#841584" title="Puntos de interese" onPress={() => {
          props.navigation.navigate("Turism");
        }} />
      </View>
      {
        typeof items.data !== 'undefined' && items.data.length > 0 ?
          <CustomFlatList
            data={items}
            selectedItem={selectedItem}
          />
          :
          <Text style={{ display: "none" }}></Text>
      }
      <LeafletMap />
    </>
  );

}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#3cb371",
    flex: 0
  }
});

export default Map;