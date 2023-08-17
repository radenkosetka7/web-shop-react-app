import './EditProfile.css'
import {registration, uploadImage} from '../../services/auth.service';
import {
    signUpTitle, isRequired, errorLength, invalidEmail, errorCPass
} from '../../constant/constants';
import React, {useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import TextArea from "antd/es/input/TextArea";


const EditProfile = ({show,onClose}) => {

    const [isDisabled, setIsDisabled] = useState(false);

    const [statusCode, setStatusCode] = useState(null);

    return (
        <>
            <Modal maskClosable={false} title={<div style={{ textAlign: 'center', fontSize: '20px' }}>Customer Support</div>} footer={[
            ]} open={show} onCancel={onClose}  bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onClose}
                    style={{ maxWidth: 600 }}
                    onClick={event => event.stopPropagation()}
                >
                    <Form.Item label="Message" name="message" rules={[
                        { required: true, message: 'Please enter a message.' },
                        { max: 255, message: 'Message must not exceed 255 characters.' },
                    ]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                        <Button type="primary" htmlType="submit" disabled={isDisabled}>
                            Send message
                        </Button>
                    </Form.Item>
                    {
                        statusCode &&
                        <p className='error1' style={{maxWidth: "250px"}}>
                            {statusCode}
                        </p>

                    }
                </Form>
            </Modal>
        </>
    )
}
export default EditProfile;