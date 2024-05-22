import React, { useEffect } from 'react'
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from '../FooterComponent/FooterComponent';
import StickyFooter from 'react-sticky-footer';

const DefaultComponent = ({ children }) => {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    )

}

export default DefaultComponent