import React, { useState } from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, FacebookOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';


function scrollToTop() {
    window.scrollTo(0, 0);
}

const FooterComponent = ({ name }) => {
    const navigate = useNavigate()
    const handleNavigateType = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
        scrollToTop()
    }
    return (
        <div className="footer-new">
            <div className="infomation-footer" style={{ fontSize: '18px' }}>
                <p>Hoàng Minh Office</p>
                <span></span>
                <div className="phone-info">
                    <PhoneOutlined />
                    <i class="fa-solid fa-phone"></i>
                    <span>0939980965</span>
                </div>
                <div className="social-info">
                    <FacebookOutlined />
                    <i class="fa-solid fa-earth-americas"></i>
                    <span>www.facebook.com/hoangminhmobile</span>
                </div>
                <div className="mail-info">
                    <MailOutlined />
                    <i class="fa-solid fa-envelope"></i>
                    <span>hoangminhmobile-hotro@gmail.com</span>
                </div>
                <div className="address-info">
                    <GlobalOutlined />
                    <i class="fa-solid fa-location-dot"></i>
                    <span>
                        Khu II đường 3 tháng 2, phường Xuân Khánh, quận Ninh Kiều, Cần Thơ
                    </span>
                </div>
            </div>
            <div className="footer-link">
                <div className="social-media">
                    <div className="link">
                        <span>Hỗ trợ</span>
                        <ul>
                            <li>
                                <Link onClick={scrollToTop} to="/">
                                    Chính sách bảo hành
                                </Link>
                            </li>
                            <li>
                                <Link onClick={scrollToTop} to="/">
                                    Điều khoản sử dụng
                                </Link>
                            </li>
                            <li>
                                <Link onClick={scrollToTop} to="/member">
                                    Thông tin dự án và thành viên
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="social-media">
                    <div className="link">
                        <span>Sản phẩm</span>
                        <ul style={{ fontSize: '13px' }}>
                            <li>
                                <div onClick={() => handleNavigateType('Laptop')} style={{ cursor: 'pointer' }}  > Laptop </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigateType('Máy Chiếu')} style={{ cursor: 'pointer' }} > Máy Chiếu </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigateType('Máy PC')} style={{ cursor: 'pointer' }} > Máy PC </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigateType('Máy Photocopy')} style={{ cursor: 'pointer' }} > Máy Photocopy </div>
                            </li>
                            <li>
                                <div onClick={() => handleNavigateType('Máy in')} style={{ cursor: 'pointer' }} > Máy in </div>
                            </li>
                        </ul>
                        <div onClick={() => handleNavigateType(name)} > {name}  </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;
