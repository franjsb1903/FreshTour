import React from 'react';
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview';
import { WebView as WebViewWeb } from 'react-native-web-webview';
import { showMessage } from "react-native-flash-message";

import { getGeoAll as getGeoAllTurismo } from '../model/Turismo/Turismo';
import { getGeoByTag, getGeoByTag as getGeoByTagHospedaxe } from '../model/Hospedaxe/Hospedaxe';

import leaflet_map from '../leaflet/leaflet.js';
import * as Location from 'expo-location'

const LeafletMap = (props) => {

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      showMessage({
        message: 'Habilite o GPS para localizar a súa posición actual',
        type: "warning"
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
        type: "warning"
      });
    }
  }

  const doActionMessage = async (action) => {
    var data;
    let injectedData;
    switch (action) {
      case "location":
        await getLocation();
        break;
      case "show_monumentos":
        data = await getGeoAllTurismo("Monumento");
        injectedData = `addLayer(${data})`;
        global.map.injectJavaScript(injectedData);
        break;
      case "show_lugares":
        data = await getGeoAllTurismo("Lugar turístico");
        injectedData = `addLayer(${data})`;
        global.map.injectJavaScript(injectedData);
        break;
      case "show_hoteis":
        data = await getGeoByTag("hotel");
        injectedData = `addLayer(${data})`;
        global.map.injectJavaScript(injectedData);
        break;
    }
  }

  let injectedData = `addLayer(${props.selected})`

  return (
    Platform.OS != "web" ?
      <WebView
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
      /> :
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