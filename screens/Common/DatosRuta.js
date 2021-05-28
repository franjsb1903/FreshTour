import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';

import AppContext from '../../context/PlanificadorAppContext';
import NoElementsPlanificadorView from '../../components/NoElementsPlanificadorView';

import { stylesScroll, stylesBorderContainer as borderStyle } from '../../styles/styles'

const DatosRuta = (props) => {

    const [data, setData] = useState(undefined);
    const context = useContext(AppContext);

    const planificacion = props.planificacion;
    const elements = props.elements;

    useEffect(() => {
        let mounted = true;

        if (!planificacion) {
            if (mounted) {
                setData(context.route.routeJson);
            }
        }

        return () => mounted = false;
    }, [context.route.routeJson]);

    return (
        data && data.features ?
            <ScrollView style={stylesScroll.scroll}>
                <View style={borderStyle.viewContainer}>
                    <Title style={borderStyle.title}> Datos de ruta </Title>
                    <View style={borderStyle.viewTextContainer}>
                        <Title style={borderStyle.titleSize}>Tempo total</Title>
                        <Text style={borderStyle.textBold}>{Math.round(data.features[0].properties.summary.duration / 60) + context.tempoVisita > 60 ?
                            <Text>{Number((data.features[0].properties.summary.duration / 3600 + context.tempoVisita / 60).toFixed(1))} h</Text> :
                            <Text>{Math.round(data.features[0].properties.summary.duration / 60) + context.tempoVisita} min</Text>}</Text>
                    </View>
                    <View style={borderStyle.viewTextContainer}>
                        <Title style={borderStyle.titleSize}>Tempo de ruta</Title>
                        <Text style={borderStyle.textBold}>{(data.features[0].properties.summary.duration / 60) > 60 ? <Text>{Number((data.features[0].properties.summary.duration / 3600).toFixed(1))} h</Text>
                            : <Text>{Math.round(data.features[0].properties.summary.duration / 60)} min</Text>}</Text>
                    </View>
                    <View style={borderStyle.viewTextContainer}>
                        <Title style={borderStyle.titleSize}>Tempo de visita</Title>
                        <Text style={borderStyle.textBold}>{context.tempoVisita > 60 ? <Text>{Number((context.tempoVisita / 60).toFixed(1))} h</Text> : <Text>{Math.round(context.tempoVisita)} min</Text>}</Text>
                    </View>
                    <View style={borderStyle.viewTextContainer}>
                        <Title style={borderStyle.titleSize}>Distancia total</Title>
                        <Text style={borderStyle.textBold}>{(data.features[0].properties.summary.distance).toFixed(1)} km</Text>
                    </View>
                    <View style={borderStyle.viewTextContainer}>
                        <Title style={borderStyle.titleSize}>Elementos a visitar</Title>
                        <Text style={borderStyle.textBold}>{context.turismoItems.length} elementos</Text>
                    </View>
                </View>
            </ScrollView>
            :
            planificacion ?
                <ScrollView style={stylesScroll.scroll}>
                    <View style={borderStyle.viewContainer}>
                        <Title style={borderStyle.title}> Datos de ruta </Title>
                        <View style={borderStyle.viewTextContainer}>
                            <Title style={borderStyle.titleSize}>Tempo total</Title>
                            <Text style={borderStyle.textBold}>{Math.round(planificacion.tempo_ruta / 60) + planificacion.tempo_visita > 60 ?
                                <Text>{Number((planificacion.tempo_ruta / 3600 + planificacion.tempo_visita / 60).toFixed(1))} h</Text> :
                                <Text>{Math.round(planificacion.tempo_ruta / 60) + planificacion.tempo_visita} min</Text>}</Text>
                        </View>
                        <View style={borderStyle.viewTextContainer}>
                            <Title style={borderStyle.titleSize}>Tempo de ruta</Title>
                            <Text style={borderStyle.textBold}>{(planificacion.tempo_ruta / 60) > 60 ? <Text>{Number((planificacion.tempo_ruta / 3600).toFixed(1))} h</Text>
                                : <Text>{Math.round(planificacion.tempo_ruta / 60)} min</Text>}</Text>
                        </View>
                        <View style={borderStyle.viewTextContainer}>
                            <Title style={borderStyle.titleSize}>Tempo de visita</Title>
                            <Text style={borderStyle.textBold}>{planificacion.tempo_visita > 60 ? <Text>{Number((planificacion.tempo_visita / 60).toFixed(1))} h</Text> : <Text>{Math.round(planificacion.tempo_visita)} min</Text>}</Text>
                        </View>
                        <View style={borderStyle.viewTextContainer}>
                            <Title style={borderStyle.titleSize}>Distancia total</Title>
                            <Text style={borderStyle.textBold}>{(planificacion.distancia).toFixed(1)} km</Text>
                        </View>
                        <View style={borderStyle.viewTextContainer}>
                            <Title style={borderStyle.titleSize}>Elementos a visitar</Title>
                            <Text style={borderStyle.textBold}>{elements.elementos.length} elementos</Text>
                        </View>
                    </View>
                </ScrollView> :
                <NoElementsPlanificadorView />
    )
}

export default DatosRuta;