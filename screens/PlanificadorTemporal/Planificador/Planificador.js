import React, { useContext, useState } from 'react';
import { View, Button, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppContext from '../../../context/PlanificadorAppContext';
import NoElementsPlanificadorView from '../../../components/NoElementsPlanificadorView'
import TopTabNavigator from '../../../components/TopTabNavigatorPlanificador';
import { SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton, PointsInterestIconButton, SavedIconButton } from '../../../components/CustomIcons';

import properties from '../../../properties/properties_expo'

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow } from '../../../styles/styles';

const Planificador = (props) => {

    const [isSaved, setIsSaved] = useState(false);

    const onMapClick = () => {
        navigation.navigate('Map');
    }

    const context = useContext(AppContext);
    const navigation = useNavigation();

    const onClear = () => {
        context.updateItems([]);
    }

    const changeIsSaved = () => {
        setIsSaved(true);
    }

    return (


        context.turismoItems.length > 0 ?
            <>
                <View style={stylesRow.container}>
                    <View style={styles.leftIconsContainer}>
                        {
                            isSaved ?
                                <SavedIconButton  /> :
                                <SaveIconButton _onPress={() => {
                                    context.turismoItems.length > 1 ?
                                        props.navigation.navigate("GardarPlanificacion", {
                                            changeIsSaved: changeIsSaved,
                                            data: context.route.routeJson,
                                            tempoVisita: context.tempoVisita,
                                            titulo: "Gardar planificación"
                                        })
                                        : ToastAndroid.show('Engada máis elementos á planificación', ToastAndroid.SHORT);
                                }} />
                        }
                        <ShareIconButton />
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
                <Button title="Limpar planificación" color={properties.style.color.button} onPress={() => onClear()} />
                <TopTabNavigator />
            </>
            :
            <NoElementsPlanificadorView />

    );
}

export default Planificador;