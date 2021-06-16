/**
 * @fileoverview Estrelas de selección
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Compoñente de estrelas de selección
 * @param {Object} props 
 * @returns {Component}
 */
const CustomStarsSelection = (props) => {

    const style = props.style;                          // Estilos
    const starValue = props.valoracion;                 // Valor das estrelas
    const updateValoracion = props.updateValoracion;    // Función que actualiza o valor das estrelas
    
    return (
        <Stars
            half={true}
            default={starValue}
            update={(val) => updateValoracion(val)}
            spacing={4} 
            count={5}
            starSize={50}
            fullStar={<Icon name="star" size={50} />}
            emptyStar={<Icon name="star-outline" size={50} />}
            halfStar={<Icon name="star-half-outline" size={50} />}
        />
    )
}

export default CustomStarsSelection;