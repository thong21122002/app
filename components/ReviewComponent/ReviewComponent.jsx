import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ReviewService from '../../services/ReviewService'
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as message from '../../components/Message/Message'
import { useEffect, useState } from "react";
import { Form, Rate } from "antd";
import InputForm from "../InputForm/InputForm";
import { StarFilled } from '@ant-design/icons'

const ReviewComponent = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const inittial = () => ({
        email: '',
        name: '',
        comment: ''
    })

    const [stateReviewDetails, setStateReviewDetails] = useState(inittial())

    const [form] = Form.useForm()

    const mutation = useMutationHooks(
        data => ReviewService.createReview(data)
    )


    const { data, isPending, isSuccess, isError } = mutation
    console.log('69', data)



    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success('Thêm nhận xét thành công')
            setTimeout(() => {
                window.location.reload();
                window.scrollTo(0, 0);
            }, 1000);
            //handleNavigateSignIn()
        } else if (isError) {
            message.error('Lỗi')
        }
    }, [isSuccess, isError])

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleOnchangeComment = (value) => {
        setComment(value)
    }
    const handleCreateReview = () => {
        mutation.mutate({ email, name, comment })

    }
    console.log('dataaa', email, name, comment)



    return (
        <div style={{ padding: '0 120px' }}>
            <div style={{ margin: '20px 0', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ margin: 0 }}>Đánh giá sản phẩm</h2>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ flex: '0 0 120px', marginRight: '20px' }}>Tên khách hàng:</div>
                    <InputForm style={{ flex: '1' }} value={name} onChange={handleOnchangeName} name='name' />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ flex: '0 0 120px', marginRight: '20px' }}>Email:</div>
                    <InputForm style={{ flex: '1' }} value={email} onChange={handleOnchangeEmail} name='email' />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ flex: '0 0 120px', marginRight: '20px' }}>Nội dung đánh giá:</div>
                    <InputForm style={{ flex: '1' }} value={comment} onChange={handleOnchangeComment} name='comment' />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ flex: '0 0 120px', marginRight: '20px' }}>Số sao</div>
                    <Rate allowHalf defaultValue={5} value={4} />
                </div>

            </div>
            <ButtonComponent
                size={1000}
                styleButton={{ background: '#ccc', margin: '0 auto', display: 'block' }}
                textButton={'Gửi'}
                onClick={handleCreateReview}
            />
        </div>
    )
}

export default ReviewComponent;
