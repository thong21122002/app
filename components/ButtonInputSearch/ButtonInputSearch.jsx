import React from "react";
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const {
        size, placeholder, textButton,
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(255, 0,0)',
        colorButton = '#fff',
        marginLeftButton = '5px'
    } = props
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}

                {...props}
            />
            <ButtonComponent
                size={size}
                bordered={bordered}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none', marginLeft: marginLeftButton }}
                icon={<SearchOutlined corlor={colorButton} style={{ color: '#fff' }} />}
                textButton={textButton}
            />
        </div>
    )
}

export default ButtonInputSearch