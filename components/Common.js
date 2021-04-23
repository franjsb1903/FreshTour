import React from 'react';
import { Platform } from 'react-native';

import { fromScreen as styles } from '../styles/styles'
import { CloseCircleIconButton } from './CustomIcons'

export const clearButton = (func) => (
    Platform.OS == "android" ?
        <CloseCircleIconButton style={styles.clearButton} clear={func} />
        :
        <></>
)