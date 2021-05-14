
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
            monumentos: "/wfs/kml?request=GetFeature&typeName=cite:monumentos&outputFormat=json&CQL_FILTER=id+=+",
            hospedaxe: "/wfs/kml?request=GetFeature&typeName=cite:lugares_hospedaxe&outputFormat=json&CQL_FILTER=id+=+",
            hostalaria: "/wfs/kml?request=GetFeature&typeName=cite:lugares_hostalaria&outputFormat=json&CQL_FILTER=id+=+",
            ocio: "/wfs/kml?request=GetFeature&typeName=cite:actividades_ocio&outputFormat=json&CQL_FILTER=id+=+",
            outras: "/wfs/kml?request=GetFeature&typeName=cite:outras_actividades&outputFormat=json&CQL_FILTER=id+=+"
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
            all: '/',
            filter: '/filter/',          // /filter/:type
            fav: '/fav'
        },
        lecer: {
            main: "/lecer",
            hostalaria: {
                main: '/hostalaria',
                all: '/',
                byName: '/',
                fav: '/fav',
                filter: '/filter/'
            },
            ocio: {
                main: '/ocio',
                all: '/',
                byName: '/',
                fav: '/fav',
                filter: '/filter/'
            },
            outras: {
                main: '/outras',
                all: '/',
                byName: '/',
                fav: '/fav',
                filter: '/filter/'
            }
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
        covid_region: "/country/spain/region/galicia/sub_region/area_sanitaria_santiago",
        meteosix_api: "https://servizos.meteogalicia.gal/apiv4/getNumericForecastInfo?coords=-8.54464946603654,42.88108184633102&API_KEY=",
        meteosix_api_key: "FT7xoM4YvH5U9GqWFbHwHV4TE7G2Ao7MoB3PWQXEFoTz1Marts4w10p0mOmpVxka"
    },
    dropdown: {
        items:{
            hostalaria: [
                { label: 'Ordear por valoración', value: 'all_valoracion' },
                { label: 'Ordear por título', value: 'all_titulo' },
                { label: 'Bares por valoración', value: 'bares_titulo' },
                { label: 'Bares por título', value: 'bares_valoracion' },
                { label: 'Restaurantes por valoración', value: 'restaurantes_titulo' },
                { label: 'Restaurantes por título', value: 'restaurantes_valoracion' },
                { label: 'Cafés por valoración', value: 'cafes_titulo' },
                { label: 'Cafés por título', value: 'cafes_valoracion' },
                { label: 'Pubs por valoración', value: 'pubs_titulo' },
                { label: 'Pubs por título', value: 'pubs_valoracion' },
                { label: 'Zonas de comida por valoración', value: 'zonas_comida_titulo' },
                { label: 'Zonas de comida por título', value: 'zonas_comida_valoracion' },
                { label: 'Comida rápida por valoración', value: 'comida_rapida_titulo' },
                { label: 'Comida rápida por título', value: 'comida_rapida_valoracion' },
                { label: 'Xeaderías por valoración', value: 'xeaderias_titulo' },
                { label: 'Xeaderías por título', value: 'xeaderias_valoracion' },
                { label: 'Pastelerías por título', value: 'pastelerias_titulo' },
                { label: 'Pastelerías por título', value: 'pastelerias_valoracion' },
                { label: 'Panaderías por título', value: 'panaderias_titulo' },
                { label: 'Panaderías por título', value: 'panaderias_valoracion' },
                { label: 'Chocolaterías por título', value: 'chocolaterias_titulo' },
                { label: 'Chocolaterías por valoración', value: 'chocolaterias_valoracion' }
            ],
            ocio: [
                { label: 'Ordear por valoración', value: 'all_valoracion' },
                { label: 'Ordear por título', value: 'all_titulo' },
                { label: 'Picnics por valoración', value: 'picnic_titulo' },
                { label: 'Picnics por título', value: 'picnic_valoracion' },
                { label: 'Sala de xogos por valoración', value: 'amusement_arcade_valoracion' },
                { label: 'Sala de xogos por título', value: 'amusement_arcade_titulo' },
                { label: 'Boleras por valoración', value: 'bowling_alley_valoracion' },
                { label: 'Boleras por título', value: 'bowling_alley_titulo' },
                { label: 'Escape rooms por valoración', value: 'escape_game_valoracion' },
                { label: 'Escape rooms por título', value: 'escape_game_titulo' },
                { label: 'Xardíns por valoración', value: 'garden_valoracion' },
                { label: 'Xardíns por título', value: 'garden_titulo' },
                { label: 'Parques por valoración', value: 'park_valoracion' },
                { label: 'Parques por título', value: 'park_titulo' },
                { label: 'Parques infantís por valoración', value: 'playground_valoracion' },
                { label: 'Parques infantís por título', value: 'playground_titulo' },
                { label: 'Estadios por título', value: 'stadium_valoracion' },
                { label: 'Estadios por título', value: 'stadium_titulo' },
                { label: 'Parques de camas elásticas por título', value: 'trampoline_park_valoracion' },
                { label: 'Parques de camas elásticas por título', value: 'trampoline_park_titulo' },
                { label: 'Zonas de deportes ao aire libre por valoración', value: 'pitch_valoracion' },
                { label: 'Zonas de deportes ao aire libre por título', value: 'pitch_titulo' },
                { label: 'Centros deportivos por valoración', value: 'sports_centre_valoracion' },
                { label: 'Centros deportivos por título', value: 'sports_centre_titulo' }, 
                { label: 'Terrazas por valoración', value: 'outdoor_seating_valoracion' },
                { label: 'Terrazas por título', value: 'outdoor_seating_titulo' }, 
                { label: 'Terrazas por valoración', value: 'outdoor_seating_valoracion' },
                { label: 'Terrazas por título', value: 'outdoor_seating_titulo' },
                { label: 'Zonas de baile por valoración', value: 'dance_valoracion' },
                { label: 'Zonas de baile por título', value: 'dance_titulo' },
                { label: 'Pabellóns deportivos por valoración', value: 'sports_hall_valoracion' },
                { label: 'Pabellóns deportivos por título', value: 'sports_hall_titulo' },
                { label: 'Cines por valoración', value: 'cinema_valoración' },
                { label: 'Cines por título', value: 'cinema_titulo' },
                { label: 'Teatros por valoración', value: 'theatre_valoracion' },
                { label: 'Teatros por título', value: 'theatre_titulo' },
                { label: 'Clubs nocturnos por valoración', value: 'nightclub_valoracion' },
                { label: 'Clubs nocturnos por título', value: 'nightclub_titulo' },
                { label: 'Miradores por valoración', value: 'viewpoint_valoracion' },
                { label: 'Miradores por título', value: 'viewpoint_titulo' }
            ],
            outras: [
                { label: 'Ordear por valoración', value: 'all_valoracion' },
                { label: 'Ordear por título', value: 'all_titulo' },
                { label: 'Picnics por valoración', value: 'picnic_titulo' },
                { label: 'Picnics por título', value: 'picnic_valoracion' },
                { label: 'Sala de xogos por valoración', value: 'amusement_arcade_valoracion' },
                { label: 'Sala de xogos por título', value: 'amusement_arcade_titulo' },
                { label: 'Boleras por valoración', value: 'bowling_alley_valoracion' },
                { label: 'Boleras por título', value: 'bowling_alley_titulo' },
                { label: 'Escape rooms por valoración', value: 'escape_game_valoracion' },
                { label: 'Escape rooms por título', value: 'escape_game_titulo' },
                { label: 'Xardíns por valoración', value: 'garden_valoracion' },
                { label: 'Xardíns por título', value: 'garden_titulo' },
                { label: 'Parques por valoración', value: 'park_valoracion' },
                { label: 'Parques por título', value: 'park_titulo' },
                { label: 'Parques infantís por valoración', value: 'playground_valoracion' },
                { label: 'Parques infantís por título', value: 'playground_titulo' },
                { label: 'Estadios por valoración', value: 'stadium_valoracion' },
                { label: 'Estadios por título', value: 'stadium_titulo' },
                { label: 'Parques de camas elásticas por valoración', value: 'trampoline_park_valoracion' },
                { label: 'Parques de camas elásticas por título', value: 'trampoline_park_titulo' },
                { label: 'Zonas de deportes ao aire libre por valoración', value: 'pitch_valoracion' },
                { label: 'Zonas de deportes ao aire libre por título', value: 'pitch_titulo' },
                { label: 'Centros deportivos por valoración', value: 'sports_centre_valoracion' },
                { label: 'Centros deportivos por título', value: 'sports_centre_titulo' },
                { label: 'Terrazas por valoración', value: 'outdoor_seating_valoracion' },
                { label: 'Terrazas por título', value: 'outdoor_seating_titulo' },
                { label: 'Zonas de baile por valoración', value: 'dance_valoracion' },
                { label: 'Zonas de baile por título', value: 'dance_titulo' },
                { label: 'Pabellóns deportivos por valoración', value: 'sports_hall_valoracion' },
                { label: 'Pabellóns deportivos por título', value: 'sports_hall_titulo' },
                { label: 'Cines por valoración', value: 'cinema_valoración' },
                { label: 'Cines por título', value: 'cinema_titulo' },
                { label: 'Teatros por valoración', value: 'theatre_valoracion' },
                { label: 'Teatros por título', value: 'theatre_titulo' },
                { label: 'Clubs nocturnos por valoración', value: 'nightclub_valoracion' },
                { label: 'Clubs nocturnos por título', value: 'nightclub_titulo' },
                { label: 'Miradores por valoración', value: 'viewpoint_valoracion' },
                { label: 'Miradores por título', value: 'viewpoint_titulo' }
            ]
        }
    },
    openstreetmap: {
        edit: "https://www.openstreetmap.org/edit#map=18/42.88816/-8.53012"
    }
}

export default properties;