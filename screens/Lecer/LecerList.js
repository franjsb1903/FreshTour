import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylesScroll } from '../../styles/styles';
import CardElement from '../../components/CardElementInfo'

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
    favFilterSortOcio
} from '../../model/Lecer/Lecer';

const LecerList = (props) => {

    const navigation = useNavigation();

    const updateItem = props.route.params.updateItem;

    const cardsData = [
        {
            id: 1,
            label: "Hostaleria",
            onPress: () => navigation.navigate("CommonLecerList", {
                updateItem: updateItem,
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
                itemsDropDown: [
                    { label: 'Ordear por valoración', value: 'all_valoracion' },
                    { label: 'Ordear por título', value: 'all_titulo' },
                    { label: 'Bares por valoración', value: 'bares_titulo' },
                    { label: 'Bares por título', value: 'bares_valoracion' },
                    { label: 'Restaurantes por valoración', value: 'restaurantes_titulo' },
                    { label: 'Restaurantes por título', value: 'restaurantes_valoracion' },
                    { label: 'Cafés por valoración', value: 'cafes_titulo' },
                    { label: 'Cafés por título', value: 'cafes_valoracion' },
                    { label: 'Pubs por valoración', value: 'pubs_titulo' },
                    { label: 'Pubs por título', value: 'pubs_valoracion' },
                    { label: 'Zonas de comida por valoración', value: 'zonas_comida_titulo' },
                    { label: 'Zonas de comida por título', value: 'zonas_comida_valoracion' },
                    { label: 'Comida rápida por valoración', value: 'comida_rapida_titulo' },
                    { label: 'Comida rápida por título', value: 'comida_rapida_valoracion' },
                    { label: 'Xeaderías por valoración', value: 'xeaderias_titulo' },
                    { label: 'Xeaderías por título', value: 'xeaderias_valoracion' },
                    { label: 'Pastelerías por título', value: 'pastelerias_titulo' },
                    { label: 'Pastelerías por título', value: 'pastelerias_valoracion' },
                    { label: 'Panaderías por título', value: 'panaderias_titulo' },
                    { label: 'Panaderías por título', value: 'panaderias_valoracion' },
                    { label: 'Chocolaterías por título', value: 'chocolaterias_titulo' },
                    { label: 'Chocolaterías por valoración', value: 'chocolaterias_valoracion' }
                ],
                titulo: "Hostalaría"
            })
        },
        {
            id: 2,
            label: "Actividades de ocio",
            onPress: () => navigation.navigate("CommonLecerList", {
                updateItem: updateItem,
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
                itemsDropDown: [
                    { label: 'Ordear por valoración', value: 'all_valoracion' },
                    { label: 'Ordear por título', value: 'all_titulo' },
                    { label: 'Picnics por valoración', value: 'picnic_titulo' },
                    { label: 'Picnics por título', value: 'picnic_valoracion' },
                    { label: 'Sala de xogos por valoración', value: 'amusement_arcade_valoracion' },
                    { label: 'Sala de xogos por título', value: 'amusement_arcade_titulo' },
                    { label: 'Boleras por valoración', value: 'bowling_alley_valoracion' },
                    { label: 'Boleras por título', value: 'bowling_alley_titulo' },
                    { label: 'Escape rooms por valoración', value: 'escape_game_valoracion' },
                    { label: 'Escape rooms por título', value: 'escape_game_titulo' },
                    { label: 'Xardíns por valoración', value: 'garden_valoracion' },
                    { label: 'Xardíns por título', value: 'garden_titulo' },
                    { label: 'Parques por valoración', value: 'park_valoracion' },
                    { label: 'Parques por título', value: 'park_titulo' },
                    { label: 'Parques infantís por valoración', value: 'playground_valoracion' },
                    { label: 'Parques infantís por título', value: 'playground_titulo' },
                    { label: 'Estadios por título', value: 'stadium_valoracion' },
                    { label: 'Estadios por título', value: 'stadium_titulo' },
                    { label: 'Parques de camas elásticas por título', value: 'trampoline_park_valoracion' },
                    { label: 'Parques de camas elásticas por título', value: 'trampoline_park_titulo' },
                    { label: 'Zonas de deportes ao aire libre por valoración', value: 'pitch_valoracion' },
                    { label: 'Zonas de deportes ao aire libre por título', value: 'pitch_titulo' },
                    { label: 'Centros deportivos por valoración', value: 'sports_centre_valoracion' },
                    { label: 'Centros deportivos por título', value: 'sports_centre_titulo' }, 
                    { label: 'Terrazas por valoración', value: 'outdoor_seating_valoracion' },
                    { label: 'Terrazas por título', value: 'outdoor_seating_titulo' }, 
                    { label: 'Terrazas por valoración', value: 'outdoor_seating_valoracion' },
                    { label: 'Terrazas por título', value: 'outdoor_seating_titulo' },
                    { label: 'Zonas de baile por valoración', value: 'dance_valoracion' },
                    { label: 'Zonas de baile por título', value: 'dance_titulo' },
                    { label: 'Pabellóns deportivos por valoración', value: 'sports_hall_valoracion' },
                    { label: 'Pabellóns deportivos por título', value: 'sports_hall_titulo' },
                    { label: 'Cines por valoración', value: 'cinema_valoración' },
                    { label: 'Cines por título', value: 'cinema_titulo' },
                    { label: 'Teatros por valoración', value: 'theatre_valoracion' },
                    { label: 'Teatros por título', value: 'theatre_titulo' },
                    { label: 'Clubs nocturnos por valoración', value: 'nightclub_valoracion' },
                    { label: 'Clubs nocturnos por título', value: 'nightclub_titulo' },
                    { label: 'Miradores por valoración', value: 'viewpoint_valoracion' },
                    { label: 'Miradores por título', value: 'viewpoint_titulo' }
                ],
                titulo: "Actividades de ocio"
            }),
        },
        {
            id: 3,
            label: "Outras actividades",
            data: [],
            onPress: () => console.log("Ocio")
        }
    ];

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={[stylesScroll.containerScroll, { flexGrow: 1, justifyContent: "center" }]}>
            {
                cardsData.map(data => {
                    return (
                        <TouchableOpacity key={data.id} onPress={() => data.onPress()} style={{ margin: 20 }}>
                            <CardElement data={data} />
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}

export default LecerList;