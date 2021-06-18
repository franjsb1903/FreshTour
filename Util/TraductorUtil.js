/**
 * @fileoverview Funcións de tradución de etiquetas ao galego
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

/**
 * Tradución de etiquetas de hostalaría
 * @param {String} tag 
 * @returns {String}
 */
export const traductorHostalaria = (tag) => {
    switch (tag) {
        case "bar":
            return "Bar";
        case "restaurant":
            return "Restaurante";
        case "cafe":
            return "Café";
        case "pub":
            return "Pub";
        case "food_court":
            return "Zona de comidas";
        case "ice_cream":
            return "Xeadería";
        case "confectionery":
            return "Pastelería";
        case "bakery":
            return "Panadería";
        case "chocolate":
            return "Chocolatería";
        default:
            return "Estancia";
    }
}

/**
 * Tradución de etiquetas de ocio
 * @param {String} tag 
 * @returns {String}
 */
export const traductorOcio = (tag) => {
    switch (tag) {
        case "picnic_table":
            return "Picnic";
        case "picnic_site":
            return "Picnic";
        case "amusement_arcade":
            return "Sala de xogos";
        case "bowling_alley":
            return "Bolera";
        case "escape_game":
            return "Escape room";
        case "garden":
            return "Xardín";
        case "park":
            return "Parque";
        case "playground":
            return "Parque infantil";
        case "stadium":
            return "Estadio";
        case "trampoline_park":
            return "Parque de camas elásticas";
        case "pitch":
            return "Zona de deportes ao aire libre";
        case "sports_centre":
            return "Centro deportivo";
        case "outdoor_seating":
            return "Terraza";
        case "dance":
            return "Baile";
        case "sports_hall":
            return "Pabellón deportivo";
        case "cinema":
            return "Cine";
        case "theatre":
            return "Teatro";
        case "nightclub":
            return "Club nocturno";
        case "viewpoint":
            return "Mirador";
        default:
            return "Ocio";
    }
}

/**
 * Tradución de etiquetas de outras
 * @param {String} tag 
 * @returns {String}
 */
export const traductorOutras = (tag) => {

    switch (tag) {
        case "bank":
            return "Banco";
        case "pharmacy":
            return "Farmacia";
        case "post_office":
            return "Oficina de Correos";
        case "taxi":
            return "Taxi";
        case "police":
            return "Policía";
        case "bicycle_parking":
            return "Parking de bicicletas";
        case "atm":
            return "Caixeiro";
        case "toilets":
            return "Baños públicos";
        case "supermarket":
            return "Supermercado";
        case "convenience":
            return "Pequeno supermercado";
        case "seafood":
            return "Pescadería";
        case "butcher":
            return "Carnicería";
        case "clothes":
            return "Tenda de roupa";
        case "gift":
            return "Tenda de regalos";
        case "shoes":
            return "Tenda de zapatos";
        case "beverages":
            return "Tenda de bebidas";
        case "department_store":
            return "Grandes almacenes";
        case "bag":
            return "Tenda de bolsas";
        case "perfumery":
            return "Perfumería";
        case "information":
            return "Punto de información";
        case "hospital":
            return "Hospital";
        case "clinic":
            return "Clínica";
        case "photo":
            return "Tenda de fotos";
        default:
            return "Outra actividade";
    }
}