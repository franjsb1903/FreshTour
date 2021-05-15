import React from 'react';
import { Platform, View, Text, ScrollView, TouchableOpacity } from 'react-native'

import { getGeoAll as getGeoAllTurismo } from '../model/Turismo/Turismo';
import { getGeoByTag as getGeoByTagHospedaxe } from '../model/Hospedaxe/Hospedaxe';
import { getGeoByTagHostalaria, getGeoByTagOcio, getGeoByMultipleTagOcio, getGeoByTagOutras } from '../model/Lecer/Lecer';
import { customTouchableOpacity as buttonStyle } from '../styles/styles'

const ActionSheetContent = (props) => {

    const actionRef = props.actionRef;
    const mapRef = props.mapRef;

    const addToMap = (data) => {
        const injectedData = `addLayer(${data})`;
        mapRef.injectJavaScript(injectedData);
        actionRef.hide();
    }

    const Turismo = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Elementos turísticos</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoAllTurismo("Monumento");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Monumentos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoAllTurismo("Lugar turístico");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Lugares turísticos</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    const Hospedaxe = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Onde durmir</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("hotel");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Hoteis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("hostal");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Hostais</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("guest_house");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Aloxamento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("caravan_site");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Caravanas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("apartment");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Vivendas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("camp_pitch", "camp_site");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Camping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHospedaxe("motel");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Moteis</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    const Hostalaria = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Comer e beber</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("bar");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Bares</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("restaurant");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Restaurantes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("cafe");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Cafés</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("pub");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Pubs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("food_court");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Zonas de comidas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("fast_food");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Comida rápida</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("ice_cream");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Xeaderías</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("confectionery");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Pastelerías</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("bakery");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Panaderías</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagHostalaria("chocolate");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Chocolaterías</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    const Ocio = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Que facer</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByMultipleTagOcio("picnic_table", "picnic_site");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Picnics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("amusement_arcade");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Salas de xogos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("bowling_alley");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Boleras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("escape_game");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Salas de escape</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("garden");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Xardíns</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("park");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Parques</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("playground");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Parques infantís</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("stadium");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Estadios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("trampoline_park");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Camas elásticas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("pitch");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Zonas de deportes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("sports_centre");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Centros deportivos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("outdoor_seating");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Terrazas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("dance");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Baile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("sports_hall");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Pabellóns deportivos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("cinema");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Cines</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("theatre");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Teatros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("nightclub");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Clubs nocturnos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOcio("viewpoint");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Miradores</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    const Tendas = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Compras</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("supermarket");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Supermercados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("convenience");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Pequenos supermercados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("seafood");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Pescaderías</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("butcher");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Carnicerías</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("clothes");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Tendas de roupa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("gift");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Tendas de regalos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("shoes");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Tendas de zapatos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("beverages");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Tendas de bebidas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("department_store");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Grandes almacenes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("bag");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Tendas de bolsas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("perfumery");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Perfumerías</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("photo");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Tendas de fotos</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    const Saude = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Saúde</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("pharmacy");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Farmacias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("hospital");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Hospitais</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("clinic");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Clínicas</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    const Outros = () => (
        <>
            <View style={{ padding: 5 }}>
                <Text style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>Transporte</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("bicycle_parking");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Parkings de bicicletas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("taxi");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Taxis</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("police");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Policía</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("atm");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Caixeiros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("toilets");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Baños públicos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyle.buttonContainerActionSheet, { margin: 5 }]} onPress={async () => {
                    const data = await getGeoByTagOutras("information");
                    addToMap(data);
                }}>
                    <Text style={buttonStyle.buttonTextActionSheet}>Puntos de información</Text>
                </TouchableOpacity>
            </View>
        </>
    )

    return (
        <ScrollView contentContainerStyle={{ justifyContent: "center", padding: 20 }}
            nestedScrollEnabled={true}
            onScrollEndDrag={() =>
                actionRef.handleChildScrollEnd()
            }
            onScrollAnimationEnd={() =>
                actionRef.handleChildScrollEnd()
            }
            onMomentumScrollEnd={() =>
                actionRef.handleChildScrollEnd()
            }
            style={{ marginBottom: 10 }}>
            <Turismo />
            <Hospedaxe />
            <Hostalaria />
            <Ocio />
            <Tendas />
            <Saude />
            <Outros />
        </ScrollView>
    )
}

export default ActionSheetContent;