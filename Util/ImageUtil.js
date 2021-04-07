import React from 'react';
import { Image } from 'react-native'

const getImageUri = (uri) => {
    let locateUri;
    switch (uri) {
        case "san_martino_pinairo":
            try{
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/san_martino_pinairo.jpg')).uri;
            } catch(err) {
                return undefined;
            }
            break;
        case "museo_centro_gaias":
            try{
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/museo_centro_gaias.jpg')).uri;
            } catch(err) {
                return undefined;
            }
            break
        case "museo_peregrinacions":
            try{
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/museo_peregrinacions.jpg')).uri;
            } catch(err) {
                return undefined;
            }
            break
        case "monte_pedroso":
            try{
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/monte_pedroso.jpg')).uri;
            } catch(err) {
                return undefined;
            }
            break
        case "paseo_ferradura":
            try{
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/paseo_ferradura.jpg')).uri;
            } catch(err) {
                return undefined;
            }
            break
        default:
            return undefined;
    }

    return locateUri;
}

export { getImageUri };