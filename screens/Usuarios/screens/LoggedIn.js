import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import ProgressBar from '../../../components/ProgressBar';

import { AvatarIcon } from '../../../components/CustomIcons';
import ListItemMenuUser from '../../../components/ListItemMenuUser';

import AppContext from '../../../context/PlanificadorAppContext';

import { loggedIn as styles, customTouchableOpacity as button, stylesTurismoList as bar } from '../../../styles/styles';
import { getUserByToken } from '../../../model/Usuarios/Usuarios';


const LoggedIn = (props) => {

    const [elementosFav, setElementosFav] = useState([]);
    const [opinions, setOpinions] = useState([]);

    const [loading, setLoading] = useState(false);

    const context = useContext(AppContext);
    const user = context.user;
    const logout = props.logout;

    const isFocused = useIsFocused();

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

        const getUser = async () => {
            setLoading(true);
            const token = await SecureStore.getItemAsync('id_token');
            if (token) {
                const data = await getUserByToken(token);
                if (!data.auth) {
                    ToastAndroid.show(data.message, ToastAndroid.SHORT);
                    setLoading(false);
                    return false;
                }
                context.setUser(data);
            }
            setLoading(false);

        }
        if (mounted)
            getUser();
        return () => { mounted = false }
    }, [isFocused]);

    const navigation = useNavigation();

    const MenuUser = [
        {
            id: 1,
            label: "Rutas favoritas",
            data: user.planificacionsFav,
            onPress: () => console.log("Rutas favoritas")
        },
        {
            id: 2,
            label: "As miñas rutas",
            data: user.planificacionsFav,
            onPress: () => console.log("As miñas rutas")
        },
        {
            id: 3,
            label: "Elementos turisticos favoritos",
            data: elementosFav,
            onPress: () => navigation.navigate('Turism', {
                data: elementosFav
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
            label: "Pechar sesión",
            onPress: () => {
                logout();
            }
        }
    ];

    return (
        loading ?
            <View style={bar.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <AvatarIcon style={styles.icon} />
                    <Text style={styles.title}>{user.user.usuario}</Text>
                    <TouchableOpacity style={button.buttonContainerFlex}>
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