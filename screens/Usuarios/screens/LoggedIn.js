import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AvatarIcon } from '../../../components/CustomIcons';
import ListItemMenuUser from '../../../components/ListItemMenuUser';

import AppContext from '../../../context/PlanificadorAppContext';

import { loggedIn as styles, customTouchableOpacity as button, stylesTurismoList as bar } from '../../../styles/styles';

const LoggedIn = (props) => {

    const [elementosFav, setElementosFav] = useState([]);
    const [opinions, setOpinions] = useState([]);
    const [planificacions, setPlanificacions] = useState([]);
    const [planificacionsFav, setPlanificacionsFav] = useState([]);
    const [hospedaxesFav, setHospedaxesFav] = useState([]);
    const [hostalariaFav, setHostalariaFav] = useState([]);

    const context = useContext(AppContext);
    const user = context.user;
    const logout = props.logout;

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setElementosFav(context.user.elementosFav);
        }

        return () => mounted = false;
    }, [context.user.elementosFav]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setOpinions(context.user.opinions);
        }

        return () => mounted = false;
    }, [context.user.opinions]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setPlanificacions(context.user.planificacions);
        }

        return () => mounted = false;

    }, [context.user.planificacions])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setPlanificacionsFav(context.user.planificacionsFav);
        }

        return () => mounted = false;

    }, [context.user.planificacionsFav])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setHospedaxesFav(context.user.hospedaxesFav);
        }

        return () => mounted = false;

    }, [context.user.hospedaxesFav])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setHostalariaFav(context.user.hostalariaFav);
        }

        return () => mounted = false;

    }, [context.user.hostalariaFav])

    const navigation = useNavigation();

    const MenuUser = [
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
            onPress: () => navigation.navigate('HostalariaList', {
                data: hostalariaFav,
                updateItem: context.updateGeoMap
            })
        },
        {
            id: 7,
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