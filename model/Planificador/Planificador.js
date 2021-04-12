import properties from '../../properties/properties_expo'

export const getRoute = (coordinates) => {
    let request = new XMLHttpRequest();

    const url = properties.routes.url + properties.routes.walk_profile + properties.routes.format;

    request.open('POST', url);

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248e84a8f422c9847879e4f831a70c6004f');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };

    const body = '{"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]],"language":"es"}';

    request.send(body);

    if (request.status == 200) {
        console.log(request.responseText);
    }
}