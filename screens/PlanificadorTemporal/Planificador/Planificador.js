/**
 * @fileoverview Pantalla do planificador da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useContext, useState, useEffect, Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

// contexto
import AppContext from '../../../context/AppContext';

// compoñentes
import NoElementsPlanificadorView from '../../../components/NoElementsPlanificadorView'
import TopTabNavigator from '../../../components/TopTabNavigatorPlanificador';
import { BinIcon, SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton, PointsInterestIconButton, SavedIconButton, SharedIconButton } from '../../../components/CustomIcons';
import { onShare } from '../../../components/Common'
import { customTouchableOpacity as button } from '../../../styles/styles';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

// estilos
import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow } from '../../../styles/styles';

/**
 * Compoñente que conforma a pantalla do planificador da aplicación
 * @param {Object} props 
 * @returns {Component}
 */
const Planificador = (props) => {

    const [isSaved, setIsSaved] = useState(false);                          // Estado que indica se a planificación está almacenada
    const [shared, setShared] = useState(false);                            // Estado que indica se a planificación está compartida
    const [planificacion, setPlanificacion] = useState(undefined);          // Estado que almacena a planificación actual, cando é recuperada polo usuario
    const [confirmacionShare, setConfirmacionShare] = useState(false);      // Estado que controla a visualización do modal de confirmación de compartir
    const [modal, setModal] = useState(false);                              // Estado que controla a visualización dun modal

    const context = useContext(AppContext);                                 // Constante para acceder ao contexto

    /**
     * Execútase o contido da función cando cambia o estado planificación no contexto
     */
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

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal(!modal);
    }

    /**
     * Execútase cando se pulsa a icona de mapa
     */
    const onMapClick = () => {
        navigation.navigate('Map');
    }

    const navigation = useNavigation();                                         // Constante para empregar a navegación

    /**
     * Execútase cando o usuario confirma que quere limpar a planificación
     */
    const onClear = () => {
        context.updateItems([]);
    }

    /**
     * Cambia o estado da planificación, de non gardada a gardada
     */
    const changeIsSaved = () => {
        setIsSaved(true);
    }

    /**
     * Cambia o estado da planificación, de non compartida a compartida ou viceversa
     */
    const changeShare = () => {
        setShared(!shared);
    }

    /**
     * Amosa ou oculta o modal de confirmación a compartición
     */
    const showConfirmacionShare = () => {
        setConfirmacionShare(!confirmacionShare);
    }

    /**
     * Crea a icona de gardar a planificación
     * @returns {Component}
     */
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