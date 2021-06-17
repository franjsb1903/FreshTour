/**
 * @fileoverview Pantalla do mapa da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useEffect, useContext, Component } from 'react';
import { LogBox, Text, View, Platform } from 'react-native';
import { showMessage } from "react-native-flash-message";

// estilos
import { stylesMapa as styles } from '../../styles/styles'

// modelo
import { getData, getItem } from '../../model/Planificador/Mapa';

// contexto
import AppContext from '../../context/AppContext';

// compoñentes
import { PointsInterestIconButton, BedIconButton, ClockIconButton } from '../../components/CustomIcons';
import LeafletMap from '../../components/LeafletMap';
import CustomSearchBar from '../../components/CustomSearchBar';
import CustomFlatList from '../../components/CustomFlatList';
import ModalUrl from '../../components/ModalUrl';

// Util
import { getIconContent } from '../../Util/IconMapUtil'

/**
 * Compoñente que conforma a pantalla principal da aplicación
 * @param {Object} props 
 * @returns {Component}
 */
const Map = (props) => {

  if (Platform.OS != "web") {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state'
    ])
  }

  const context = useContext(AppContext);                   // Constante para empregar o contexto da aplicación

  const [items, setItems] = useState({                      // Estado que almacena elementos a xeolocalizar no mapa dunha planificación e controla cando esta está cargando información
    data: [],
    loading: false
  });

  const [selected, setSelected] = useState({                // Estado que almacena información a amosar no mapa
    selected: '',
    type: ''
  });

  const [modal, setModal] = useState(false);                // Estado que controla un modal

  /**
   * Amosa ou oculta o modal
   */
  const showModal = () => {
    setModal(!modal);
  }

  let injectedData = `addLayer(${selected.selected}, "${selected.type}")`;  // Liña JavaScript para inxectar código no mapa

  /**
   * Execútase cando se construe o compoñente
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      global.setSelected = updateSelected;                  // Gardamos a función para amosar información no mapa nunha variable accesible dende toda a aplicación
    }

    return () => mounted = false;
  }, []);

  /**
   * Execútase cando cambia o estado selected
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (Platform.OS != "web") {
        global.map.injectJavaScript(injectedData);            // Inxectamos a información no mapa
      }
    }

    return () => mounted = false;
  }, [selected]);

  /**
   * Execútase cando cambia o estado geoMap no contexto
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setSelected({
        selected: context.geoMap
      })
    }

    return () => mounted = false;
  }, [context.geoMap]);

  /**
   * Execútase cando cambia o estado route no contexto, isto é, cando hai unha nova ruta que amosar no mapa
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (Platform.OS != "web") {
        global.map.injectJavaScript(`deleteMarkerPlanificacionLayer()`);      // Eliminamos os marcadores de rutas que podan existir no mapa
        const data = context.route.route;
        if (Platform.OS != "web") {
          global.map.injectJavaScript(`addRoute(${data})`);                   // Debuxamos a ruta
          var i = 0;
          context.turismoItems.map(e => {                                     // Debuxamos un marcador por cada elemento da planificación
            i++;
            const content = getIconContent(i);
            const coord = [parseFloat(`${e.features[0].geometry.coordinates[0]}`), parseFloat(`${e.features[0].geometry.coordinates[1]}`)]
            let name;
            if (e.features[0].properties.titulo === null) {
              name = e.features[0].properties.sub_tag;
            } else {
              name = e.features[0].properties.titulo;
            }
            global.map.injectJavaScript(`addMarkerNo(${coord[0]}, ${coord[1]}, "${name}", "${content}")`);
          });

        }
      }
    }
    return () => mounted = false;
  }, [context.route]);

  /**
   * Obtén unha listaxe de lugares a partir dunha busca do usuario
   * @param {String} newSearch 
   * @returns 
   */
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
        type: "danger",
        position: "bottom",
        icon: "danger"
      });
    }
  }

  /**
   * Execútase cando se realiza unha busca polo usuario
   * @param {String} value 
   */
  const doSearch = (value) => {
    getElements(value);
  }

  /**
   * Execútase cando o usuario selecciona un dos lugares de entre os dispoñibles da listaxe amosada a partir da súa busca, permitindo a súa xeolocalización
   * @param {String} selected 
   * @returns 
   */
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
          type: "danger",
          position: "bottom",
          icon: "danger"
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
        type: "danger",
        position: "bottom",
        icon: "danger"
      });
    }
  }

  /**
   * Actualiza os elementos da planificación  almacenados
   */
  const updateItems = () => {
    setItems({
      data: [],
      loading: false
    })
  }

  /**
   * Actualiza a selección actual do usuario
   * @param {String} selected 
   * @param {String} type 
   */
  const updateSelected = (selected, type) => {
    setSelected({
      selected: selected,
      type: type
    });
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerBottom}>
          <View style={[styles.icon, { flexDirection: "row" }]}>
            <ClockIconButton _onPress={() => {
              props.navigation.navigate('LecerList', {
                updateItem: updateSelected
              });
            }} />
            <BedIconButton _onPress={() => {
              props.navigation.navigate('HospedaxeList', {
                updateItem: updateSelected
              });
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