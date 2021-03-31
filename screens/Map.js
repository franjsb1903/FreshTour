import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

//import leaflet_map from '../leaflet/leaflet_html.html'

const leaflet_html = require("../leaflet/leaflet.html")

class Map extends Component {
    render() {
        return (
          <WebView
            source={{ html: "../leaflet/leaflet.html" }}
            style={{ flex: 1 }}
          />
        );
      }
  }

export default Map;