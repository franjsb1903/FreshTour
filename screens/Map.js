import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import leaflet_map from '../leaflet/leaflet.js'


class Map extends Component {
  
  render() {
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ html: leaflet_map }}
        style={{ flex: 1 }}
      />
    );
  }
}

export default Map;