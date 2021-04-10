import React, {useState} from 'react';

import TopTabNavigator from '../../../components/TopTabNavigator';

const TurismoItem = ({ route, navigation }) => {

    const element = route.params.element;
    const showOnMap = route.params.showOnMap;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${element.titulo}`
        });
    }, []);

    return(
        <TopTabNavigator element={element} showOnMap={showOnMap} />
    )
}

export default TurismoItem;