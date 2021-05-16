import React from 'react';
import { Platform, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview';
import { WebView as WebViewWeb } from 'react-native-web-webview';
import { showMessage } from "react-native-flash-message";
import ActionSheet from "react-native-actions-sheet";

import leaflet_map from '../leaflet/leaflet.js';
import * as Location from 'expo-location';

import ActionSheetContent from './ActionSheetContent';

const LeafletMap = (props) => {

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

  let injectedData = `addLayer(${props.selected})`

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
            await doActionMessage(message);
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