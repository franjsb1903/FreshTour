import React, { useState } from 'react'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomStarsSelection = (props) => {

    const style = props.style;
    const starValue = props.valoracion;
    const updateValoracion = props.updateValoracion;
    
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