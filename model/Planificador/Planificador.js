import properties from '../../properties/properties_expo';
const XestionDatosPlanificador = require('../../XestionDatos/XestionDatosPlanificador')

const Planificador = new XestionDatosPlanificador();

export const getRoute = (coordinates, walking) => {
    return new Promise((resolve, reject) => {

        const urlWalk = properties.routes.url + properties.routes.walk_profile + properties.routes.format;
        const urlCycle = properties.routes.url + properties.routes.clycling_profile + properties.routes.format;

        try {
            let request = new XMLHttpRequest();

            var url;

            if (walking) {
                url = urlWalk;
            } else {
                url = urlCycle;
            }

            request.open('POST', url);

            request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248e84a8f422c9847879e4f831a70c6004f');

            request.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(request.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: request.responseText
                    });
                }
            };

            var body = '{"coordinates":[';

            for (var i = 0; i < coordinates.length; i++) {
                if (i == (coordinates.length - 1)) {
                    body = body + '[' + coordinates[i] + ']';
                } else {
                    body = body + '[' + coordinates[i] + '],';
                }
            }

            body = body + '],"instructions":"true","instructions_format":"text","language":"es","units":"km"}';

            // "alternative_routes":{"share_factor":0.6,"target_count":2,"weight_factor":1.4},

            request.send(body);

        } catch (err) {
            throw new Error(err);
        }
    })
}

export const savePlanificacion = async (token, planificacion, elementos) => {
    try {
        const json = await Planificador.savePlanificacion(token, planificacion, elementos);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getPlanificacions = async () => {
    try {
        const json = await Planificador.getPlanificacions();
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const sharePlanificacion = async (token, isShared, id) => {
    try {
        const json = await Planificador.sharePlanificacion(token, isShared, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}