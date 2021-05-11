import React, { useContext, useState, useEffect } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import AppContext from '../../../context/PlanificadorAppContext';
import NoElementsPlanificadorView from '../../../components/NoElementsPlanificadorView'
import TopTabNavigator from '../../../components/TopTabNavigatorPlanificador';
import { BinIcon, SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton, PointsInterestIconButton, SavedIconButton, SharedIconButton } from '../../../components/CustomIcons';
import { onShare } from '../../../components/Common'
import { customTouchableOpacity as button } from '../../../styles/styles'

import properties from '../../../properties/properties_expo'

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow } from '../../../styles/styles';

const Planificador = (props) => {

    const [isSaved, setIsSaved] = useState(false);
    const [shared, setShared] = useState(false);
    const [planificacion, setPlanificacion] = useState(undefined);

    const context = useContext(AppContext);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setPlanificacion(context.planificacion);
            if (context.planificacion != undefined) {
                setShared(context.planificacion.esta_compartida);
            }
        }

        return () => mounted = false;
    }, [context.planificacion]);

    const onMapClick = () => {
        navigation.navigate('Map');
    }

    const navigation = useNavigation();

    const onClear = () => {
        context.updateItems([]);
    }

    const changeIsSaved = () => {
        setIsSaved(true);
    }

    const changeShare = () => {
        setShared(!shared);
    }

    const SaveIcon = () => (
        <SaveIconButton _onPress={() => {
            context.turismoItems.length > 1 ?
                props.navigation.navigate("GardarPlanificacion", {
                    changeIsSaved: changeIsSaved,
                    data: context.route.routeJson,
                    tempoVisita: context.tempoVisita,
                    titulo: "Gardar planificación"
                })
                :
                showMessage({
                    message: 'Engada máis elementos á planificación',
                    type: "warning"
                });
        }} />
    )

    return (

        context.turismoItems != undefined && context.turismoItems.length > 0 ?
            <>
                <View style={stylesRow.container}>
                    <View style={styles.leftIconsContainer}>
                        {
                            planificacion ?
                                isSaved || planificacion.id_actual_usuario == planificacion.id_usuario ?
                                    <>
                                        <SavedIconButton />
                                        {
                                            shared ?
                                                <SharedIconButton _onPress={() => {
                                                    onShare(changeShare, shared, planificacion);
                                                }} />
                                                :
                                                <ShareIconButton _onPress={() => {
                                                    onShare(changeShare, shared, planificacion);
                                                }} />
                                        }
                                    </> :
                                    <SaveIcon />
                                :
                                <SaveIcon />
                        }
                    </View>
                    <View style={styles.centerIconsContainer}>
                        <WalkIconButton walking={context.walking} changeProfile={context.changeProfile} />
                        <BicycleIconButton walking={context.walking} changeProfile={context.changeProfile} />
                    </View>
                    <View style={styles.rightIconsContainer}>
                        <MapIconButton onMapClick={onMapClick} white={true} />
                        <PointsInterestIconButton navigate={navigation.navigate} updateSelected={global.setSelected} />
                    </View>
                </View>
                <TouchableOpacity style={[button.buttonContainerSquare, { alignItems: "center" }]} onPress={() => onClear()}>
                    <BinIcon />
                </TouchableOpacity >
                <TopTabNavigator />
            </>
            :
            <NoElementsPlanificadorView />

    );
}

export default Planificador;