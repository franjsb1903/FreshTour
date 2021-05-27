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
import RutasRecomendadasItem from '../screens/PlanificadorTemporal/Rutas/RutasRecomendadasItem/RutasRecomendadasItem';
import RutasRecomendadasList from '../screens/PlanificadorTemporal/Rutas/RutasRecomendadasList'
import EditarUsuario from '../screens/Usuarios/Editar/Editar';
import InfoCommon from '../screens/Info/Screens/Common';
import CovidScreen from '../screens/Info/Screens/CovidScreen';
import InfoCalidadeAire from '../screens/Info/Screens/InfoCalidadeAire';
import CalidadeAireScreen from '../screens/Info/Screens/CalidadeAireScreen';
import HospedaxeList from '../screens/Hospedaxe/HospedaxeList'

import { stylesApp as styles } from '../styles/styles';
import HospedaxeItem from '../screens/Hospedaxe/HospedaxeItem';
import LecerList from '../screens/Lecer/LecerList';
import CommonLecerList from '../screens/Lecer/Common/CommonLecerList';
import CommonLecerItem from '../screens/Lecer/Common/CommonLecerItem';
import TempoScreen from '../screens/Info/Screens/TempoScreen';

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
            <Stack.Screen
                name="RutasFavoritas"
                component={RutasRecomendadasList}
                options={{
                    headerShown: true,
                    title: "Rutas favoritas",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="EditarUsuario"
                component={EditarUsuario}
                options={{
                    headerShown: true,
                    title: "Editar perfil",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="InfoCommon"
                component={InfoCommon}
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
                name="CovidScreen"
                component={CovidScreen}
                options={{
                    headerShown: true,
                    title: "COVID",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="TempoScreen"
                component={TempoScreen}
                options={{
                    headerShown: true,
                    title: "O TEMPO",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="CalidadeAireScreen"
                component={CalidadeAireScreen}
                options={{
                    headerShown: true,
                    title: "CALIDADE DO AIRE",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="InfoCalidadeAire"
                component={InfoCalidadeAire}
                options={{
                    headerShown: true,
                    title: "INFORMACIÓN CALIDADE AIRE",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="HospedaxeList"
                component={HospedaxeList}
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
                name="HospedaxeItem"
                component={HospedaxeItem}
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
                name="LecerList"
                component={LecerList}
                options={{
                    headerShown: true,
                    title: "Actividades de lecer",
                    headerStyle: styles.headerStyle,
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="CommonLecerList"
                component={CommonLecerList}
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
                name="CommonLecerItem"
                component={CommonLecerItem}
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
        </Stack.Navigator>
    )
}

export default MainStack;