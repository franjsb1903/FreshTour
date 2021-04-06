import React from 'react';
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview';

import leaflet_map from '../leaflet/leaflet.js';
import * as Location from 'expo-location'

export default class LeafletMap extends React.Component {

  render() {

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
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          let js = `addMarker(${location.coords.latitude}, ${location.coords.longitude})`;
          global.map.injectJavaScript(js);
        }}
        androidHardwareAccelerationDisabled
      />
    );
  }
}