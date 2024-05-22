import React, { useState, useEffect } from "react";
import { Badge, Col, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall, WrapperHeaderKeep } from "./style";
import Search from "antd/es/transfer/search";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService"
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";
//import { isPending } from "@reduxjs/toolkit";
import logo from '../../assets/images/logo.jpg'
import { removeOrder, removeOrderProduct } from "../../redux/slides/orderSlide";



const HeaderComponent = (isHiddenCart = false, isHiddenSearch = false) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const order = useSelector((state) => state.order)
    const [loading, setLoading] = useState(false)
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        dispatch(removeOrder())
        navigate('/')
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (

                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );
    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
        setIsOpenPopup(false)
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    const handleNavigateHome = () => {
        navigate('/')
    }

    return (

        <div style={{ width: '100%', position: 'fixed', zIndex: 999, top: 0, left: 0 }} >
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader style={{ cursor: 'pointer' }} onClick={() => { handleNavigateHome() }}>
                        <img src={logo} style={{
                            height: '60px',
                            width: '85%',
                            //borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '1px'
                        }} alt="avatar" />
                    </WrapperTextHeader>
                </Col>
                {isHiddenSearch && (
                    <Col span={13} >
                        <ButtonInputSearch
                            size="large"
                            bordered={false}
                            textButton="Tìm kiếm"
                            placeholder="Nhập tìm kiếm sản phẩm"
                            //allowClear
                            //enterButton//="Search"
                            onChange={onSearch}

                        />
                    </Col>
                )}

                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isPending={loading}>
                        <WrapperHeaderAccout >
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '60px',
                                    width: '50px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '28px' }} />
                            )}

                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click" open={isOpenPopup}>
                                        <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>

                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall >
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall >
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}

                        </WrapperHeaderAccout>
                    </Loading>
                    {isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '28px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall >Giỏ hàng</WrapperTextHeaderSmall >
                        </div>
                    )}


                </Col>
            </WrapperHeader>
        </div >

    )
}

export default HeaderComponent