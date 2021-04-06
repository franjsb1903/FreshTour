import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

import ProgressBar from '../../components/ProgressBar'
import { getTurismData } from '../../DataManagement/DataManagement'

const Turism = () => {

    const [state, setState] = useState({
        loading: true,
        data: []
    });


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

    return (

        state.loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView>
                {
                    state.data.map(element => {
                        return (
                            <TouchableOpacity key={element.id} onPress={() => console.log(element.titulo)}>
                                <Card pointerEvents="none">
                                    <Card.Title>{element.titulo}</Card.Title>
                                    <Card.Divider />
                                    <Text> {element.resumo} </Text>
                                </Card>
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