/**
 * @fileoverview Tarxeta dun comentario sobre un determinado elemento
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

// compoñentes
import { AvatarIcon, CloseIconButton, EditIconButton } from './CustomIcons'
import Stars from './CustomStarsDisplay';

// estilos
import { cardElementOpinion as styles } from '../styles/styles'

/**
 * Compoñente que conforma a tarxeta dun comentario sobre un elemento
 * @param {Object} props 
 * @returns {Component}
 */
const CardElementOpinion = (props) => {

    const opinion = props.opinion;                  // Obxecto que agrupa a información do comentario
    const isUsuario = props.isUsuario;              // Boolean que indica se o comentario se está amosando dente a pantalla de usuarios ou non
    const onEdit = props.onEdit;                    // Función que permitirá realizar a operación de edición do comentario
    const onDelete = props.onDelete;                // Función que permitirá realizar a operación de eliminación do comentario

    return (
        <Card>
            <View style={styles.header}>
                <AvatarIcon size={40} style={{ flex: 1 }} />
                {
                    isUsuario ?                     // Se non se amosa na pantalla de usuarios, amósase o nome do usuario
                        <></>
                        :
                        <Text style={{ flex: 2, fontSize: 18, fontWeight: "bold" }}>{opinion.usuario}</Text>
                }
                <Stars style={{ flex: 1 }} value={opinion.valoracion} />
                {
                    isUsuario ?                     // Se se amosa na pantalla de usuarios, amósase o botón de borrado
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 2 }}>
                            <EditIconButton style={{ flex: 0 }} onPress={() => {
                                onEdit(opinion);
                            }} />
                            <CloseIconButton style={{ flex: 0 }} closeIconOnPress={() => {
                                onDelete(opinion);
                            }} />
                        </View>
                        :
                        <></>
                }
            </View>
            <Card.Divider />
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>{opinion.titulo}</Text>
                <Text style={{ fontSize: 18 }}>{opinion.comentario}</Text>
            </View>
            <View style={styles.dataContanier}>
                {
                    isUsuario ?                     // Se se amosa na pantalla de usuarios, amósase o elemento sobre o que está realizado o comentario
                        <Text style={{ justifyContent: "flex-start", flex: 1, fontWeight: "bold", fontSize: 15 }}>{opinion.elemento}</Text>
                        :
                        <></>
                }
                <Text style={{ flex: 0, fontSize: 15 }}>{opinion.data}</Text>
            </View>
        </Card>
    )
}

export default CardElementOpinion;