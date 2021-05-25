import { fetchTextGet } from '../../Util/FetchUtil'

export const getData = async (lat, lon, time) => {
    const url = 'https://tec.citius.usc.es/trafair/ogcservices/open_data/wcs?service=WCS&version=2.0.1&request=GetCoverage&coverageId=open_data%3Alatest_air_quality_prediction_coverage&subset=http://www.opengis.net/def/axis/OGC/0/Lat(' + (lat - 0.000025) + ',' + (lat + 0.000025) + ')&subset=http://www.opengis.net/def/axis/OGC/0/Long(' + (lon - 0.000025) + ',' + (lon + 0.000025) + ')&subset=http://www.opengis.net/def/axis/OGC/0/time("' + time + '")&SUBSETTINGCRS=http://www.opengis.net/def/crs/EPSG/0/4326&OUTPUTCRS=http://www.opengis.net/def/crs/EPSG/0/4326&SCALESIZE=http://www.opengis.net/def/axis/OGC/1/i(1),http://www.opengis.net/def/axis/OGC/1/j(1)&format=text/plain';

    try {
        const text = await fetchTextGet(url, undefined);
        return text;
    } catch (err) {
        throw new Error(err);
    }
}