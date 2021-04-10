import React from 'react'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomStarsDisplay = (props) => {
    const value = props.value;
    const style = props.style;
    return (
        <Stars
            display={value}
            spacing={4}
            count={5}
            starSize={10}
            fullStar={<Icon name="star" size={20} />}
            emptyStar={<Icon name="star-outline" size={20} />}
            halfStar={<Icon name="star-half-outline" size={20} />}
        />
    )
}

export default CustomStarsDisplay;