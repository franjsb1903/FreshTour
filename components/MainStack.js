import React from 'react'
import { Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import TurismoList from '../screens/Turismo/TurismoList';
import TurismoItem from '../screens/Turismo/TurismoItem/TurismoItem';
import Register from '../screens/Usuarios/screens/auth/Register';
import Login from '../screens/Usuarios/screens/auth/Login';
import NovoComentario from '../screens/Opinions/NovoComentario';
import OpinionsUser from '../screens/Usuarios/Opinions/OpinionsUsuario';
import GardarPlanificacion from '../screens/PlanificadorTemporal/Rutas/Social/GardarPlanificacion';
import RutasUsuario from '../screens/Usuarios/Rutas/RutasUsuario';
import RutasRecomendadasItem from '../screens/PlanificadorTemporal/Rutas/RutasRecomendadasItem/RutasRecomendadasItem'

import { stylesApp as styles } from '../styles/styles';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Turism"
                component={TurismoList}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff",
                    headerTitle: ({ children: title }) => {
                        return (
                            <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
                        )
                    }
                })}
            />
            <Stack.Screen
                name="TurismoItem"
                component={TurismoItem}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff",
                    headerTitleAllowFontScaling: true,
                    headerTitle: ({ children: title }) => {
                        return (
                            <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
                        )
                    }
                })}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: true,
                    title: "Registro",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: true,
                    title: "Iniciar sesión",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="NewComment"
                component={NovoComentario}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff",
                    headerTitleAllowFontScaling: true,
                    headerTitle: ({ children: title }) => {
                        return (
                            <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
                        )
                    }
                })}
            />
            <Stack.Screen
                name="OpinionsUser"
                component={OpinionsUser}
                options={{
                    headerShown: true,
                    title: "Comentarios e valoracións",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="GardarPlanificacion"
                component={GardarPlanificacion}
                options={{
                    headerShown: true,
                    title: "Gardar planificación",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="RutasUsuario"
                component={RutasUsuario}
                options={{
                    headerShown: true,
                    title: "As miñas rutas",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="RutasRecomendadasItem"
                component={RutasRecomendadasItem}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title,
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff",
                    headerTitleAllowFontScaling: true,
                    headerTitle: ({ children: title }) => {
                        return (
                            <Text style={styles.headerTitle} numberOfLines={2}>{title}</Text>
                        )
                    }
                })}
            />
        </Stack.Navigator>
    )
}

export default MainStack;