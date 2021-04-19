import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { registerUser, loginUser } from '../model/Usuarios/Usuarios';
import UserContext from './UserContext';

const UserContextProvider = (props) => {

    const changeIsLoggedIn = props.changeIsLoggedIn;
    const changeLoading = props.changeLoading;

    const [user, setUser] = useState({
        user: {},
        isLoggedIn: false,
        planificacions: [],
        planificacionsFav: [],
        opinions: [],
        elementosFav: []
    });

    const register = async (user) => {
        try {
            const data = await registerUser(user);
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await SecureStore.setItemAsync('id_token', data.token);
            setUser({
                user: data.user,
                isLoggedIn: true
            });
            changeIsLoggedIn(true);
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    const login = async (user) => {
        try {
            const data = await loginUser(user);
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await SecureStore.setItemAsync('id_token', data.token);
            setUser({
                user: data.user,
                isLoggedIn: true,
                planificacions: data.planificacions,
                planificacionsFav: data.planificacionsFav,
                opinions: data.opinions,
                elementosFav: data.elementosFav
            });
            changeIsLoggedIn(true);
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    const logout = async () => {
        try {
            changeLoading(true);
            await SecureStore.deleteItemAsync('id_token');
            setUser({
                user: {},
                isLoggedIn: false,
                planificacions: [],
                planificacionsFav: [],
                opinions: [],
                elementosFav: []
            });
            changeIsLoggedIn(false);
            ToastAndroid.show("Sesión pechada satisfactoriamente", ToastAndroid.SHORT);
            changeLoading(false);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no peche de sesión', ToastAndroid.SHORT);
        }
    }

    const settings = {
        user: user,
        register: register,
        login: login,
        logout: logout
    }

    return (
        <UserContext.Provider value={settings}>
            {
                props.children
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider;