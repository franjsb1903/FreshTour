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

module.exports = tag_traductor;