import React from 'react';
import { View, Text } from 'react-native';

const LoggedIn = (props) => {

    const user = props.user;

    return (
        <View>
            <Text>
                {user.usuario}
            </Text>
        </View>
    )
}

export default LoggedIn;