import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ToastAndroid, Alert, Platform } from 'react-native'
import { Card } from 'react-native-elements'

import ProgressBar from '../../components/ProgressBar'
import { getTurismData } from '../../Util/DataManagement'
import CardElement from '../../components/CardElement'

const Turism = () => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });

    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        let mounted = true;
        async function getData() {
            var data = await getTurismData();
            if (mounted) {
                setState({
                    loading: false,
                    data: data
                });
            }
        }
        getData();

        return () => mounted = false;

    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            var data = await getTurismData();
            setState({
                loading: false,
                data: data
            });
            if(Platform.OS == "android") {
                ToastAndroid.show('Puntos de interese actualizados', ToastAndroid.SHORT);
            } 
            setRefreshing(false);
        } catch(err) {
            console.error(err);
        }
    }

    return (

        state.loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {
                    state.data.map(element => {
                        return (
                            <TouchableOpacity 
                            key={element.id}
                            onPress={() => console.log(element.titulo)}>
                                <CardElement item={element} />
                            </TouchableOpacity>
                        )
                    })
                }
                <Text></Text>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

export default Turism;