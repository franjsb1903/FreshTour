/**
 * @fileoverview Creación de marcadores para o mapa
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

/**
 * Devolve unha letra en función da orde dun elemento na planificación
 * @param {Number} number 
 * @returns {String}
 */
export const getIconContent = (number) => {
    switch (number) {
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
        case 4:
            return "D";
        case 5:
            return "E";
        case 6:
            return "F";
        case 7:
            return "G";
        case 8:
            return "H";
        case 9:
            return "I";
        case 10:
            return "J";
        case 11:
            return "K";
        case 12:
            return "L";
        case 13:
            return "M";
        case 14:
            return "N";
        case 15:
            return "Ñ";
        case 16:
            return "O";
        case 17:
            return "P";
        case 18:
            return "Q";
        case 19:
            return "R";
        case 20:
            return "S";
        case 21:
            return "T";
        case 22:
            return "U";
        case 23:
            return "V";
        case 24:
            return "W";
        case 25:
            return "X";
        case 26:
            return "Y";
        case 27:
            return "Z";
        default:
            return "A'";
    }
}