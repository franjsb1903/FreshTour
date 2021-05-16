import React, { useContext, useState, useEffect } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import AppContext from '../../../context/PlanificadorAppContext';
import NoElementsPlanificadorView from '../../../components/NoElementsPlanificadorView'
import TopTabNavigator from '../../../components/TopTabNavigatorPlanificador';
import { BinIcon, SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton, PointsInterestIconButton, SavedIconButton, SharedIconButton } from '../../../components/CustomIcons';
import { onShare } from '../../../components/Common'
import { customTouchableOpacity as button } from '../../../styles/styles';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow } from '../../../styles/styles';

const Planificador = (props) => {

    const [isSaved, setIsSaved] = useState(false);
    const [shared, setShared] = useState(false);
    const [planificacion, setPlanificacion] = useState(undefined);
    const [confirmacionShare, setConfirmacionShare] = useState(false);
    const [modal, setModal] = useState(false);

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

    const showModal = () => {
        setModal(!modal);
    }

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

    const showConfirmacionShare = () => {
        setConfirmacionShare(!confirmacionShare);
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
                    type: "warning",
                    position: "bottom",
                    icon: "danger"
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
                                                    showConfirmacionShare();
                                                }} />
                                                :
                                                <ShareIconButton _onPress={() => {
                                                    showConfirmacionShare();
                                                }} />
                                        }
                                    </> :
                                    <SaveIcon />
                                :
                                <SaveIcon />
                        }
                        <ModalConfirmacion modal={confirmacionShare} showModal={showConfirmacionShare} confirm={() => {
                            onShare(changeShare, shared, planificacion);
                        }} text={"Ao compartir unha planificación, todos os usuarios poderán vela. Está seguro?"} />
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
                <TouchableOpacity style={[button.buttonContainerSquare, { alignItems: "center" }]} onPress={() => showModal()}>
                    <BinIcon />
                    <ModalConfirmacion text={"Está a punto de borrar a planificación e non a poderá recuperar, está seguro?"} showModal={showModal} modal={modal} confirm={() => onClear()} />
                </TouchableOpacity >
                <TopTabNavigator />
            </>
            :
            <NoElementsPlanificadorView />

    );
}

export default Planificador;