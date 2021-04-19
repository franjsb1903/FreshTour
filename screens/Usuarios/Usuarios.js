import React, { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { registerUser, loginUser } from '../../model/Usuarios/Usuarios';
import { stylesTurismoList as progress } from '../../styles/styles';

import ProgressBar from '../../components/ProgressBar';

import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn';

const User = () => {

    const [user, setUser] = useState({
        user: {},
        isLoggedIn: false,
        planificacions: [],
        planificacionsFav: [],
        opinions: [],
        elementosFav: []
    });

    const [loading, setLoading] = useState(false);

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
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await AsyncStorage.setItem('id_token', data.token);
            setUser({
                user: data.user,
                isLoggedIn: true,
                planificacions: data.planificacions,
                planificacionsFav: data.planificacionsFav,
                opinions: data.opinions,
                elementosFav: data.elementosFav
            });
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            await AsyncStorage.removeItem('id_token');
            setUser({
                user: {},
                isLoggedIn: false,
                planificacions: [],
                planificacionsFav: [],
                opinions: [],
                elementosFav: []
            });
            ToastAndroid.show("Sesión pechada satisfactoriamente", ToastAndroid.SHORT);
            setLoading(false);
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no peche de sesión', ToastAndroid.SHORT);
        }
    }

    return (

        loading ?
            <View style={progress.container}>
                <ProgressBar />
            </View>
            :
            user.isLoggedIn ?
                <LoggedIn user={user} logout={logout} />
                :
                <NotLoggedIn register={register} login={login} />

    )
}

export default User;