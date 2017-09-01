import React from 'react'
import { Button, Form, Input, Radio, Modal } from 'antd';
const FormItem = Form.Item;



const AddEmployeeForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, confirmLoading } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Add a new employee"
                okText="Add"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
                closable={false}
                maskClosable={false}
            >
                <Form layout="vertical">
                    <FormItem label="Title">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title of collection!' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="Description">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                    <FormItem className="collection-create-form_last-form-item">
                        {getFieldDecorator('modifier', {
                            initialValue: 'public',
                        })(
                            <Radio.Group>
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </Radio.Group>
                            )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

export default AddEmployeeForm;
