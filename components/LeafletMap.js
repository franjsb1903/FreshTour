import React from 'react';
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview';
import { WebView as WebViewWeb } from 'react-native-web-webview';
import { showMessage } from "react-native-flash-message";

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
          await getLocation();
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
          await getLocation();
        }}
        androidHardwareAccelerationDisabled
      />
  );
}


export default LeafletMap;