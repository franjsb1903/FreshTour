/**
 * @fileoverview Funcións asociadas a obter imaxes na aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

// módulo
import { Image } from 'react-native'

/**
 * Devolve a localización dunha imaxe en función do seu nome
 * @param {String} name 
 * @returns {String}
 */
const getImageUri = (name) => {
    let locateUri;
    switch (name) {
        case "san_martino_pinairo":
            try {
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/san_martino_pinairo.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break;
        case "museo_centro_gaias":
            try {
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/museo_centro_gaias.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break
        case "museo_peregrinacions":
            try {
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/museo_peregrinacions.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break
        case "monte_pedroso":
            try {
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/monte_pedroso.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break
        case "paseo_ferradura":
            try {
                locateUri = Image.resolveAssetSource(require('../images/lugares_turisticos/paseo_ferradura.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break
        case "catedral_app":
            try {
                locateUri = Image.resolveAssetSource(require('../images/app/catedral.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break
        case "catedral":
            try {
                locateUri = Image.resolveAssetSource(require('../images/monumentos/catedral.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break;
        case "hostal_reis_catolicos":
            try {
                locateUri = Image.resolveAssetSource(require('../images/monumentos/hostal_reis_catolicos.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break;
        case "mercado_abastos":
            try {
                locateUri = Image.resolveAssetSource(require('../images/monumentos/mercado_abastos.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break;
        case "pazo_xelmirez":
            try {
                locateUri = Image.resolveAssetSource(require('../images/monumentos/pazo_xelmirez.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break;
        case "san_francisco":
            try {
                locateUri = Image.resolveAssetSource(require('../images/monumentos/san_francisco.jpg')).uri;
            } catch (err) {
                return undefined;
            }
            break;
        case "center_map":
            try {
                localUri = Image.resolveAssetSource(require('../images/map/center.png')).uri;
            } catch (err) {
                return undefined
            }
            break;
        case "localte_map":
            try {
                localUri = Image.resolveAssetSource(require('../images/map/compass.png')).uri;
            } catch (err) {
                return undefined
            }
            break;
        case "menu_map":
            try {
                localUri = Image.resolveAssetSource(require('../images/map/menu.png')).uri;
            } catch (err) {
                return undefined
            }
            break;
        case "clear_map":
            try {
                localUri = Image.resolveAssetSource(require('../images/map/clear.png')).uri;
            } catch (err) {
                return undefined
            }
            break;
        default:
            return undefined;
    }

    return locateUri;
}

export { getImageUri };