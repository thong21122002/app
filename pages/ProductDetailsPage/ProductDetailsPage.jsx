import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams, useNavigate } from 'react-router-dom'
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import ReviewComponent from "../../components/ReviewComponent/ReviewComponent";

const ProductDetailsPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    return (
        <div style={{ background: '#efefef', height: '100%', width: '100%', marginTop: '79px' }}>
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <h1><span style={{ cursor: 'pointer', fontWeight: 'bold' }}></span> -Chi tiết sản phẩm</h1>
                <ProductDetailsComponent idProduct={id} />
            </div>
            <ReviewComponent />
            <FooterComponent />
        </div>

    )
}

export default ProductDetailsPage