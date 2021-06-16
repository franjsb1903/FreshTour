/**
 * @fileoverview Estrelas de visualización
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Compoñente de estrelas de visualización
 * @param {Object} props 
 * @returns {Component}
 */
const CustomStarsDisplay = (props) => {

    const value = props.value;
    const style = props.style;
    return (
        <Stars
            display={value === null || value == 0 ? 0.1 : value}
            spacing={4}
            count={5}
            starSize={10}
            fullStar={<Icon name="star" size={20} />}
            emptyStar={<Icon name="star-outline" size={20} />}
            halfStar={<Icon name="star-half-outline" size={20} />}
            style={style}
        />
    )
}

export default CustomStarsDisplay;