import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

import properties from '../../properties/properties_expo'

import { getSearchData } from '../../Util/DataManagement'

import LeafletMap from '../../components/LeafletMap'
import CustomSearchBar from '../../components/CustomSearchBar';
import CustomFlatList from '../../components/CustomFlatList'

const PointsInterestIcon = () => (
  <Icon name="business" size={32} />
);

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
        <View style={styles.search}>
          <CustomSearchBar
            placeholder="Ej: Catedral, Galeras, Rúa nova..."
            doSearch={doSearch}
            updateItems={updateItems}
          />
        </View>
        <View style={styles.headerBottom}>
          <View style={{ flex: 1 }}>
            <Text></Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>FreshTour</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon={PointsInterestIcon}
              onPress={() => {
                props.navigation.navigate("Turism");
              }}
            />
          </View>
        </View>
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
    backgroundColor: properties.color.main,
    flex: 0,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 0,
    paddingBottom: 0,
  },
  search: {
    flex: 0
  },
  headerBottom: {
    flex: 0,
    flexDirection: "row"
  },
  title: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 28,
    color: properties.color.title,
    fontFamily: Platform.OS == "ios" ? "San Francisco" : properties.text.title_font_family
  }
  ,
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Map;