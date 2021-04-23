import React, { useState, useEffect, useContext } from 'react';
import { LogBox, Text, View, Platform, ToastAndroid } from 'react-native';

import * as SecureStore from 'expo-secure-store';

import { stylesMapa as styles } from '../../styles/styles'

import { getData, getItem } from '../../model/Planificador/Mapa';

import AppContext from '../../context/PlanificadorAppContext';
import { PointsInterestIconButton } from '../../components/CustomIcons';

import { getIconContent } from '../../Util/IconMapUtil'

import LeafletMap from '../../components/LeafletMap';
import CustomSearchBar from '../../components/CustomSearchBar';
import CustomFlatList from '../../components/CustomFlatList';

const Map = (props) => {

  if (Platform.OS != "web") {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state'
    ])
  }

  const context = useContext(AppContext);

  const [items, setItems] = useState({
    data: [],
    loading: false
  });

  const [selected, setSelected] = useState({
    selected: ''
  });

  let injectedData = `addLayer(${selected.selected})`;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      global.setSelected = updateSelected;
    }

    return () => mounted = false;
  }, []);

  useEffect(() => {
    if (Platform.OS != "web") {
      global.map.injectJavaScript(injectedData);
    }
  }, [selected.selected]);

  useEffect(() => {
    if (Platform.OS != "web") {
      global.map.injectJavaScript(`deleteMarkerPlanificacionLayer()`);
      const data = context.route.route;
      if (Platform.OS != "web") {
        global.map.injectJavaScript(`addRoute(${data})`);
        var i = 0;
        context.turismoItems.map(e => {
          i++;
          const content = getIconContent(i);
          const coord = [parseFloat(`${e.features[0].geometry.coordinates[0]}`), parseFloat(`${e.features[0].geometry.coordinates[1]}`)]
          const name = `${e.features[0].properties.titulo}`;
          global.map.injectJavaScript(`addMarkerNo(${coord[0]}, ${coord[1]}, "${name}", "${content}")`);
        });

      }
    }
  }, [context.route]);

  const getElements = async (newSearch) => {
    try {
      setItems({ loading: true, data: [] });
      const data = await getData(newSearch);
      if (data == undefined) {
        setItems({
          data: [],
          loading: false
        });
        return;
      }
      setItems({
        data: data,
        loading: false
      });
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Erro de conexión", ToastAndroid.SHORT);
    }
  }

  const doSearch = (value) => {
    getElements(value);
  }

  const selectedItem = async (selected) => {

    try {
      setSelected({
        selected: ''
      });
      setItems({
        data: [],
        loading: false
      });

      const text = await getItem(selected);

      if (text == undefined) {
        ToastAndroid.show('Erro xeolocalizando o elemento, probe de novo', ToastAndroid.SHORT);
        return;
      }

      setSelected({
        selected: text
      });
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Erro de conexión", ToastAndroid.SHORT);
    }
  }

  const updateItems = () => {
    setItems({
      data: [],
      loading: false
    })
  }

  const updateSelected = (selected) => {
    setSelected({
      selected: selected
    });
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerBottom}>
          <View style={{ flex: 1 }}>
            <Text></Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>FreshTour</Text>
          </View>
          <View style={styles.icon}>
            <PointsInterestIconButton navigate={props.navigation.navigate} updateSelected={updateSelected} />
          </View>
        </View>
        <View style={styles.search}>
          <CustomSearchBar
            placeholder="Ej: Catedral, Galeras, Rúa nova..."
            doSearch={doSearch}
            updateItems={updateItems}
            onChange={false}
          />
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

export default Map;