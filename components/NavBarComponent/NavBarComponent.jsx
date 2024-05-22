import { Checkbox, Rate } from 'antd'
import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { useNavigate } from "react-router-dom";


const NavBarComponent = () => {
    const navigate = useNavigate()
    const handleNavigateType = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
        //scrollToTop()
    }
    return (
        <div>
            <WrapperLableText>
                Lable
            </WrapperLableText>
            <WrapperContent>
                <div onClick={() => handleNavigateType('Laptop')} style={{ cursor: 'pointer', marginLeft: '5px' }}  > Laptop </div>
                <div onClick={() => handleNavigateType('Máy Chiếu')} style={{ cursor: 'pointer', marginLeft: '5px' }}  > Máy Chiếu </div>
                <div onClick={() => handleNavigateType('Máy PC')} style={{ cursor: 'pointer', marginLeft: '5px' }}  > Máy PC </div>
                <div onClick={() => handleNavigateType('Máy Photocopy')} style={{ cursor: 'pointer', marginLeft: '5px' }}  > Máy Photocopy </div>
                <div onClick={() => handleNavigateType('Máy in')} style={{ cursor: 'pointer', marginLeft: '5px' }} > Máy in </div>

            </WrapperContent>

        </div>
    )
}

export default NavBarComponent