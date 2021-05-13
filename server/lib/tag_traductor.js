const tag_traductor = {};

tag_traductor.hospedaxe = (tag) => {

    switch (tag) {
        case "hotel":
            return "Hotel";
        case "hostel":
            return "Hostal";
        case "guest_house":
            return "Aloxamento";
        case "caravan_site":
            return "Estacionamento de caravanas";
        case "apartment":
            return "Vivenda";
        case "camp_pitch":
            return "Camping";
        case "camp_site":
            return "Camping";
        case "motel":
            return "Motel";
        default:
            return "Estancia";
    }
}

tag_traductor.hostalaria = (tag) => {

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
        case "fast_food":
            return "Comida rápida";
        case "ice_cream":
            return "Xeadería";
        case "confectionery":
            return "Pastelería";
        case "bakery":
            return "Panadería";
        case "chocolate":
            return "Chocolatería";
        default:
            return "Hostalaría";
    }
}

tag_traductor.ocio = (tag) => {

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

module.exports = tag_traductor;