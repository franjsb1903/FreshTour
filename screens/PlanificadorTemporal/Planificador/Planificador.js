import React, { useContext } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppContext from '../../../components/PlanificadorAppContext';
import NoElementsPlanificadorView from '../../../components/NoElementsPlanificadorView'
import TopTabNavigator from '../../../components/TopTabNavigatorPlanificador';
import { SaveIconButton, ShareIconButton, WalkIconButton, BicycleIconButton, MapIconButton, PointsInterestIconButton } from '../../../components/CustomIcons';

import { stylesPlanificadorScreens as styles, flexRowContainer as stylesRow, stylesScroll } from '../../../styles/styles';

const Planificador = (props) => {

    const onMapClick = () => {
        navigation.navigate('Map');
    }

    const context = useContext(AppContext);
    const navigation = useNavigation();

    const onClear = () => {
        context.updateItems([]);
    }

    return (


        context.turismoItems.length > 0 ?
            <>
                <View style={stylesRow.container}>
                    <View style={styles.leftIconsContainer}>
                        <SaveIconButton />
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
                <Button title="Limpar planificación" color="#006400" onPress={() => onClear()} />
                <TopTabNavigator />
            </>
            :
            <NoElementsPlanificadorView />

    );
}

export default Planificador;