/**
 * @fileoverview Pantalla de elementos a visitar dunha ruta recomendada
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

// compoñentes
import NoData from '../../../../components/NoData';
import CardElement from '../../../../components/CardElementTurismo';
import CardElementLecer from '../../../../components/CardElementLecer';

// estilos
import { stylesScroll as styles } from '../../../../styles/styles'

/**
 * Compoñente que conforma a pantalla de elementos a visitar dunha ruta recomendada
 * @param {Object} props 
 * @returns {Component}
 */
const ElementosVisitar = (props) => {

    const elements = props.elements;                        // Array de elementos da ruta

    const navigation = useNavigation();                     // Constante para empregar a navegación

    /**
     * Constrúe a lista dos elementos
     * @param {Object} props 
     * @returns {Component}
     */
    const ListData = (props) => {

        const data = props.data.elementos;                  // Elementos a listar

        return (

            data.map(element => {
                return (
                    <TouchableOpacity
                        key={element.id}
                        onPress={() => element.tipo != "Hospedaxe" && element.tipo != "Hostalaría" && element.tipo != "Ocio" && element.tipo != "Outra" ? navigation.navigate('TurismoItem', {
                            element: element,
                            isRuta: true,
                            isElementoRuta: true
                        }) : {}}>
                            {
                                element.tipo != "Hospedaxe" && element.tipo != "Hostalaría" && element.tipo != "Ocio" && element.tipo != "Outra" ?
                                <CardElement item={element} isRuta={true} />
                                :
                                <CardElementLecer element={element} isRuta={true} />
                            }
                        
                    </TouchableOpacity>
                )
            })

        )
    }

    return (
        elements == undefined || elements.length == 0 ?
            <NoData />
            :
            <ScrollView contentContainerStyle={styles.containerScroll} >
                <ListData data={elements} />
            </ScrollView>
    )
}

export default ElementosVisitar;