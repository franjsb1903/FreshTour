import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-elements';

const CustomDropDown = (props) => {

    const items = props.items;
    const onChange = props.onChange;
    const style = props.style;
    const container = props.style;
    const defaultValue = props.defaultValue;

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