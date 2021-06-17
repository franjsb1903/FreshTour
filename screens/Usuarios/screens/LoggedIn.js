/**
 * @fileoverview Pantalla de usuario ca sesión iniciada
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, useEffect, useState, Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// compoñentes
import { AvatarIcon } from '../../../components/CustomIcons';
import ListItemMenuUser from '../../../components/ListItemMenuUser';

// propiedades
import properties from '../../../properties/properties_expo';

// modelo
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
} from '../../../model/Lecer/Lecer';

// contexto
import AppContext from '../../../context/AppContext';

// estilos
import { loggedIn as styles, customTouchableOpacity as button, stylesTurismoList as bar } from '../../../styles/styles';

/**
 * Compoñente que conforma a pantalla de usuario ca sesión xa iniciada
 * @param {Object} props 
 * @returns {Component}
 */
const LoggedIn = (props) => {

    const [elementosFav, setElementosFav] = useState([]);               // Estado que almacena os elementos turísticos favoritos do usuario
    const [opinions, setOpinions] = useState([]);                       // Estado que almacena as opinións do usuario
    const [planificacions, setPlanificacions] = useState([]);           // Estado que almacena as planificacións gardadas polo usuario
    const [planificacionsFav, setPlanificacionsFav] = useState([]);     // Estado que almacena as planificacións favoritas do usuario
    const [hospedaxesFav, setHospedaxesFav] = useState([]);             // Estado que almacena os elementos de hospedaxe favoritos do usuario
    const [hostalariaFav, setHostalariaFav] = useState([]);             // Estado que almacena os elementos de hostalaría favoritos do usuario
    const [ocioFav, setOcioFav] = useState([]);                         // Estado que almacena os elementos de ocio do usuario
    const [outrasFav, setOutrasFav] = useState([]);                     // Estado que almacena os outros elementos do usuario

    const context = useContext(AppContext);                             // Constante para acceder ao contexto
    const user = context.user;                                          // Usuario almacenado no contexto
    const logout = props.logout;                                        // Función para cerrar sesión

    /**
     * Execútase cando cambian os elementos turísticos favoritos no contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setElementosFav(context.user.elementosFav);
        }

        return () => mounted = false;
    }, [context.user.elementosFav]);

    /**
     * Execútase cando cambian as opinións no contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setOpinions(context.user.opinions);
        }

        return () => mounted = false;
    }, [context.user.opinions]);

    /**
     * Execútase cando cambian as planificacións almacenadas no contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setPlanificacions(context.user.planificacions);
        }

        return () => mounted = false;

    }, [context.user.planificacions])

    /**
     * Execútase cando cambian as planificacións favoritas no contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setPlanificacionsFav(context.user.planificacionsFav);
        }

        return () => mounted = false;

    }, [context.user.planificacionsFav])

    /**
     * Execútase cando cambian os elementos de hospedaxe favoritos no contexto
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setHospedaxesFav(context.user.hospedaxesFav);
        }

        return () => mounted = false;

    }, [context.user.hospedaxesFav])

    /**
     * Execútase cando cambian os elementos de hostalaría favoritos
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setHostalariaFav(context.user.hostalariaFav);
        }

        return () => mounted = false;

    }, [context.user.hostalariaFav])

    /**
     * Execútase cando cambian os elementos de ocio favoritos
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setOcioFav(context.user.ocioFav);
        }

        return () => mounted = false;

    }, [context.user.ocioFav])

    /**
     * Execútase cando cambian as outras actividades favoritas
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setOutrasFav(context.user.outrasFav);
        }

        return () => mounted = false;

    }, [context.user.outrasFav])

    const navigation = useNavigation();                 // Instancia da navegación

    const MenuUser = [                                  // Elementos do menú do usuario
        {
            id: 1,
            label: "Rutas favoritas",
            data: planificacionsFav,
            onPress: () => navigation.navigate('RutasFavoritas', {
                data: planificacionsFav
            })
        },
        {
            id: 2,
            label: "As miñas rutas",
            data: planificacions,
            onPress: () => navigation.navigate('RutasUsuario', {
                planificacions: planificacions
            })
        },
        {
            id: 3,
            label: "Elementos turisticos favoritos",
            data: elementosFav,
            onPress: () => navigation.navigate('Turism', {
                data: elementosFav,
                updateItem: context.updateGeoMap
            })
        },
        {
            id: 4,
            label: "Comentarios e valoracions",
            data: opinions,
            onPress: () => navigation.navigate('OpinionsUser', {
                opinions: opinions,
                usuario: user.user.usuario
            })
        },
        {
            id: 5,
            label: "Lugares de hospedaxe favoritos",
            data: hospedaxesFav,
            onPress: () => navigation.navigate('HospedaxeList', {
                data: hospedaxesFav,
                updateItem: context.updateGeoMap
            })
        },
        {
            id: 6,
            label: "Lugares de hostalaría favoritos",
            data: hostalariaFav,
            onPress: () => navigation.navigate('CommonLecerList', {
                data: hostalariaFav,
                updateItem: context.updateGeoMap,
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
                titulo: "Lugares de hostalaría favoritos"
            })
        },
        {
            id: 7,
            label: "Actividades de ocio favoritas",
            data: ocioFav,
            onPress: () => navigation.navigate('CommonLecerList', {
                data: ocioFav,
                updateItem: context.updateGeoMap,
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
                titulo: "Actividades de ocio favoritas"
            })
        },
        {
            id: 8,
            label: "Outras actividades favoritas",
            data: outrasFav,
            onPress: () => navigation.navigate("CommonLecerList", {
                data: outrasFav,
                updateItem: context.updateGeoMap,
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
        },
        {
            id: 9,
            label: "Pechar sesión",
            onPress: () => {
                logout();
            }
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AvatarIcon style={styles.icon} />
                <Text style={styles.title}>{user.user.usuario}</Text>
                <TouchableOpacity style={button.buttonContainerFlex} onPress={() => {
                    navigation.navigate('EditarUsuario', {
                        user: user.user
                    });
                }}>
                    <Text style={button.buttonTextSmaller}>
                        Editar
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.data}>
                <Text style={styles.textData}>Membro dende o {user.user.data}</Text>
            </View>
            <View style={styles.menuUser}>
                {
                    MenuUser.map(item => {
                        return (
                            <ListItemMenuUser key={item.id} data={item} />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default LoggedIn;