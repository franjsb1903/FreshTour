import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native'

import { stylesScroll } from '../../../styles/styles'

const Common = (props) => {
    const text = props.route.params.text;
    const titulo = props.route.params.titulo;

    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({
                title: titulo
            })
        }

        return () => mounted = false;
    }, []);

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={[stylesScroll.containerScroll, { padding: 20 }]}>
            <Text style={styles.text}>{text}</Text>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#000",
        textAlign: "justify"
    }
});

export default Common;