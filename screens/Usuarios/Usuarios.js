import React, { useState } from 'react';
import { View, Text } from 'react-native';

import LoggedIn from './screens/LoggedIn';
import NotLoggedIn from './screens/NotLoggedIn'

const User = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        isLoggedIn ?
        <LoggedIn />
        :
        <NotLoggedIn />
    )
}

export default User;