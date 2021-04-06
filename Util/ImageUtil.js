import React from 'react';
import { Image } from 'react-native'

const getImageUri = (uri) => {
    let locateUri;
    switch(uri) {
        case "san_martino_pinairo.jpg":
            const url = '../images/lugares_turisticos/san_martino_pinairo.jpg'
            locateUri = Image.resolveAssetSource(require(url)).uri;
            break;
        default:
            return undefined;
    }

    return locateUri;
}

export { getImageUri };