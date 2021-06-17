/**
 * @fileoverview Pantalla de usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useEffect, useContext, Component } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

// estilos
import { stylesTurismoList as progress } from '../../styles/styles';

// Util
import { getToken, shouldDeleteToken, storeToken, deleteToken } from '../../Util/TokenUtil'

// modelo
import { getUserByToken } from '../../model/Usuarios/Usuarios'
import { registerUser, loginUser } from '../../model/Usuarios/Usuarios';

// compoñentes
import ProgressBar from '../../components/ProgressBar';

// pantallas
import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn';

// contexto
import AppContext from '../../context/AppContext';

/**
 * Compoñente que conforma a pantalla de usuario da aplicación
 * @returns {Component}
 */
const User = () => {

    const [loading, setLoading] = useState(false);              // Estado que indica se a pantalla está cargando
    const [loggedIn, setLoggedIn] = useState(false);            // Estado que indica se o usuario ten iniciada a sesión

    const context = useContext(AppContext);                     // Constante que permite acceder ao contexto
    const isFocused = useIsFocused();                           // Instancia que indica cando se accede á pantalla

    const changeLoading = (value) => {
        setLoading(value);
    }

    /**
     * Execútase cando se accede á pantalla, tratando de iniciar a sesión do usuario a partir do seu token almacenado no dispositivo, se é que existe
     */
    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();                      // Control da petición
        const signal = abortController.signal;

        const getUser = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    setLoggedIn(false);
                }
                const token = await getToken('id_token');                   // Obtense o token de usuario
                if (token) {
                    const data = await getUserByToken(token, signal);       // Trátase de iniciar a sesión a partir do token
                    if (!data.auth) {
                        if (!await shouldDeleteToken(data.message, 'id_token')) {
                            showMessage({
                                message: data.message,
                                type: "danger",
                                position: "bottom",
                                icon: "danger"
                            });
                        }
                        if (mounted) {
                            setLoading(false);
                        }
                        return false;
                    }
                    if (mounted) {
                        context.setUser(data);                              // Gárdase o usuario no contexto
                        setLoggedIn(true);                                  // Indícase que o usuario iniciou sesión
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

    /**
     * Rexistra ao usuario na plataforma
     * @param {Object} user 
     * @returns {Boolean}
     */
    const register = async (user) => {
        try {
            const data = await registerUser(user);
            if (!data.auth) {
                showMessage({
                    message: data.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return false;
            }
            await storeToken('id_token', data.token);               // Garda o token de usuario obtido da resposta
            context.setUser(data);                                  // Garda ao usuario no contexto
            return true;
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no rexistro, tenteo de novo',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Inicia a sesión do usuario
     * @param {Object} user 
     * @returns {Boolean}
     */
    const login = async (user) => {
        try {
            const data = await loginUser(user);
            if (!data.auth) {
                showMessage({
                    message: data.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return false;
            }
            await storeToken('id_token', data.token);                   // Garda o token do usuario obtido da resposta
            context.setUser(data);                                      // Garda ao usuario no contexto
            return true;
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no login, tenteo de novo',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Cerra a sesión do usuario
     */
    const logout = async () => {
        try {
            setLoading(true);
            await deleteToken('id_token');                                  // Borra o token do usuario
            context.resetUser();
            showMessage({
                message: 'Sesión pechada satisfactoriamente',
                type: "success",
                position: "bottom",
                icon: "success"
            });
            setLoading(false);
            setLoggedIn(false);
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no peche de sesión',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
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