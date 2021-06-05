import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native'

import NoData from '../../../../components/NoData';
import CardElement from '../../../../components/CardElementTurismo';
import CardElementLecer from '../../../../components/CardElementLecer';
import { useNavigation } from '@react-navigation/native';
import { stylesScroll as styles } from '../../../../styles/styles'

const ElementosVisitar = (props) => {

    const elements = props.elements;

    const navigation = useNavigation();

    const ListData = (props) => {

        const data = props.data.elementos;

        return (

            data.map(element => {
                return (
                    <TouchableOpacity
                        key={element.id}
                        onPress={() => element.tipo != "Hospedaxe" && element.tipo != "Hostalaría" && element.tipo != "Ocio" && element.tipo != "Outra" ? navigation.navigate('TurismoItem', {
                            element: element,
                            isRuta: true,
                            isElementoRuta: true
                        }) : {}}>
                            {
                                element.tipo != "Hospedaxe" && element.tipo != "Hostalaría" && element.tipo != "Ocio" && element.tipo != "Outra" ?
                                <CardElement item={element} isRuta={true} />
                                :
                                <CardElementLecer element={element} isRuta={true} />
                            }
                        
                    </TouchableOpacity>
                )
            })

        )
    }

    return (
        elements == undefined || elements.length == 0 ?
            <NoData />
            :
            <ScrollView contentContainerStyle={styles.containerScroll} >
                <ListData data={elements} />
            </ScrollView>
    )
}

export default ElementosVisitar;