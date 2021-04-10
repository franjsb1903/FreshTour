
const properties = {
    connection: {
        type: "http",
        host: "192.168.1.71",
        port: "3000"
    },
    url: {
        planificador: {
            nominatim_json: "/nominatim/",              // /nominatim/:search
            nominatim_geojson: "/nominatim/geojson/"    // /nominatim/geojson/:search
        },
        turismo: {
            turismo: "/turismo/"                        // /turismo/, /turismo/:name
        },
        geoserver: {
            geoserver: "/geoserver/"                    // /geoserver/:id
        },
        opinions: {
            opinions_count: "/opinions/count/"          // /opinions/count/:type/:id
        }
    },
    color: {
        main: "#2e8b57",
        text: "#fff",
        title: "#fff",
        topTabIndicator: "#90ee90",
        background: "rgba(63, 191, 76, 0.30)"
    },
    text: {
        title_font_family: "serif"
    },
    turismoItem: {
        comentario_visita_usuario: "Neste tipo de visita o usuario ten total flexibilidade á hora de realizar a visita. Simplemente, seleccione no planificador, no elemento concreto, o tipo de visita 'Visita flexible' e indique o tempo que quere adicar á visita. Logo, pode iniciar a visita ao elemento e pausala cando remate para fixar o tempo concreto que adicou á visita."
    }
}

export default properties;