import React, { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { registerUser, loginUser } from '../../model/Usuarios/Usuarios'

import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn';

const User = () => {

    const [user, setUser] = useState({
        user: {},
        isLoggedIn: false
    });

    const register = async (user) => {
        try {
            const data = await registerUser(user);
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await AsyncStorage.setItem('id_token', data.token);
            setUser({
                user: data.user,
                isLoggedIn: true
            });
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    const login = async (user) => {
        try {
            const data = await loginUser(user);
            console.log(data);
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await AsyncStorage.setItem('id_token', data.token);
            setUser({
                user: data.user,
                isLoggedIn: true
            });
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    return (

        user.isLoggedIn ?
            <LoggedIn user={user.user} />
            :
            <NotLoggedIn register={register} login={login} />
    )
}

export default User;