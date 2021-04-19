import React from 'react';
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements';
import { loggedIn as styles } from '../styles/styles'

const ListItemMenuUser = (props) => {

    const data = props.data;

    return (
        <View>
            <ListItem
                style={styles.listItem}
                containerStyle={styles.listItemContainer}
                onPress={data.onPress}
            >
                <ListItem.Content style={styles.listItemContent}>
                    <ListItem.Title style={styles.labelMenu}>{data.label}</ListItem.Title>
                    {
                        data.data != undefined ?
                            <Text style={styles.numberMenu}>{data.data.length}</Text>
                            :
                            <></>
                    }
                </ListItem.Content>
                {
                    data.label != "Pechar sesión" ?
                        <ListItem.Chevron color="darkgreen" />
                        :
                        <></>
                }
            </ListItem>
        </View>
    )

}

export default ListItemMenuUser;