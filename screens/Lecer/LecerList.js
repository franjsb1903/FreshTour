import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylesScroll } from '../../styles/styles';
import CardElement from '../../components/CardElementInfo';
import properties from '../../properties/properties_expo'

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
    favFilterSortOcio,
    getAllOutras,
    getGeoElementOutras,
    filterSortOutras,
    addFavOutras,
    quitFavOutras,
    getByNameOutras,
    getFavByNameOutras,
    favFilterSortOutras
} from '../../model/Lecer/Lecer';

const LecerList = (props) => {

    const navigation = useNavigation();

    const updateItem = props.route.params.updateItem;

    const cardsData = [
        {
            id: 1,
            label: "Hostalaría",
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
                itemsDropDown: properties.dropdown.items.hostalaria,
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
                itemsDropDown: properties.dropdown.items.ocio,
                titulo: "Actividades de ocio"
            }),
        },
        {
            id: 3,
            label: "Outras actividades",
            data: [],
            onPress: () => navigation.navigate("CommonLecerList", {
                updateItem: updateItem,
                model: {
                    getAll: getAllOutras,
                    getGeoElement: getGeoElementOutras,
                    filterSort: filterSortOutras,
                    addFav: addFavOutras,
                    quitFav: quitFavOutras,
                    getByName: getByNameOutras,
                    getFavByName: getFavByNameOutras,
                    favFilterSort: favFilterSortOutras
                },
                itemsDropDown: properties.dropdown.items.outras,
                titulo: "Outras actividades"
            })
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