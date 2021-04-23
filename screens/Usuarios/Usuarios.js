import React, { useState, useEffect, useContext } from 'react';
import { View, ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { stylesTurismoList as progress } from '../../styles/styles';

import ProgressBar from '../../components/ProgressBar';

import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn';

import AppContext from '../../context/PlanificadorAppContext';
import { registerUser, loginUser, addElementoFav as addElementoFavModel, getUserByToken } from '../../model/Usuarios/Usuarios';

const User = () => {

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const context = useContext(AppContext);

    useEffect(() => {

        let mounted = true;

        const getUser = async () => {
            if (mounted) {
                setLoading(true);
                const token = await SecureStore.getItemAsync('id_token');
                if (token) {
                    const data = await getUserByToken(token);
                    if (!data.auth) {
                        if(data.message == "jwt expired") {
                            await SecureStore.deleteItemAsync('id_token');
                        } else {
                            ToastAndroid.show(data.message, ToastAndroid.SHORT);
                        }
                        setLoading(false);
                        return false;
                    }
                    context.setUser(data);
                    setIsLoggedIn(true);
                }
                setLoading(false);
            }
        }
        getUser();
        return () => { mounted = false }
    }, []);

    const register = async (user) => {
        try {
            const data = await registerUser(user);
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await SecureStore.setItemAsync('id_token', data.token);
            context.setUser(data);
            setIsLoggedIn(true);
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
            context.setUser(data);
            setIsLoggedIn(true);
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            await SecureStore.deleteItemAsync('id_token');
            context.resetUser();
            setIsLoggedIn(false);
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
            isLoggedIn ?
                <LoggedIn logout={logout} />
                :
                <NotLoggedIn login={login} register={register} />

    )
}

export default User;