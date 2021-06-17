/**
 * @fileoverview Pantalla común en Info
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { ScrollView } from 'react-native'

// estilos
import { stylesScroll } from '../../../styles/styles'

/**
 * Compoñente que conforma a pantalla común en Info
 * @param {Object} props 
 * @returns {Component}
 */
const Common = (props) => {
    const Content = props.route.params.Content;             // Compoñente a amosar na pantalla
    const titulo = props.route.params.titulo;               // Título da pantalla

    /**
     * Cando se monta o compoñente, execútase o contido da función
     */
    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({                   // Fíxanse opcións de navegación da presente pantalla
                title: titulo
            })
        }

        return () => mounted = false;
    }, []);

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={[stylesScroll.containerScroll, { padding: 20 }]}>
            <Content />
        </ScrollView>
    )

}

export default Common;