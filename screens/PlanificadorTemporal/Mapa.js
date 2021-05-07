import React, { useState, useEffect, useContext } from 'react';
import { LogBox, Text, View, Platform } from 'react-native';
import { showMessage } from "react-native-flash-message";

import { stylesMapa as styles } from '../../styles/styles'

import { getData, getItem } from '../../model/Planificador/Mapa';

import AppContext from '../../context/PlanificadorAppContext';
import { PointsInterestIconButton, BedIconButton } from '../../components/CustomIcons';

import { getIconContent } from '../../Util/IconMapUtil'

import LeafletMap from '../../components/LeafletMap';
import CustomSearchBar from '../../components/CustomSearchBar';
import CustomFlatList from '../../components/CustomFlatList';
import ModalUrl from '../../components/ModalUrl'

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

  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(!modal);
  }

  let injectedData = `addLayer(${selected.selected})`;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      global.setSelected = updateSelected;
    }

    return () => mounted = false;
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (Platform.OS != "web") {
        global.map.injectJavaScript(injectedData);
      }
    }

    return () => mounted = false;
  }, [selected.selected]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setSelected({
        selected: context.geoMap
      })
    }

    return () => mounted = false;
  }, [context.geoMap]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
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
    }
    return () => mounted = false;
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
      showMessage({
        message: 'Erro de conexión',
        type: "danger"
      });
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
        showMessage({
          message: 'Erro xeolocalizando o elemento, probe de novo',
          type: "danger"
        });
        return;
      }

      setSelected({
        selected: text
      });
    } catch (err) {
      console.error(err);
      showMessage({
        message: 'Erro de conexión',
        type: "danger"
      });
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
        <View style={styles.icon}>
            <BedIconButton _onPress={() => {
              props.navigation.navigate('HospedaxeList');
            }} />
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
      <ModalUrl modal={modal} showModal={showModal} />
      <LeafletMap />
    </>
  );
}

export default Map;