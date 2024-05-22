import { Button, Form, Select, Space } from 'antd'
import React, { useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'

import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'
import PieChartComponent2 from './PieChart2'
import DrawerComponent from '../DrawerComponent/DrawerCompoment'
import { useMutationHooks } from "../../hooks/useMutationHook";

const OrderAdmin = () => {
    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [form] = Form.useForm()
    const inittial = () => ({
        userName: '',
        phone: '',
        address: '',
        city: '',
        totalPrice: '',
        paidAt: '',
        paymentMethod: '',
        isPaid: false,
        isDelivered: false,

    })

    const [stateOrderDetails, setStateOrderDetails] = useState(inittial())
    const getCurrentTime = () => {
        return new Date().toISOString();
    };

    const handleOnchangeDetails = (value) => {
        const paidAtTemp = getCurrentTime()
        if (value === true && stateOrderDetails.isPaid === false) {
            setStateOrderDetails({
                ...stateOrderDetails,
                isDelivered: value,
                isPaid: true,
                paidAt: paidAtTemp

            })
        } else {
            setStateOrderDetails({
                ...stateOrderDetails,
                isDelivered: value,
            })
        }

    }

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }


    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    const { isPending: isPendingOrders, data: orders } = queryOrder

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });
    const mutation = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = OrderService.updateOrder(
                id,
                token,
                { ...rests }
            )
            return res
        },
    )
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateOrderDetails({
            ...stateOrderDetails,
            userName: '',
            phone: '',
            address: '',
            city: '',
            totalPrice: '',
            paidAt: '',
            paymentMethod: '',
            isPaid: false,
            isDelivered: false
        })
        form.resetFields()
    }


    const { data, isPending, isSuccess, isError } = mutation
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    const fetchGetDetailsOrder = async (rowSelected) => {
        const res = await OrderService.getDetailsOrder(rowSelected)
        if (res?.data) {
            setStateOrderDetails({
                userName: res?.data?.shippingAddress?.fullName,
                phone: res?.data?.shippingAddress?.phone,
                address: res?.data?.shippingAddress?.address,
                city: res?.data?.shippingAddress?.city,
                totalPrice: res?.data?.totalPrice,
                paidAt: res?.data?.paidAt,
                paymentMethod: res?.data?.paymentMethod,
                isPaid: res?.data?.isPaid,
                isDelivered: res?.data?.isDelivered

            })
        }
        console.log('res', res)
    }
    console.log('stateOrderDetails', stateOrderDetails)
    useEffect(() => {
        form.setFieldsValue(stateOrderDetails)
    }, [form, stateOrderDetails])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsOrder(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsOrder = () => {
        // if (rowSelected) {
        //     fetchGetDetailsOrder()
        // }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
    }

    const onUpdateOrder = () => {
        mutation.mutate({ id: rowSelected, token: user?.access_token, ...stateOrderDetails }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })
    }


    const renderAction = () => {
        return (
            <div>
                <EditOutlined style={{ fontSize: '30px', color: 'orange', cursor: 'pointer' }} onClick={handleDetailsOrder} />
            </div>
        )
    }

    const columns = [
        {
            title: 'User name',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Paided',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
            ...getColumnSearchProps('isPaid')
        },
        {
            title: 'Shipped',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
            ...getColumnSearchProps('isDelivered')
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod')
        },
        {
            title: 'Total price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
            ...getColumnSearchProps('totalPrice')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];


    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        //console.log('usewr', order)
        return {
            ...order,
            key: order._id,
            userName: order?.shippingAddress?.fullName,
            phone: order?.shippingAddress?.phone,
            address: order?.shippingAddress?.address,
            paymentMethod: orderContant.payment[order?.paymentMethod],
            isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
            isDelivered: order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng',
            totalPrice: convertPrice(order?.totalPrice)
        }
    })

    return (
        <div>
            <Loading isPending={isPending} >
                <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
                <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ height: 200, width: 200 }}>
                        <PieChartComponent data={orders?.data} />
                        <span style={{ marginLeft: '55px' }}>Phương thức thanh toán</span>

                    </div>
                    <div style={{ height: 200, width: 200 }}>
                        <PieChartComponent2 data={orders?.data} />
                        <span style={{ marginLeft: '55px' }}>Tình trạng thanh toán</span>

                    </div>
                </div>

                {/* <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} />
            </div> */}
                <div style={{ marginTop: '20px' }}>
                    <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        }
                    }} />
                </div>
                <Loading isPending={isPendingOrders} >
                    <DrawerComponent title='Chi tiết đặt hàng - Xác nhận đặt hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                        <Form
                            name="basic"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            //onFinish={onUpdateOrder}
                            onFinish={onUpdateOrder}
                            autoComplete="on"
                            form={form}
                        //initialValues={stateOrderDetails}
                        >
                            <Form.Item
                                label="User Name"
                                name="userName"
                            //rules={[{ required: true }]}
                            >
                                <InputComponent value={stateOrderDetails.userName} name="userName" />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                            //rules={[{ required: true }]}
                            >
                                <InputComponent value={stateOrderDetails.phone} name="phone" />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name="address"
                            //rules={[{ required: true }]}
                            >
                                <InputComponent value={stateOrderDetails.address} name="address" />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                            //rules={[{ required: true }]}
                            >
                                <InputComponent value={stateOrderDetails.city} name="city" />
                            </Form.Item>

                            <Form.Item
                                label="total Price"
                                name="totalPrice"
                            //rules={[{ required: true }]}
                            >
                                <InputComponent value={stateOrderDetails.totalPrice} name="totalPrice" />
                            </Form.Item>
                            <Form.Item
                                label="Paid At"
                                name="paidAt"

                            >
                                <InputComponent value={stateOrderDetails.paidAt} name="paidAt" />
                            </Form.Item>

                            <Form.Item
                                label="Payment Method"
                                name="paymentMethod"

                            >
                                <InputComponent value={stateOrderDetails.paymentMethod} name="paymentMethod" />
                            </Form.Item>



                            <Form.Item
                                label="Is Delivered:"
                                name="isDelivered"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    name="isDelivered"
                                    value={stateOrderDetails['isDelivered']}
                                    onChange={handleOnchangeDetails}
                                    options={[
                                        {
                                            value: false,
                                            label: 'Chưa giao hàng',
                                        },
                                        {
                                            value: true,
                                            label: 'Đã giao hàng',
                                        }

                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Is Paid"
                                name="isPaid"
                            >
                                <InputComponent value={stateOrderDetails.isPaid} name="isPaid" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Apply
                                </Button>
                            </Form.Item>
                        </Form>
                    </DrawerComponent>
                </Loading>
            </Loading>


        </div>
    )
}

export default OrderAdmin