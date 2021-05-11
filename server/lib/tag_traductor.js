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
            return "Estancia";
    }
}

module.exports = tag_traductor;