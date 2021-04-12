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

const ShareIcon = () => (
    <Icon name="share-outline" size={30} />
);

const SaveIcon = () => (
    <Icon name="bookmark-outline" size={30} />
);

const WalkIcon = () => (
    <Icon name="walk-outline" size={30} />
);

const BicycleIcon = () => (
    <Icon name="bicycle-outline" size={30} />
);

export const HeartIconButton = (props) => {

    const style = props.style;

    return (
        <IconButton
            icon={HeartIcon}
            onPress={() => console.log("hola")}
            style={style} />
    )
};

export const CalendarIconButton = (props) => {

    const style = props.style;
    const item = props.item;
    const addToPlanificacion = props.addToPlanificacion;

    return (
        <IconButton
            icon={CalendarIcon}
            onPress={() => addToPlanificacion ? addToPlanificacion(`${item.id}`) : console.log("Not function")}
            style={style} />
    )
};

export const MapIconButton = (props) => {

    const showOnMap = props.showOnMap;
    const item = props.item;
    const style = props.style;

    return (
        <IconButton
            icon={MapIcon}
            onPress={() => showOnMap ? showOnMap(`${item.id}`) : console.log("Not function")}
            style={style} />
    )
};

export const ShareIconButton = () => {
    return (
        <IconButton
            icon={ShareIcon}
            onPress={() => console.log("Share")}
        />
    )
}

export const SaveIconButton = () => {
    return (
        <IconButton
            icon={SaveIcon}
            onPress={() => console.log("Save")}
        />
    )
}

export const WalkIconButton = () => {
    return (
        <IconButton
            icon={WalkIcon}
            onPress={() => console.log("Walk")}
        />
    )
}

export const BicycleIconButton = () => {
    return (
        <IconButton
            icon={BicycleIcon}
            onPress={() => console.log("Bicycle")}
        />
    )
}