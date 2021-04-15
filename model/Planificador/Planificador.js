import properties from '../../properties/properties_expo'

export const getRoute = (coordinates) => {
    return new Promise((resolve, reject) => {

        const url = properties.routes.url + properties.routes.walk_profile + properties.routes.format;

        try {
            let request = new XMLHttpRequest();

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
                        statusText: request.statusText
                    });
                }
            };

            console.log(coordinates);
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