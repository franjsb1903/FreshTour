import { fetchTextGet, fetchJsonGet } from '../../Util/FetchUtil'

export const getData = async (lat, lon, time) => {
    const url = 'https://tec.citius.usc.es/trafair/ogcservices/open_data/wcs?service=WCS&version=2.0.1&request=GetCoverage&coverageId=open_data%3Alatest_air_quality_prediction_coverage&subset=http://www.opengis.net/def/axis/OGC/0/Lat(' + (lat - 0.000025) + ',' + (lat + 0.000025) + ')&subset=http://www.opengis.net/def/axis/OGC/0/Long(' + (lon - 0.000025) + ',' + (lon + 0.000025) + ')&subset=http://www.opengis.net/def/axis/OGC/0/time("' + time + '")&SUBSETTINGCRS=http://www.opengis.net/def/crs/EPSG/0/4326&OUTPUTCRS=http://www.opengis.net/def/crs/EPSG/0/4326&SCALESIZE=http://www.opengis.net/def/axis/OGC/1/i(1),http://www.opengis.net/def/axis/OGC/1/j(1)&format=text/plain';

    try {
        const text = await fetchTextGet(url, undefined);
        return text;
    } catch (err) {
        throw new Error(err);
    }
}

export const getRealTimeData = async (signal) => {
    const url = 'https://tec.citius.usc.es/trafair/ogcservices/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=real_time_air_quality_observations&outputFormat=json';

    try {
        const json = await fetchJsonGet(url, undefined, signal);
        const actualDate = new Date();
        var validos = [];
        json.features.map((feature, index) => {
            const date = new Date(feature.properties.phenomenon_time);
            const diffTime = Math.abs(actualDate - date);
            const diffHours = diffTime/(1000*60*60);
            if(diffHours <= 1 && (feature.properties.no2_anomaly == false && feature.properties.o3_anomaly == false)) {
                validos.push(feature);
            }
        });
        var no2 = 0;
        var o3 = 0;
        validos.map((feature, index) => {
            no2 += feature.properties.no2;
            o3 += feature.properties.o3;
        });
        const no2_media = no2 / validos.length;
        const o3_media = o3 / validos.length;
        const response = {
            no2: no2_media,
            o3: o3_media
        }
        return response;
    } catch(err) {
        throw new Error(err);
    }
}