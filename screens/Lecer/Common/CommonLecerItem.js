import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Opinions from '../../Common/Opinions';

import { getOpinions as getOpinionsModel } from '../../../model/Opinions/Opinions';
import { stylesTurismoList as styles } from '../../../styles/styles';
import ProgressBar from '../../../components/ProgressBar';
import { showMessage } from "react-native-flash-message";

const CommonLecerItem = (props) => {

    const [opinions, setOpinions] = useState({
        count: 0,
        valoracion: 0,
        opinions: [],
        status: 0
    });
    const [loading, setLoading] = useState(true);

    const lecer = props.route.params.lecer;
    var titulo = lecer.titulo == null ? lecer.sub_tag : lecer.titulo;

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

    useEffect(() => {

        let mounted = true;

        const abortController = new AbortController();
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

    React.useLayoutEffect(() => {
        let mounted = true;
        if (mounted) {
            props.navigation.setOptions({
                title: "Opinións de " + titulo
            });
        }

        return () => mounted = false;
    }, []);

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