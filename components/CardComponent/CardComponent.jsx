import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from "./style";
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    return (

        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            cover={
                <div style={{ position: 'relative' }}>
                    {countInStock === 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                zIndex: 1,
                            }}
                        >
                            Hết hàng
                        </div>
                    )}
                    <img alt="example" src={image} />
                </div>
            }
            onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
            disabled={countInStock === 0}
        >
            <img
                src={logo}
                style={{
                    width: '68px', height: '14px', position: 'absolute', top: -1, left: -1,
                    borderTopLeftRadius: '3px'
                }} />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span stype={{ marginright: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '10px', color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell>| Đã bán {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                    -{discount || 0} %
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent