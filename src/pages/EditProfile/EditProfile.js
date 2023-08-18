import {Button, Form, Input, Modal} from "antd";
import React, {useState} from "react";
import {errorCPass, errorLength, invalidEmail, isRequired} from "../../constant/constants";
import {changePassword, updateUser} from "../../redux-store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "../../services/auth.service";


const EditProfile = ({show,onClose}) => {

    const [isDisabled, setIsDisabled] = useState(false);
    const dispatch= useDispatch();
    const {user} = useSelector((state)=>state.users);
    const [selectedFile, setSelectedFile] = useState();
    const [tempVariable, setTempVariable] = useState(null);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setTempVariable(1);
    };

    const handleFormSubmit = async (values) => {
        setIsDisabled(true)

        if (user.name !== values.name || user.surname !== values.surname || user.mail !== values.mail ||
            user.city !== values.city || tempVariable !== null) {

            let responseImage = null;
            if (tempVariable !== null) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                responseImage = await uploadImage(formData);
            }
            const uploadData = {
                name:values.name,
                surname:values.surname,
                city: values.city,
                avatar: tempVariable !==null ? responseImage.data : user.avatar,
                mail:values.mail
            };
            await dispatch(updateUser({id:user.id,value:uploadData}));
            setTimeout(() => {
                setIsDisabled(false);
                onClose();
            }, 1000);
        }

    };

    return (
        <>
            <Modal maskClosable={false} title={<div style={{ textAlign: 'center', fontSize: '20px' }}>Edit profile</div>} footer={[
            ]} open={show} onCancel={onClose}  bodyStyle={{ height: '50%', overflowY: 'auto' }}>
                <br/>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleFormSubmit}
                    style={{ maxWidth: 600 }}
                    onClick={event => event.stopPropagation()}
                    initialValues={{
                        name: user.name,
                        surname: user.surname,
                        mail: user.mail,
                        username:user.username,
                        city: user.city,
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"

                        rules={[
                            {
                                required: true,
                                message: 'Name' + isRequired,

                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Surname: "
                        name="surname"

                        rules={[
                            {
                                required: true,
                                message: 'Surname' + isRequired,
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Username: "
                        name="username"

                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label="Email: "
                        name="mail"

                        rules={[
                            {
                                required: true,
                                message: 'Email' + isRequired,
                            },
                            {
                                type: "email",
                                message: invalidEmail
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="City: "
                        name="city"

                        rules={[
                            {
                                required: true,
                                message: 'City' + isRequired,
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        name="avatar"
                    ><input type="file" onChange={changeHandler} id="file" name="file"
                            accept=".jpg, .jpeg, .png"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 18, span: 14 }}>
                        <Button type="primary" htmlType="submit" disabled={isDisabled}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditProfile;