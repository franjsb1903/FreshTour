/**
 * @fileoverview Pantalla que amosa as opinións realizadas polo usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, Component } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from "react-native-flash-message";

// estilos
import { stylesScroll } from '../../../styles/styles';

// modelo
import { deleteOpinion as deleteOpinionModel } from '../../../model/Opinions/Opinions';

// compoñentes
import CardElementOpinion from '../../../components/CardElementOpinion';
import NoData from '../../../components/NoData';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

// Util
import { getToken, shouldDeleteToken } from '../../../Util/TokenUtil';

/**
 * Compoñente que conforma a pantalla na que se amosan as opinións do usuario
 * @param {Object} props 
 * @returns {Component}
 */
const OpinionsUsuario = (props) => {

    const [confirmacion, setConfirmacion] = useState(false);    // Estado que amosa ou oculta un modal de confirmación

    const opinions = props.route.params.opinions;               // Array de opinións
    const usuario = props.route.params.usuario;                 // Obxecto que reúne a información do usuario

    /**
     * Amosa ou oculta o modal de confirmación
     */
    const showConfirmacion = () => {
        setConfirmacion(!confirmacion);
    }

    /**
     * Execútase cando o usuario quere editar un comentario
     * @param {Object} opinion 
     */
    const onEdit = (opinion) => {
        try {
            props.navigation.navigate('NewComment', {
                titulo: opinion.elemento,
                comment: opinion
            })
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Execútase cando o usuario quere borrar un comentario
     * @param {Object} opinion 
     * @returns 
     */
    const onDelete = async (opinion) => {
        try {
            const token = await getToken('id_token');
            if (!token) {
                showMessage({
                    message: 'Non se pode identificar ao usuario',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return;
            }
            const response = await deleteOpinionModel(token, opinion.id_elemento, opinion.tipo, opinion.id);
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                }
                return;
            }
            props.navigation.navigate('User');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <ScrollView style={stylesScroll.scroll} contentContainerStyle={stylesScroll.containerScroll}>
            {
                opinions.length == 0 ?
                    <NoData />
                    :
                    opinions.map((opinion, index) => {
                        return (
                            <View key={index*opinion.id}>
                                <CardElementOpinion key={opinion.id} opinion={opinion} usuario={usuario} isUsuario={true} onEdit={onEdit} onConfirm={showConfirmacion} />
                                <ModalConfirmacion key={index} modal={confirmacion} showModal={showConfirmacion} confirm={() => {
                                    onDelete(opinion)
                                }} text={"O comentario borrarase da aplicación, está seguro?"} />
                            </View>
                        )
                    })
            }
        </ScrollView>
    )
}

export default OpinionsUsuario;