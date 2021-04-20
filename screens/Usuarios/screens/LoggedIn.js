import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AvatarIcon } from '../../../components/CustomIcons';
import ListItemMenuUser from '../../../components/ListItemMenuUser';

import AppContext from '../../../context/PlanificadorAppContext';

import { loggedIn as styles, customTouchableOpacity as button } from '../../../styles/styles';

const LoggedIn = (props) => {

    const [elementosFav, setElementosFav] = useState([]);

    const context = useContext(AppContext);
    const user = context.user;
    const logout = props.logout;

    useEffect(() => {
        let mounted = true;

        if(mounted) {
            setElementosFav(context.user.elementosFav);
        }

        return () => mounted = false;
    }, [context.user.elementosFav]);

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
            data: user.opinions,
            onPress: () => console.log("Comentarios e valoracions")
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