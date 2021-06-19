/**
 * @fileoverview Iconas a empregar na aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { IconButton } from 'react-native-paper';

// properties
import properties from '../properties/properties_expo'

/**
 * Icona de corazón
 * @returns {Component}
 */
const HeartIconOutline = () => (
    <Icon name="heart-outline" size={30} color="#000" />
);

/**
 * Icona de corazón cheo
 * @returns {Component}
 */
const HeartIcon = () => (
    <Icon name="heart" size={30} color="#b22222" />
);

/**
 * Icona de calendario cheo
 * @returns {Component}
 */
const CalendarIcon = () => (
    <Icon name="calendar" size={30} color="#000" />
);

/**
 * Icona de calendario
 * @returns {Component}
 */
const CalendarOutlineIcon = () => (
    <Icon name="calendar-outline" size={30} color="#000" />
);

/**
 * Icona de calendario cun + cheo
 * @returns {Component}
 */
const CalendarPlusIcon = () => (
    <FontAwesome name="calendar-plus" solid={true} size={30} color="#000" />
);

/**
 * Icona de calendario cun +
 * @returns {Component}
 */
const CalendarPlusOutlineIcon = () => (
    <FontAwesome name="calendar-plus" solid={false} size={30} color="#000" />
);

/**
 * Icona de mapa
 * @returns {Component}
 */
const MapIcon = () => (
    <Icon name="map" size={30} color="#000" />
);

/**
 * Icona de mapa blanco
 * @returns {Component}
 */
const MapIconWhite = () => (
    <Icon name="map-outline" size={30} color="#fff" />
);

/**
 * Icona de compartir
 * @returns {Component}
 */
const ShareIcon = () => (
    <Icon name="share-outline" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de compartido
 * @returns {Component}
 */
const SharedIcon = () => (
    <Icon name="share" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de compartir negro
 * @returns {Component}
 */
const ShareIconBlack = () => (
    <Icon name="share-outline" size={30} color="#000" />
);

/**
 * Icona de compartido negro
 * @returns {Component}
 */
const SharedIconBlack = () => (
    <Icon name="share" size={30} color="#000" />
);

/**
 * Icona de gardar
 * @returns {Component}
 */
const SaveIcon = () => (
    <Icon name="bookmark-outline" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de gardado
 * @returns {Component}
 */
const SavedIcon = () => (
    <Icon name="bookmark" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de camiñar
 * @returns {Component}
 */
const WalkIcon = () => (
    <Icon name="walk-outline" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de bicicleta
 * @returns {Component}
 */
const BicycleIcon = () => (
    <Icon name="bicycle-outline" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de camiñar seleccionado
 * @returns {Component}
 */
const WalkIconSelected = () => (
    <Icon name="walk-outline" size={30} color="red" />
);

/**
 * Icona de bicicleta seleccionado
 * @returns {Component}
 */
const BicycleIconSelected = () => (
    <Icon name="bicycle-outline" size={30} color="red" />
);

/**
 * Icona de play
 * @returns {Component}
 */
const PlayIcon = () => (
    <Icon name="play" size={30} color="#000" />
);

/**
 * Icona de stop
 * @returns {Component}
 */
const StopIcon = () => (
    <Icon name="stop" size={30} color="#000" />
);

/**
 * Icona de cerrar
 * @returns {Component}
 */
const CloseIcon = () => (
    <Icon name="close" size={30} color="#000" />
);

/**
 * Icona de frecha hacia arriba
 * @returns {Component}
 */
const ChevronUpIcon = () => (
    <Icon name="chevron-up" size={30} color="#000" />
);

/**
 * Icona de frecha hacia abaixo
 * @returns {Component}
 */
const ChevronDownIcon = () => (
    <Icon name="chevron-down" size={30} color="#000" />
);

/**
 * Icona de puntos de interese
 * @returns {Component}
 */
const PointsInterestIcon = () => (
    <Icon name="business" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de edición
 * @returns {Component}
 */
const EditIcon = () => (
    <Icon name="create-outline" size={30} color="#000" />
);

/**
 * Icona de cama
 * @returns {Component}
 */
const BedIcon = () => (
    <Icon name="bed" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de reloxo
 * @returns {Component}
 */
const ClockIcon = () => (
    <Icon name="time" size={30} color={properties.style.color.iconColor} />
);

/**
 * Icona de engadir novo elemento
 * @returns {Component}
 */
const PlusIcon = () => (
    <MaterialIcons name="add-circle" size={30} />
);

/**
 * Icona de refrescar
 * @returns {Component}
 */
export const RefreshIcon = () => (
    <Icon name="refresh" size={40} color={"#fff"} />
);

/**
 * Icona de papeleira
 * @returns {Component}
 */
export const BinIcon = () => (
    <Icon name="trash-bin" size={30} color={properties.style.color.iconColor} />
)

/**
 * Icona de marcador no mapa
 * @returns {Component}
 */
export const MarkerIcon = () => (
    <MaterialIcons name="place" size={30} />
);

/**
 * Icona de dirección
 * @returns {Component}
 */
export const RouteIcon = () => (
    <MaterialIcons name="directions" size={30} />
);

/**
 * Icona de cerrar redondeada
 * @returns {Component}
 */
export const CloseCircleIcon = () => (
    <Icon name="close-circle-outline" size={20} />
);

/**
 * Icona de avatar
 * @param {Object} props 
 * @returns {Component}
 */
export const AvatarIcon = (props) => {

    const style = props.style;              // Estilo
    const size = props.size;                // Tamaño

    return (
        <Icon name="person-circle-outline" size={size ? size : 80} style={style} />
    )
}

/**
 * Icona de avatar pequeno
 * @param {Object} props 
 * @returns {Component}
 */
export const SmallAvatarIcon = (props) => {

    const style = props.style;              // Estilo
    return (
        <Icon name="person-circle-outline" size={30} style={style} />
    )
}

/**
 * Icona de comentario
 * @param {Object} props 
 * @returns {Component}
 */
export const CommentIcon = (props) => {

    const style = props.style;              // Estilo
    return (
        <Icon name="chatbubble" size={30} style={style} />
    )
}

/**
 * Icona de cara feliz
 * @param {Object} props 
 * @returns {Component}
 */
export const HappyIcon = (props) => {

    const size = props.size;                // Tamaño
    const styles = props.styles;            // Estilo

    return (
        <MaterialIcons name="mood" size={size} color={"green"} style={styles} />
    )
};

/**
 * Icona de cara normal
 * @param {Object} props 
 * @returns {Component}
 */
export const MediumHappyIcon = (props) => {

    const size = props.size;                // Tamaño
    const styles = props.styles;            // Estilo

    return (
        <MaterialIcons name="sentiment-neutral" size={size} color={"yellow"} style={styles} />
    )
};

/**
 * Icona de cara triste
 * @param {Object} props 
 * @returns {Component}
 */
export const SadIcon = (props) => {

    const size = props.size;                // Tamaño
    const styles = props.styles;            // Estilo

    return (
        <MaterialIcons name="mood-bad" size={size} color={"red"} style={styles} />
    )
};

/**
 * Icona de frecha hacia á dereita
 * @param {Object} props 
 * @returns {Component}
 */
export const ChevronRightIcon = (props) => {

    const style = props.style;              // Estilo
    return (
        <Icon name="chevron-forward" size={30} style={style} />
    )
}

/**
 * Icona de paraugas
 * @param {Object} props 
 * @returns {Component}
 */
export const UmbrellaIcon = (props) => {

    const style = props.style;              // Estilo
    const size = props.size;                // Tamaño
    return (
        <Icon name="umbrella" size={size} style={style} />
    )
}

/**
 * Icona de email
 * @param {Object} props 
 * @returns {Component}
 */
export const MailIcon = (props) => {

    const style = props.style;              // Estilo
    const size = props.size;                // Tamaño
    return (
        <Icon name="mail" size={size} style={style} />
    )
}

/**
 * Icona presionable de corazón cheo
 * @param {Object} props 
 * @returns {Component}
 */
export const HeartIconButton = (props) => {

    const style = props.style;              // Estilo
    const onQuitFav = props.onQuitFav;      // Función para quitar elemento como favorito

    return (
        <IconButton
            icon={HeartIcon}
            onPress={() => {
                onQuitFav ? onQuitFav() : {}
            }}
            style={style} />
    )
};

/**
 * Icona presionable de corazón
 * @param {Object} props 
 * @returns {Component}
 */
export const HeartOutlineIconButton = (props) => {

    const style = props.style;              // Estilo
    const onPressFav = props.onPressFav;    // Función para gardar elemento como favorito

    return (
        <IconButton
            icon={HeartIconOutline}
            onPress={() => {
                onPressFav ? onPressFav() : {}
            }}
            style={style} />
    )
};

/**
 * Icona presionable de calendario cheo
 * @param {Object} props 
 * @returns {Component}
 */
export const CalendarIconButton = (props) => {

    const style = props.style;                              // Estilo
    const item = props.item;                                // Elemento
    const addToPlanificacion = props.addToPlanificacion;    // Función para engadir elemento á planificación
    const changeAdd = props.changeAdd;                      // Función para cambiar estado do elemento
    const added = props.added;                              // Boolean que indica se o elemento está engadido á planificación

    let result;
    return (
        <IconButton
            icon={CalendarIcon}
            onPress={async () => {
                addToPlanificacion ?
                    result = await addToPlanificacion(`${item.id}`, added, item.tipo, changeAdd)
                    :
                    {}
                result ?
                    changeAdd ?
                        changeAdd() :
                        console.log("Not function") :
                    {}
            }}
            style={style} />
    )
};

/**
 * Icona presionable de calendario
 * @param {Object} props 
 * @returns {Component}
 */
export const CalendarOutlineIconButton = (props) => {

    const style = props.style;                              // Estilo
    const item = props.item;                                // Elemento
    const addToPlanificacion = props.addToPlanificacion;    // Función para engadir elemento á planificación
    const changeAdd = props.changeAdd;                      // Función para cambiar o estado do elemento
    const added = props.added;                              // Boolean que indica se o elemento está engadido á planificación
    const _onPress = props._onPress;                        // Función a realizar cando se pulse a icona
    let result;
    return (
        <IconButton
            icon={CalendarOutlineIcon}
            onPress={async () => {
                addToPlanificacion ?
                    result = await addToPlanificacion(`${item.id}`, added, item.tipo, changeAdd)
                    :
                    _onPress()
                result ?
                    changeAdd ?
                        changeAdd() :
                        console.log("Not function") :
                    {}
            }}
            style={style} />
    )
};

/**
 * Icona presionable de calendario con + cheo
 * @param {Object} props 
 * @returns {Component}
 */
export const CalendarPlusIconButton = (props) => {

    const style = props.style;                              // Estilo
    const item = props.item;                                // Elemento
    const addToPlanificacion = props.addToPlanificacion;    // Función para engadir elemento á planificación
    const changeAdd = props.changeAdd;                      // Función para cambiar estado do elemento
    const added = props.added;                              // Boolean que indica se o elemento está engadido á planificación

    let result;
    return (
        <IconButton
            icon={CalendarPlusIcon}
            onPress={async () => {
                addToPlanificacion ?
                    result = await addToPlanificacion(`${item.id}`, added, item.tipo, changeAdd)
                    :
                    {}
                result ?
                    changeAdd ?
                        changeAdd() :
                        {} :
                    {}
            }}
            style={style} />
    )
};

/**
 * Icona presionable de calendario cun +
 * @param {Object} props 
 * @returns {Component}
 */
export const CalendarPlusOutlineIconButton = (props) => {

    const style = props.style;                              // Estilo
    const item = props.item;                                // Elemento
    const addToPlanificacion = props.addToPlanificacion;    // Función para engadir elemento á planificación
    const changeAdd = props.changeAdd;                      // Función para cambiar estado do elemento
    const added = props.added;                              // Boolean que indica se o elemento está engadido á planificación
    const _onPress = props._onPress;                        // Función a realizar cando se pulse a icona
    const loading = props.loading;
    let result;
    return (
        <IconButton
            icon={CalendarPlusOutlineIcon}
            onPress={async () => {
                loading();
                addToPlanificacion ?
                    result = await addToPlanificacion(`${item.id}`, added, item.tipo, changeAdd)
                    :
                    _onPress()
                result ?
                    changeAdd ?
                        changeAdd() :
                        console.log("Not function") :
                    {}
            }}
            style={style} />
    )
};

/**
 * Icona presionable de mapa
 * @param {Object} props 
 * @returns {Component}
 */
export const MapIconButton = (props) => {

    const showOnMap = props.showOnMap;              // Función para xeolocalizar un elemento
    const onMapClick = props.onMapClick;            // Función a realizar cando se pulse a icona
    const item = props.item;                        // Elemento
    const style = props.style;                      // Estilo
    const white = props.white                       // Boolean para determinar se ten que ser blanco ou negro

    return (
        <IconButton
            icon={white ? MapIconWhite : MapIcon}
            onPress={async () => showOnMap ? await showOnMap(`${item.id}`, item.tipo) : await onMapClick()}
            style={style} />
    )
};

/**
 * Icona presionable de compartir
 * @param {Object} props 
 * @returns {Component}
 */
export const ShareIconButton = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se pulse a icona
    return (
        <IconButton
            icon={ShareIcon}
            onPress={() => _onPress ? _onPress() : {}}
        />
    )
}

/**
 * Icona presionable de compartido
 * @param {Object} props 
 * @returns {Component}
 */
export const SharedIconButton = (props) => {
    const _onPress = props._onPress;                // Función a realizar cando se pulse a icona
    return (
        <IconButton
            icon={SharedIcon}
            onPress={() => _onPress ? _onPress() : {}}
        />
    )
}

/**
 * Icona presionable de compartir negro
 * @param {Object} props 
 * @returns {Component}
 */
export const ShareIconButtonBlack = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se pulse a icona

    return (
        <IconButton
            icon={ShareIconBlack}
            onPress={() => _onPress()}
        />
    )
}

/**
 * Icona presionable de compartido negro
 * @param {Object} props 
 * @returns {Component}
 */
export const SharedIconButtonBlack = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se pulse a icona

    return (
        <IconButton
            icon={SharedIconBlack}
            onPress={() => _onPress()}
        />
    )
}

/**
 * Icona presionable de gardar
 * @param {Object} props 
 * @returns {Component}
 */
export const SaveIconButton = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se pulse a icona

    return (
        <IconButton
            icon={SaveIcon}
            onPress={() => _onPress()}
        />
    )
}

/**
 * Icona presionable de gardado
 * @param {Object} props 
 * @returns {Component}
 */
export const SavedIconButton = () => {

    return (
        <IconButton
            icon={SavedIcon}
        />
    )
}

/**
 * Icona presionable de camiñar
 * @param {Object} props 
 * @returns {Component}
 */
export const WalkIconButton = (props) => {

    const walking = props.walking;                  // Boolean que indica se a icona de camiñar está seleccionada ou non
    const changeProfile = props.changeProfile;      // Función para cambiar o tipo de ruta a realizar

    return (
        <IconButton
            icon={walking ? WalkIconSelected : WalkIcon}
            onPress={() => changeProfile()}
        />
    )
}

/**
 * Icona presionable de bicicleta
 * @param {Object} props 
 * @returns {Component}
 */
export const BicycleIconButton = (props) => {

    const walking = props.walking;                  // Boolean que indica se a icona de camiñar está seleccionada ou non
    const changeProfile = props.changeProfile;      // Función para cambiar o tipo de ruta a realizar

    return (
        <IconButton
            icon={walking ? BicycleIcon : BicycleIconSelected}
            onPress={() => changeProfile()}
        />
    )
}

/**
 * Icona presionable de play
 * @param {Object} props 
 * @returns {Component}
 */
export const PlayIconButton = () => {
    return (
        <IconButton
            icon={PlayIcon}
            onPress={() => console.log("Play")}
        />
    )
}

/**
 * Icona presionable de stop
 * @param {Object} props 
 * @returns {Component}
 */
export const StopIconButton = () => {
    return (
        <IconButton
            icon={StopIcon}
            onPress={() => console.log("Stop")}
        />
    )
}

/**
 * Icona presionable de cerrar
 * @param {Object} props 
 * @returns {Component}
 */
export const CloseIconButton = (props) => {
    const style = props.style;                          // Estilo
    const closeIconOnPress = props.closeIconOnPress;    // Función a realizar cando se pulse a icona
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

/**
 * Icona presionable de frecha hacia arriba
 * @param {Object} props 
 * @returns {Component}
 */
export const ChevronUpIconButton = (props) => {

    const style = props.style;                      // Estilo
    const changeOrderUp = props.onPressIcon;        // Función a realizar cando se presiona a icona

    return (
        <IconButton
            icon={ChevronUpIcon}
            onPress={() => changeOrderUp()}
            style={style}
        />
    )
}

/**
 * Icona presionable de frecha hacia abaixo
 * @param {Object} props 
 * @returns {Component}
 */
export const ChevronDownIconButton = (props) => {

    const style = props.style;                      // Estilo
    const changeOrderDown = props.onPressIcon;      // Función a realizar cando se presiona a icona

    return (
        <IconButton
            icon={ChevronDownIcon}
            onPress={() => changeOrderDown()}
            style={style}
        />
    )
}

/**
 * Icona presionable de puntos de interese
 * @param {Object} props 
 * @returns {Component}
 */
export const PointsInterestIconButton = (props) => {

    const navigate = props.navigate;                // Funcionalidade que permite navegar na aplicación
    const updateSelected = props.updateSelected;    // Función necesaria na pantalla á que se navegue

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

/**
 * Icona presionable de cerrar circular
 * @param {Object} props 
 * @returns {Component}
 */
export const CloseCircleIconButton = (props) => {

    const clear = props.clear;                      // Función a realizar cando se presiona a icona
    const styles = props.style;                     // Estilo

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

/**
 * Icona presionable de edición
 * @param {Object} props 
 * @returns {Component}
 */
export const EditIconButton = (props) => {

    const onPress = props.onPress;                  // Función a realizar cando se presiona a icona
    const styles = props.style;                     // Estilo

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

/**
 * Icona presionable de cama
 * @param {Object} props 
 * @returns {Component}
 */
export const BedIconButton = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se presiona a icona

    return (
        <IconButton
            icon={BedIcon}
            onPress={() => {
                _onPress();
            }}
        />
    );
}

/**
 * Icona presionable de reloxo
 * @param {Object} props 
 * @returns {Component}
 */
export const ClockIconButton = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se presiona a icona

    return (
        <IconButton
            icon={ClockIcon}
            onPress={() => {
                _onPress();
            }}
        />
    );
}

/**
 * Icona presionable de engadir novo elemento
 * @param {Object} props 
 * @returns {Component}
 */
export const PlusIconButton = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se presiona a icona
    const styles = props.styles;                    // Estilo

    return (
        <IconButton
            icon={PlusIcon}
            onPress={() => {
                _onPress();
            }}
            style={styles}
        />
    );
}

/**
 * Icona presionable de refrescar
 * @param {Object} props 
 * @returns {Component}
 */
export const RefreshIconButton = (props) => {

    const _onPress = props._onPress;                // Función a realizar cando se presiona a icona
    const styles = props.styles;                    // Estilo

    return (
        <IconButton
            icon={RefreshIcon}
            onPress={() => {
                _onPress();
            }}
            style={styles}
        />
    );
}