import React, { useState, useEffect, useContext } from 'react';
import { View, ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { stylesTurismoList as progress } from '../../styles/styles';

import { getToken, shouldDeleteToken, storeToken, deleteToken } from '../../Util/TokenUtil'

import { getUserByToken } from '../../model/Usuarios/Usuarios'
import ProgressBar from '../../components/ProgressBar';

import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn';

import AppContext from '../../context/PlanificadorAppContext';
import { registerUser, loginUser } from '../../model/Usuarios/Usuarios';

const User = () => {

    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const context = useContext(AppContext);
    const isFocused = useIsFocused();

    const changeLoading = (value) => {
        setLoading(value);
    }

    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();
        const signal = abortController.signal;

        const getUser = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    setLoggedIn(false);
                }
                const token = await getToken('id_token');
                if (token) {
                    const data = await getUserByToken(token, signal);
                    if (!data.auth) {
                        if (!await shouldDeleteToken(data.message, 'id_token')) {
                            ToastAndroid.show(data.message, ToastAndroid.SHORT);
                        }
                        if (mounted) {
                            setLoading(false);
                        }
                        return false;
                    }
                    delete data.token;
                    if (mounted) {
                        context.setUser(data);
                        setLoggedIn(true);
                    }
                }
                if (mounted) {
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (mounted)
            getUser();

        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [isFocused]);

    const register = async (user) => {
        try {
            const data = await registerUser(user);
            if (!data.auth) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return false;
            }
            await storeToken('id_token', data.token);
            delete data.token;
            context.setUser(data);
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
            await storeToken('id_token', data.token);
            delete data.token;
            context.setUser(data);
            return true;
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no rexistro, tenteo de novo', ToastAndroid.SHORT);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            await deleteToken('id_token');
            context.resetUser();
            ToastAndroid.show("Sesión pechada satisfactoriamente", ToastAndroid.SHORT);
            setLoading(false);
            setLoggedIn(false);
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
            loggedIn ?
                <LoggedIn logout={logout} />
                :
                <NotLoggedIn login={login} register={register} changeLoading={changeLoading} />

    )
}

export default User;