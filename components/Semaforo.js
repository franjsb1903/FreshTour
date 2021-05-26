import React from 'react';
import { HappyIcon, MediumHappyIcon, SadIcon } from './CustomIcons';
import properties from '../properties/properties_expo';

const Semaforo = (props) => {

    const value = props.value;
    const type = props.type;
    const size = props.size;

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