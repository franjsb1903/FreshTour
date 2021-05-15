import * as SecureStore from 'expo-secure-store';

export const getToken = async (id) => {
    try {
        const token = await SecureStore.getItemAsync(id);
        return token;
    } catch (err) {
        throw new Error(err);
    }
}

export const shouldDeleteToken = async (message, id) => {
    try {
        console.log("Debe expirar?");
        if (message === "jwt expired") {
            console.log(message, id);
            await SecureStore.deleteItemAsync(id);
            return true;
        }
        return false;
    } catch (err) {
        throw new Error(err);
    }
}

export const storeToken = async (id, token) => {
    try {
        await SecureStore.setItemAsync(id, token);
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteToken = async (id) => {
    try {
        await SecureStore.deleteItemAsync(id);
    } catch (err) {
        throw new Error(err);
    }
}