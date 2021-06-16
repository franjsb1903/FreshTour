/**
 * @fileoverview Semáforo para a calidade do aire
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';

// compoñentes
import { HappyIcon, MediumHappyIcon, SadIcon } from './CustomIcons';

// propiedades
import properties from '../properties/properties_expo';

/**
 * Compoñente que conforma o semáforo para a calidade do aire
 * @param {Object} props 
 * @returns {Component}
 */
const Semaforo = (props) => {

    const value = props.value;                          // Valor de calidade do aire
    const type = props.type;                            // Tipo de gas sobre o que amosar o semáforo
    const size = props.size;                            // Tamaño das iconas

    return (
        type == "no2" ?
            value < properties.calidade.no2.verde ?
                <HappyIcon size={size} />
                :
                value >= properties.calidade.no2.verde && value <= properties.calidade.no2.vermello ?
                    <MediumHappyIcon size={size} />
                    :
                    <SadIcon size={size} />
            :
            value < properties.calidade.o3.verde ?
                <HappyIcon size={size} />
                :
                value >= properties.calidade.o3.verde && value <= properties.calidade.o3.vermello ?
                    <MediumHappyIcon size={size} />
                    :
                    <SadIcon size={size} />
    )

}

export default Semaforo;