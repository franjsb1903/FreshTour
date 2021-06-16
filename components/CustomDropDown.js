/**
 * @fileoverview Compoñente DropDown (combo-box)
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-elements';

/**
 * Compoñente DropDown personalizado
 * @param {Object} props 
 * @returns {Component}
 */
const CustomDropDown = (props) => {

    const items = props.items;                      // Array cas opcións do DropDown
    const onChange = props.onChange;                // Función que indica a operación a realizar cando se selecciona un elemento no DropDown
    const style = props.style;                      // Obxecto cos estilos a aplicar
    const container = props.container;              // Obxecto cos estilos a aplicar no contenedor
    const defaultValue = props.defaultValue;        // Valor por defecto

    return (
        <DropDownPicker
                    items={items}
                    containerStyle={container}
                    style={style.style}
                    globalTextStyle={style.text}
                    defaultValue={defaultValue}
                    onChangeItem={item => {
                        onChange(item);
                    }}
                    scrollViewProps={{ heigth: 90 }}
                    dropDownStyle={style.style}
                    renderSeperator={() => {
                        return (
                            <Card.Divider />
                        )
                    }}

                />
    )

}

export default CustomDropDown;