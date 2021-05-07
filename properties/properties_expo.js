
const properties = {
    connection: {
        type: "http",
        host: "192.168.1.72",
        port: "3000"
    },
    url: {
        planificador: {
            main: "/planificacions",
            nominatim_json: "/nominatim/",               // /nominatim/:search
            nominatim_geojson: "/nominatim/geojson/",    // /nominatim/geojson/:search
            new: "/new",
            share: "/share",
            elements: "/elements/",                      // /planificacions/elements/:id
            delete: "/",
            edit: "/edit",
            sortBy: "/sortBy/",                           // /planificacions/sortBy/:type
            fav: "/fav",
            byName: "/"                                   // /:name
        },
        turismo: {
            turismo: "/turismo",                        // /turismo/, /turismo/:name
            sortBy: "/sortBy/",                           // /turismo/sortBy/:type
            fav: "/fav"
        },
        geoserver: {
            url: "http://192.168.1.72:8080/geoserver",
            lugares: "/wfs/kml?request=GetFeature&typeName=cite:lugares_turisticos&outputFormat=json&CQL_FILTER=id+=+",                    // /geoserver/:id
            monumentos: "/wfs/kml?request=GetFeature&typeName=cite:monumentos&outputFormat=json&CQL_FILTER=id+=+"
        },
        opinions: {
            main: "/opinions",
            opinions_count: "/opinions/count/",         // /opinions/count/:type/:id
            opinions: "/",                              // /opinions/:type/:id
            newOpinion: "/new",
            delete: "/",
            edit: "/edit"
        },
        usuarios: {
            auth: '/auth/',
            register: 'register',
            login: 'login',
            main: '/usuario',
            me: 'me',
            edit: "/edit",
            delete: "/"
        },
        hospedaxe: {
            main: '/hospedaxe',
            all: '/'
        }
    },
    style: {
        color: {
            main: "#2e8b57",
            text: "#fff",
            title: "#fff",
            topTabIndicator: "#90ee90",
            background: "rgba(63, 191, 76, 0.30)",
            backgroundNoA: "rgb(63,191,76)",
            iconColor: "#fff",
            button: "#006400",
            darkGreen: "#006400"
        },
        text: {
            title_font_family: "serif"
        }
    },
    turismoItem: {
        comentario_visita_usuario: "Neste tipo de visita o usuario ten total flexibilidade á hora de realizar a visita. Simplemente, seleccione no planificador, no elemento concreto, o tipo de visita 'Visita flexible' e indique o tempo que quere adicar á visita. Logo, pode iniciar a visita ao elemento e pausala cando remate para fixar o tempo concreto que adicou á visita."
    },
    routes: {
        url: "https://api.openrouteservice.org/v2/directions",
        format: "geojson",
        walk_profile: "/foot-walking/",
        clycling_profile: "/cycling-regular/"
    },
    info: {
        covid_api: "https://api.covid19tracking.narrativa.com/api/",
        covid_region: "/country/spain/region/galicia/sub_region/area_sanitaria_santiago"
    }
}

export default properties;