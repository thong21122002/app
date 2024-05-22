import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';



const AdminPage = () => {
    const user = useSelector((state) => state?.user)
    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'products', <AppstoreOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    ];

    const [keySelected, setKeySelected] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return (
                    <AdminUser />
                )
            case 'products':
                return (
                    <AdminProduct />
                )
            case 'orders':
                return (
                    <OrderAdmin />
                )
            default:
                return <></>
        }
    }

    const handleOnCLick = ({ key }) => {
        setKeySelected(key)
    }




    return (
        <div style={{ marginTop: '79px' }}>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex', overflowX: 'hidden' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>

            </div>
        </div>
    )

}

export default AdminPage