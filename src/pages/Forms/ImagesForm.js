import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

const ImagesForm = ({onFinish}) => {

    return (
        <Form
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
        >
            <br/>
            <Form.List name="image"
                       rules={[
                           {
                               required: true,
                               message: 'Please add at least one image.',
                               validator: (_, value) => {
                                   if (value && value.length > 0) {
                                       return Promise.resolve();
                                   }
                                   return Promise.reject(new Error('Please add at least one image.'));
                               },
                           },
                       ]}>
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, ...restField}) => (
                            <Space
                                key={key}
                                style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                }}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'image']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing image',
                                        },
                                    ]}
                                >
                                    <input type="file" id="file" name="file"
                                           accept=".jpg, .jpeg, .png"/>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add field
                            </Button>
                        </Form.Item>
                        {fields.length === 0 && (
                            <Form.Item validateStatus="error" style={{fontWeight: 'bold'}}
                                       help="At least one image is required">
                            </Form.Item>
                        )}
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Form.Item wrapperCol={{offset: 18, span: 14}}>
                    <Button type="primary" htmlType="submit">
                        Continue
                    </Button>
                </Form.Item>
            </Form.Item>
        </Form>
    );
}
export default ImagesForm;