import React, { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { registerUser, loginUser } from '../../model/Usuarios/Usuarios';
import { stylesTurismoList as progress } from '../../styles/styles';

import ProgressBar from '../../components/ProgressBar';

import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn';

import UserContextProvider from '../../context/UserContextProvider';

const User = () => {

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const changeLoading = (value) => {
        setLoading(value);
    }

    const changeIsLoggedIn = (value) => {
        setIsLoggedIn(value);
    }

    return (

        loading ?
            <View style={progress.container}>
                <ProgressBar />
            </View>
            :
            isLoggedIn ?
                <UserContextProvider changeLoading={changeLoading} changeIsLoggedIn={changeIsLoggedIn} >
                    <LoggedIn />
                </UserContextProvider>
                :
                <UserContextProvider changeIsLoggedIn={changeIsLoggedIn} >
                    <NotLoggedIn />
                </UserContextProvider>

    )
}

export default User;