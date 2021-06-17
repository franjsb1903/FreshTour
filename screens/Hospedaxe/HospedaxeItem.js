/**
 * @fileoverview Pantalla dun elemento de hospedaxe concreto
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useEffect, useState, Component } from 'react';
import { View } from 'react-native';
import { showMessage } from "react-native-flash-message";

// pantallas
import Opinions from '../Common/Opinions';

// modelo
import { getOpinions as getOpinionsModel } from '../../model/Opinions/Opinions';

// estilo
import { stylesTurismoList as styles } from '../../styles/styles';

// compoñentes
import ProgressBar from '../../components/ProgressBar';

/**
 * Compoñente que conforma a pantalla dun elemento de hospedaxe concreto
 * @param {Object} props 
 * @returns {Component}
 */
const HospedaxeItem = (props) => {

    const [opinions, setOpinions] = useState({                          // Estado que reúne as opinións do elemento
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });
    const [loading, setLoading] = useState(true);                       // Estado que indica se a pantalla está cargando ou non

    const hospedaxe = props.route.params.hospedaxe;                     // Obxecto que reúne a información do elemento de hospedaxe

    /**
     * Obtén información do elemento de hospedaxe concreto
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns 
     */
    const onGetData = async (mounted, signal) => {
        try {
            const data = await getOpinionsModel(hospedaxe.tipo, hospedaxe.id, signal);

            if (data.status != 200) {
                showMessage({
                    message: 'Erro na obtención das opinións do elemento',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                if (mounted) {
                    setOpinions({
                        count: 0,
                        valoracion: 0,
                        opinions: [],
                        status: 0
                    });
                    setLoading(false);
                }
                return;
            } else {
                if (mounted) {
                    setOpinions({
                        count: data.count,
                        valoracion: data.valoracion,
                        opinions: data.opinions,
                        status: data.status
                    });
                    setLoading(false);
                }
            }
        } catch (err) {
            if (mounted) {
                setLoading(false);
            }
            console.error(err);
            showMessage({
                message: 'Erro na obtención das opinións do elemento',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Cando se monta o compoñente, execútase o contido da función
     */
    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();                  // Controla unha petición web, para rematala ou abortala cando o compoñente non se chega a montar
        const signal = abortController.signal;                          // Cuestión de seguridade, evita perdas de memoria

        const getOpinions = async () => {
            await onGetData(mounted, signal);
        }

        if (mounted)
            getOpinions();

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, []);

    /**
     * Cando se monta o compoñente, execútase o contido da función
     */
    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({                               // Establécense opcións de navegación da pantalla actual
                title: "Opinións de " + hospedaxe.titulo
            });
        }

        return () => mounted = false;
    }, []);

    /**
     * Refresca a pantalla
     */
    const onRefreshOpinions = async () => {
        await onGetData(true);
    }

    return (
        loading ?
            <View style={styles.container}>
                <ProgressBar />
            </View> :
            <Opinions opinions={opinions} element={hospedaxe} onRefreshOpinions={onRefreshOpinions} titulo={hospedaxe.titulo} isHospedaxe={true} />
    )

}

export default HospedaxeItem;