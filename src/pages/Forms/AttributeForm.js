import React, { useEffect, useState } from "react";
import {Button, Form, Input, InputNumber} from "antd";
import {getCategories, getCategory} from "../../redux-store/categorySlice";
import {useDispatch, useSelector} from "react-redux";

const AttributeForm = ({ onFinish, categoryId, initialValues }) => {
    const [statusCode, setStatusCode] = useState(null);
    const dispatch = useDispatch();

    const {selectedCategory} = useSelector((state) => state.categories);
    useEffect(() => {
        if(categoryId !== null) {
            dispatch(getCategory({value: categoryId}));
        }
    }, [categoryId]);

    return (
        <Form
            initialValues={initialValues}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            onClick={(event) => event.stopPropagation()}
        >
            <br/>
            {selectedCategory !== null && selectedCategory.attributes.map((attribute) => (
                    <Form.Item
                        label={attribute.name}
                        name={`${attribute.id}`}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        rules={[{ required: true, message: "Please enter a value." }]}
                    >
                        {attribute.type === 'INT' || attribute.type === 'DOUBLE' ? (
                            <InputNumber min={1} />
                        ) : (
                            <Input />
                        )}
                    </Form.Item>
            ))}
            <Form.Item wrapperCol={{ offset: 18, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    Continue
                </Button>
            </Form.Item>
            {statusCode && <p className="error1" style={{ maxWidth: "250px" }}>{statusCode}</p>}
        </Form>
    );
};

export default AttributeForm;
