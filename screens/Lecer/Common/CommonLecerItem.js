/**
 * @fileoverview Pantalla dun elemento de lecer concreto
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
import Opinions from '../../Common/Opinions';

// compoñentes
import { getOpinions as getOpinionsModel } from '../../../model/Opinions/Opinions';
import ProgressBar from '../../../components/ProgressBar';

// estilos
import { stylesTurismoList as styles } from '../../../styles/styles';

/**
 * Compoñente que conforma a pantalla dun elemento de lecer concreto
 * @param {Object} props 
 * @returns {Component}
 */
const CommonLecerItem = (props) => {

    const [opinions, setOpinions] = useState({                              // Estado que reúne as opinións do elemento
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });
    const [loading, setLoading] = useState(true);                           // Estado que indica cando o compoñente está cargando datos

    const lecer = props.route.params.lecer;                                 // Obxecto que reúne a información do elemento
    var titulo = lecer.titulo == null ? lecer.sub_tag : lecer.titulo;       // Título da pantalla

    /**
     * Obtén información sobre o elemento
     * @param {Boolean} mounted 
     * @param {Boolean} signal 
     * @returns 
     */
    const onGetData = async (mounted, signal) => {
        try {
            
            const data = await getOpinionsModel(lecer.tipo, lecer.id, signal);

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
     * Execútase o contido da función cando se constrúe o compoñente
     */
    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();                      // Control dunha petición web para maior seguridade
        const signal = abortController.signal;

        const getOpinions = async () => {
            await onGetData(mounted, signal);
        }

        if (mounted) {
            getOpinions();
        }

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, []);

    /**
     * Execútase o contido da función cando se constrúe o compoñente
     */
    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({                                   // Establécense opcións de navegación da presente pantalla
                title: "Opinións de " + titulo
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
            <Opinions opinions={opinions} element={lecer} onRefreshOpinions={onRefreshOpinions} titulo={lecer.titulo == null ? lecer.sub_tag : lecer.titulo} isLecer={true} />
    )

}

export default CommonLecerItem;