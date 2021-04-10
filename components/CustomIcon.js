import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

const HeartIcon = () => (
    <Icon name="heart-outline" size={30} />
);

const CalendarIcon = () => (
    <Icon name="calendar" size={30} />
);

const MapIcon = () => (
    <Icon name="map" size={30} />
);

const HeartIconButton = (props) => {

    const style = props.style;

    return (
        <IconButton
            icon={HeartIcon} 
            onPress={() => console.log("hola")} 
            style={style} />
    )
};

const CalendarIconButton = (props) => {

    const style = props.style;

    return (
        <IconButton
            icon={CalendarIcon}
            onPress={() => console.log("object")}
            style={style} />
    )
};

const MapIconButton = (props) => {

    const showOnMap = props.showOnMap;
    const item = props.item;
    const style = props.style;

    return (
        <IconButton
            icon={MapIcon} 
            onPress={() => showOnMap(`${item.id}`)} 
            style={style} />
    )
};

export { HeartIconButton, CalendarIconButton, MapIconButton }