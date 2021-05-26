import React, { useContext } from 'react';
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview';
import { WebView as WebViewWeb } from 'react-native-web-webview';
import { showMessage } from "react-native-flash-message";
import ActionSheet from "react-native-actions-sheet";
import { useNavigation } from '@react-navigation/native';
import leaflet_map from '../leaflet/leaflet.js';
import * as Location from 'expo-location';

import AppContext from '../context/PlanificadorAppContext';

import { getLugar, getMonumento } from '../model/Turismo/Turismo';
import { getConcreto as getHospedaxe } from '../model/Hospedaxe/Hospedaxe';
import { getHostalariaConcreto, getOcioConcreto, getOutrasConcreto } from '../model/Lecer/Lecer';
import { getToken } from '../Util/TokenUtil';
import ActionSheetContent from './ActionSheetContent';

const LeafletMap = (props) => {

  const context = useContext(AppContext);

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
  const navigation = useNavigation();
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
            console.log(message);
            if (message.split(':').length == 3) {
              const data = message.split(':');
              const token = await getToken();
              switch (data[2]) {
                case "Lugar turístico":
                  const lugar = await getLugar(token, data[1]);
                  if (response.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: lugar.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "Monumento":
                  const monumento = await getMonumento(token, data[1]);
                  if (response.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: monumento.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "Hospedaxe":
                  const hospedaxe = await getHospedaxe(data[1], token);
                  if (response.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: hospedaxe.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "Hostalaría":
                  const hostalaria = await getHostalariaConcreto(data[1], token);
                  if (response.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: hostalaria.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "Ocio":
                  const ocio = await getOcioConcreto(data[1], token);
                  if (response.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: ocio.elemento,
                    updateItem: context.updateGeoMap
                  })
                  break;
                case "Outra":
                  const outra = await getOutrasConcreto(data[1], token);
                  if (response.status != 200) {
                    return;
                  }
                  navigation.navigate('Turism', {
                    elemento: outra.elemento,
                    updateItem: context.updateGeoMap
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