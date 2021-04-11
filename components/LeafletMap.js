import React from 'react';
import { Platform, ToastAndroid } from 'react-native'
import { WebView } from 'react-native-webview';

import leaflet_map from '../leaflet/leaflet.js';
import * as Location from 'expo-location'

export default class LeafletMap extends React.Component {

  render() {

    const getLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show("Habilite o GPS para localizar a súa posición actual", ToastAndroid.SHORT);
        setErrorMsg('Permission to access location was denied');
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        let js = `addMarker(${location.coords.latitude}, ${location.coords.longitude})`;
        global.map.injectJavaScript(js);
      } catch (err) {
        ToastAndroid.show("Habilite o GPS para xeolocalizar a súa posición", ToastAndroid.SHORT);
      }
    }

    let injectedData = `addLayer(${this.props.selected})`

    return (
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
      />
    );
  }
}