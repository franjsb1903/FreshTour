import React from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

import { AvatarIcon, CloseIconButton, EditIconButton } from './CustomIcons'
import Stars from './CustomStarsDisplay';
import { cardElementOpinion as styles } from '../styles/styles'

const CardElementOpinion = (props) => {

    const opinion = props.opinion;
    const isUsuario = props.isUsuario;
    const onEdit = props.onEdit;
    const onDelete = props.onDelete;

    return (
        <Card>
            <View style={styles.header}>
                <AvatarIcon size={40} style={{ flex: 1 }} />
                {
                    isUsuario ?
                        <></>
                        :
                        <Text style={{ flex: 2, fontSize: 18, fontWeight: "bold" }}>{opinion.usuario}</Text>
                }
                <Stars style={{ flex: 1 }} value={opinion.valoracion} />
                {
                    isUsuario ?
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
                    isUsuario ?
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