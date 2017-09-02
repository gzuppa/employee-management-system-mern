import React from 'react'
import { Button, Form, Input, Radio, Modal, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;



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
                    <FormItem label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please Enter user name' }],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="Age">
                        {getFieldDecorator('age')(<Input type="number" />)}
                    </FormItem>
                    <FormItem label="Gender">
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: 'Please select your gender!' }],
                        })(
                            <Select>
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                            )}
                    </FormItem>
                    {/* <FormItem className="collection-create-form_last-form-item">
                        {getFieldDecorator('modifier', {
                            initialValue: 'public',
                        })(
                            <Radio.Group>
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </Radio.Group>
                            )}
                    </FormItem> */}
                </Form>
            </Modal>
        );
    }
);

export default AddEmployeeForm;
