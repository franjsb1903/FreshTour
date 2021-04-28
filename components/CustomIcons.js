import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { IconButton } from 'react-native-paper';

import properties from '../properties/properties_expo'

const HeartIconOutline = () => (
    <Icon name="heart-outline" size={30} color="#000" />
);

const HeartIcon = () => (
    <Icon name="heart" size={30} color="#000" />
);

const CalendarIcon = () => (
    <Icon name="calendar" size={30} color="#000" />
);

const CalendarOutlineIcon = () => (
    <Icon name="calendar-outline" size={30} color="#000" />
);

const MapIcon = () => (
    <Icon name="map" size={30} color="#000" />
);

const MapIconWhite = () => (
    <Icon name="map-outline" size={30} color="#fff" />
);

const ShareIcon = () => (
    <Icon name="share-outline" size={30} color={properties.style.color.iconColor} />
);

const SharedIcon = () => (
    <Icon name="share" size={30} color={properties.style.color.iconColor} />
);

const ShareIconBlack = () => (
    <Icon name="share-outline" size={30} color="#000" />
);

const SharedIconBlack = () => (
    <Icon name="share" size={30} color="#000" />
);

const SaveIcon = () => (
    <Icon name="bookmark-outline" size={30} color={properties.style.color.iconColor} />
);

const SavedIcon = () => (
    <Icon name="bookmark" size={30} color={properties.style.color.iconColor} />
);

const WalkIcon = () => (
    <Icon name="walk-outline" size={30} color={properties.style.color.iconColor} />
);

const BicycleIcon = () => (
    <Icon name="bicycle-outline" size={30} color={properties.style.color.iconColor} />
);

const WalkIconSelected = () => (
    <Icon name="walk-outline" size={30} color="red" />
);

const BicycleIconSelected = () => (
    <Icon name="bicycle-outline" size={30} color="red" />
);

const PlayIcon = () => (
    <Icon name="play" size={30} color="#000" />
);

const StopIcon = () => (
    <Icon name="stop" size={30} color="#000" />
);

const CloseIcon = () => (
    <Icon name="close" size={30} color="#000" />
);

const ChevronUpIcon = () => (
    <Icon name="chevron-up" size={30} color="#000" />
);

const ChevronDownIcon = () => (
    <Icon name="chevron-down" size={30} color="#000" />
);

const PointsInterestIcon = () => (
    <Icon name="business" size={30} color={properties.style.color.iconColor} />
);

const EditIcon = () => (
    <Icon name="create-outline" size={30} color="#000" />
);

export const MarkerIcon = () => (
    <MaterialIcons name="place" size={30} />
);

export const RouteIcon = () => (
    <MaterialIcons name="directions" size={30} />
);

export const CloseCircleIcon = () => (
    <Icon name="close-circle-outline" size={20} />
);

export const AvatarIcon = (props) => {

    const style = props.style;
    const size = props.size;

    return(
        <Icon name="person-circle-outline" size={size ? size : 80} style={style} />
    )   
}

export const SmallAvatarIcon = (props) => {

    const style = props.style;
    return(
        <Icon name="person-circle-outline" size={30} style={style} />
    )   
}

export const CommentIcon = (props) => {

    const style = props.style;
    return(
        <Icon name="chatbubble" size={30} style={style} />
    )   
}

export const HeartIconButton = (props) => {

    const style = props.style;
    const onQuitFav = props.onQuitFav;

    return (
        <IconButton
            icon={HeartIcon}
            onPress={() => {
                onQuitFav ? onQuitFav() : {}
            }}
            style={style} />
    )
};

export const HeartOutlineIconButton = (props) => {

    const style = props.style;
    const onPressFav = props.onPressFav;

    return (
        <IconButton
            icon={HeartIconOutline}
            onPress={() => {
                onPressFav ? onPressFav() : {}
            }}
            style={style} />
    )
};

export const CalendarIconButton = (props) => {

    const style = props.style;
    const item = props.item;
    const addToPlanificacion = props.addToPlanificacion;
    const changeAdd = props.changeAdd;
    const added = props.added;

    return (
        <IconButton
            icon={CalendarIcon}
            onPress={() => {
                addToPlanificacion ? addToPlanificacion(`${item.id}`, added) : {}
                changeAdd ? changeAdd(true) : {}
            }}
            style={style} />
    )
};

export const CalendarOutlineIconButton = (props) => {

    const style = props.style;
    const item = props.item;
    const addToPlanificacion = props.addToPlanificacion;
    const changeAdd = props.changeAdd;
    const added = props.added;
    const _onPress = props._onPress;

    return (
        <IconButton
            icon={CalendarOutlineIcon}
            onPress={() => {
                addToPlanificacion ? addToPlanificacion(`${item.id}`, added) : _onPress();
                changeAdd ? changeAdd(true) : {}
            }}
            style={style} />
    )
};

export const MapIconButton = (props) => {

    const showOnMap = props.showOnMap;
    const onMapClick = props.onMapClick;
    const item = props.item;
    const style = props.style;
    const white = props.white

    return (
        <IconButton
            icon={white ? MapIconWhite : MapIcon}
            onPress={() => showOnMap ? showOnMap(`${item.id}`) : onMapClick()}
            style={style} />
    )
};

export const ShareIconButton = (props) => {

    const _onPress = props._onPress;
    return (
        <IconButton
            icon={ShareIcon}
            onPress={() => _onPress ? _onPress() : {}}
        />
    )
}

export const SharedIconButton = (props) => {
    const _onPress = props._onPress;
    return (
        <IconButton
            icon={SharedIcon}
            onPress={() => _onPress ? _onPress() : {}}
        />
    )
}

export const ShareIconButtonBlack = (props) => {

    const _onPress = props._onPress;

    return (
        <IconButton
            icon={ShareIconBlack}
            onPress={() => _onPress()}
        />
    )
}

export const SharedIconButtonBlack = (props) => {

    const _onPress = props._onPress;

    return (
        <IconButton
            icon={SharedIconBlack}
            onPress={() => _onPress()}
        />
    )
}

export const SaveIconButton = (props) => {

    const _onPress = props._onPress;

    return (
        <IconButton
            icon={SaveIcon}
            onPress={() => _onPress()}
        />
    )
}

export const SavedIconButton = () => {

    return (
        <IconButton
            icon={SavedIcon}
        />
    )
}

export const WalkIconButton = (props) => {

    const walking = props.walking;
    const changeProfile = props.changeProfile;

    return (
        <IconButton
            icon={walking ? WalkIconSelected : WalkIcon}
            onPress={() => changeProfile()}
        />
    )
}

export const BicycleIconButton = (props) => {

    const walking = props.walking;
    const changeProfile = props.changeProfile;

    return (
        <IconButton
            icon={walking ? BicycleIcon : BicycleIconSelected}
            onPress={() => changeProfile()}
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
    const closeIconOnPress = props.closeIconOnPress;
    return (
        <IconButton
            icon={CloseIcon}
            onPress={() => {
                closeIconOnPress ? closeIconOnPress() : {};
            }}
            style={style}
        />
    )
}

export const ChevronUpIconButton = (props) => {

    const style = props.style;
    const changeOrderUp = props.onPressIcon;
    const id = props.id;

    return (
        <IconButton
            icon={ChevronUpIcon}
            onPress={() => changeOrderUp(id)}
            style={style}
        />
    )
}

export const ChevronDownIconButton = (props) => {

    const style = props.style;
    const changeOrderDown = props.onPressIcon;
    const id = props.id;

    return (
        <IconButton
            icon={ChevronDownIcon}
            onPress={() => changeOrderDown(id)}
            style={style}
        />
    )
}

export const PointsInterestIconButton = (props) => {

    const navigate = props.navigate;
    const updateSelected = props.updateSelected;

    return (
        <IconButton
            icon={PointsInterestIcon}
            onPress={() => {
                navigate("Turism", {
                    updateItem: updateSelected
                });
            }}
        />
    );
}

export const CloseCircleIconButton = (props) => {

    const clear = props.clear;
    const styles = props.style;

    return (
        <IconButton
            icon={CloseCircleIcon}
            onPress={() => {
                clear();
            }}
            style={styles}
        />
    );
}

export const EditIconButton = (props) => {

    const onPress = props.onPress;
    const styles = props.style;

    return (
        <IconButton
            icon={EditIcon}
            onPress={() => {
                onPress ? onPress() : {}
            }}
            style={styles}
        />
    );
}