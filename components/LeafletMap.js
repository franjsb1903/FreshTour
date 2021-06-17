/**
 * @fileoverview Mapa da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, Component } from 'react';
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview';
import { WebView as WebViewWeb } from 'react-native-web-webview';
import { showMessage } from "react-native-flash-message";
import ActionSheet from "react-native-actions-sheet";
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

// mapa leaflet
import leaflet_map from '../leaflet/leaflet.js';

// modelo
import {
  getAllHostalaria,
  getGeoElementHostalaria,
  filterSortHostalaria,
  addFavHostalaria,
  quitFavHostalaria,
  getByNameHostalaria,
  getFavByNameHostalaria,
  favFilterSortHostalaria,
  getAllOcio,
  getGeoElementOcio,
  filterSortOcio,
  addFavOcio,
  quitFavOcio,
  getByNameOcio,
  getFavByNameOcio,
  favFilterSortOcio,
  getAllOutras,
  getGeoElementOutras,
  filterSortOutras,
  addFavOutras,
  quitFavOutras,
  getByNameOutras,
  getFavByNameOutras,
  favFilterSortOutras
} from '../model/Lecer/Lecer';
import { getLugar, getMonumento } from '../model/Turismo/Turismo';
import { getConcreto as getHospedaxe } from '../model/Hospedaxe/Hospedaxe';
import { getHostalariaConcreto, getOcioConcreto, getOutrasConcreto } from '../model/Lecer/Lecer';

// properties
import properties from '../properties/properties_expo';

// contexto
import AppContext from '../context/AppContext';

// Util
import { getToken } from '../Util/TokenUtil';

// compoñentes
import ActionSheetContent from './ActionSheetContent';

/**
 * Compoñente que conforma o mapa da aplicación
 * @param {Object} props 
 * @returns {Component}
 */
const LeafletMap = (props) => {

  const context = useContext(AppContext);                           // Constante que permite acceder ao contexto

  /**
   * Recupera a localización actual do usuario
   */
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      showMessage({
        message: 'Ten que conceder permisos para localizar a súa posición actual',
        type: "warning",
        position: "bottom",
        icon: "warning"
      });
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      let js = `addMarker(${location.coords.latitude}, ${location.coords.longitude})`;
      global.map.injectJavaScript(js);
    } catch (err) {
      showMessage({
        message: 'Habilite o GPS para localizar a súa posición actual',
        type: "warning",
        position: "bottom",
        icon: "warning"
      });
    }
  }

  /**
   * Execútase unha operación en función da mensaxe recibida
   * @param {String} action 
   */
  const doActionMessage = async (action) => {
    switch (action) {
      case "location":
        await getLocation();
        break;
      case "menu":
        global.action.show();
        break;
    }
  }

  let injectedData = `addLayer(${props.selected})`;
  const navigation = useNavigation();                               // Constante para navegar na aplicación           
  return (
    Platform.OS != "web" ?
      <>
        <WebView
          ref={r => (global.map = r)}
          originWhitelist={["*"]}
          source={{ html: leaflet_map }}
          style={{ flex: 1 }}
          javaScriptEnabledAndroid={true}
          injectedJavaScript={injectedData}
          onMessage={async e => {
            const message = e.nativeEvent.data;
            if (message.split(':').length == 3) {
              const data = message.split(':');
              const token = await getToken('id_token');
              switch (data[2]) {
                case "lugar":
                  const lugar = await getLugar(token, data[1]);
                  if (lugar.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: lugar.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "monumento":
                  const monumento = await getMonumento(token, data[1]);
                  if (monumento.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: monumento.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "hospedaxe":
                  const hospedaxe = await getHospedaxe(data[1], token);
                  if (hospedaxe.status != 200) {
                    return;
                  }
                  navigation.navigate('HospedaxeList', {
                    data: [hospedaxe.elemento],
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "hostalaria":
                  const hostalaria = await getHostalariaConcreto(data[1], token);
                  if (hostalaria.status != 200) {
                    showMessage({
                      message: hostalaria.message,
                      type: "danger",
                      position: "bottom",
                      icon: "danger"
                    });
                    return;
                  }
                  navigation.navigate('CommonLecerList', {
                    data: [hostalaria.elemento],
                    updateItem: context.updateGeoMap,
                    model: {
                      getAll: getAllHostalaria,
                      getGeoElement: getGeoElementHostalaria,
                      filterSort: filterSortHostalaria,
                      addFav: addFavHostalaria,
                      quitFav: quitFavHostalaria,
                      getByName: getByNameHostalaria,
                      getFavByName: getFavByNameHostalaria,
                      favFilterSort: favFilterSortHostalaria
                    },
                    itemsDropDown: properties.dropdown.items.hostalaria,
                    titulo: "Lugares de hostalaría"
                  })
                  break;
                case "ocio":
                  const ocio = await getOcioConcreto(data[1], token);
                  if (ocio.status != 200) {
                    return;
                  }
                  navigation.navigate('CommonLecerList', {
                    data: [ocio.elemento],
                    updateItem: context.updateGeoMap,
                    model: {
                      getAll: getAllOcio,
                      getGeoElement: getGeoElementOcio,
                      filterSort: filterSortOcio,
                      addFav: addFavOcio,
                      quitFav: quitFavOcio,
                      getByName: getByNameOcio,
                      getFavByName: getFavByNameOcio,
                      favFilterSort: favFilterSortOcio
                    },
                    itemsDropDown: properties.dropdown.items.ocio,
                    titulo: "Actividades de ocio"
                  })
                  break;
                case "outra":
                  const outra = await getOutrasConcreto(data[1], token);
                  if (outra.status != 200) {
                    return;
                  }
                  navigation.navigate("CommonLecerList", {
                    data: [outra.elemento],
                    updateItem: context.updateGeoMap,
                    model: {
                      getAll: getAllOutras,
                      getGeoElement: getGeoElementOutras,
                      filterSort: filterSortOutras,
                      addFav: addFavOutras,
                      quitFav: quitFavOutras,
                      getByName: getByNameOutras,
                      getFavByName: getFavByNameOutras,
                      favFilterSort: favFilterSortOutras
                    },
                    itemsDropDown: properties.dropdown.items.outras,
                    titulo: "Outras actividades"
                  })
                  break;
              }
            } else {
              await doActionMessage(message);
            }
          }}
          androidHardwareAccelerationDisabled
        />
        <ActionSheet ref={r => (global.action = r)}
          gestureEnabled={true}
          initialOffsetFromBottom={1}
          extraScroll={0}
          bounceOnOpen={true}
          statusBarTranslucent={false} >
          <ActionSheetContent actionRef={global.action} mapRef={global.map} />
        </ActionSheet>
      </> :
      <WebViewWeb
        ref={r => (global.map = r)}
        originWhitelist={["*"]}
        source={{ html: leaflet_map }}
        style={{ flex: 1 }}
        javaScriptEnabledAndroid={true}
        injectedJavaScript={injectedData}
        onMessage={async e => {
          const message = e.nativeEvent.data;
          await doActionMessage(message);
        }}
        androidHardwareAccelerationDisabled
      />
  );
}


export default LeafletMap;