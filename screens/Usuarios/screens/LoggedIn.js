import React from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';

import { AvatarIcon } from '../../../components/CustomIcons';
import ListItemMenuUser from '../../../components/ListItemMenuUser';

import { loggedIn as styles, customTouchableOpacity as button } from '../../../styles/styles';

const LoggedIn = (props) => {

    const user = props.user;
    const logout = props.logout;

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
            data: user.elementosFav,
            onPress: () => console.log("Elementos turisticos favoritos")
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
            onPress: () => logout()
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