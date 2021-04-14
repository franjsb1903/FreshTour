import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { IconButton } from 'react-native-paper';

const HeartIcon = () => (
    <Icon name="heart-outline" size={30} />
);

const CalendarIcon = () => (
    <Icon name="calendar" size={30} />
);

const CalendarOutlineIcon = () => (
    <Icon name="calendar-outline" size={30} />
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

const PlayIcon = () => (
    <Icon name="play" size={30} color="#fff" />
);

const StopIcon = () => (
    <Icon name="stop" size={30} color="#fff" />
);

const CloseIcon = () => (
    <Icon name="close" size={30} color="#fff" />
);

const ChevronUpIcon = () => (
    <Icon name="chevron-up" size={30} color="#fff" />
);

const ChevronDownIcon = () => (
    <Icon name="chevron-down" size={30} color="#fff" />
);

export const MarkerIcon = () => (
    <MaterialIcons name="place" size={30} />
);

export const RouteIcon = () => (
    <MaterialIcons name="directions" size={30} />
)

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
    const changeAdd = props.changeAdd;

    return (
        <IconButton
            icon={CalendarIcon}
            onPress={() => {
                addToPlanificacion ? addToPlanificacion(`${item.id}`) : console.log("Not function");
                changeAdd(true);
            }}
            style={style} />
    )
};

export const CalendarOutlineIconButton = (props) => {

    const style = props.style;
    const item = props.item;
    const addToPlanificacion = props.addToPlanificacion;
    const changeAdd = props.changeAdd;

    return (
        <IconButton
            icon={CalendarOutlineIcon}
            onPress={() => {
                addToPlanificacion ? addToPlanificacion(`${item.id}`) : console.log("Not function");
                changeAdd(true);
            }}
            style={style} />
    )
};

export const MapIconButton = (props) => {

    const showOnMap = props.showOnMap;
    const onMapClick = props.onMapClick;
    const item = props.item;
    const style = props.style;

    return (
        <IconButton
            icon={MapIcon}
            onPress={() => showOnMap ? showOnMap(`${item.id}`) : onMapClick()}
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

export const PlayIconButton = () => {
    return (
        <IconButton
            icon={PlayIcon}
            onPress={() => console.log("Play")}
        />
    )
}

export const StopIconButton = () => {
    return (
        <IconButton
            icon={StopIcon}
            onPress={() => console.log("Stop")}
        />
    )
}

export const CloseIconButton = (props) => {
    const style = props.style;
    return (
        <IconButton
            icon={CloseIcon}
            onPress={() => console.log("Close")}
            style={style}
        />
    )
}

export const ChevronUpIconButton = (props) => {

    const style = props.style;

    return (
        <IconButton
            icon={ChevronUpIcon}
            onPress={() => console.log("Up")}
            style={style}
        />
    )
}

export const ChevronDownIconButton = (props) => {

    const style = props.style;

    return (
        <IconButton
            icon={ChevronDownIcon}
            onPress={() => console.log("Down")}
            style={style}
        />
    )
}