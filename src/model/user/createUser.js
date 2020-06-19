import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import { Form, Input, Button, Checkbox, Result } from 'antd';
import SuccessModal from "./successModal";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const ADD_USER_API = gql`
   mutation ( $payload:user_input_payload!,) {
   createUser( payload: $payload){
        id
        data {
            name
            address
        }
    }
}

`;


function AddUserForm() {
    const [loader, setLoader]=useState(false);
    const [createUser, {data:mutationRespons ,loading: mutationLoading, error: mutationError}]  = useMutation(ADD_USER_API);
    const [form] = Form.useForm();


    const onReset = () => {
        form.resetFields();
    };

    const onFinish = values => {

        if(values.name.length>0 && values.address.length>0) {
            createUser({
                variables:
                    {
                        payload: {"name": values.name, "address": values.address}
                    }
            });
            setTimeout(() => {
                form.resetFields();
            }, 1000);
        }
    };

    return (
        <div>
        <Form
            layout="vertical"
            name="Title"
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                label="Username"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Please input your  address!',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
            {mutationRespons && mutationRespons.createUser.data && <SuccessModal
            data={"Successfully User created"}/>
            }
        </div>


    );
}
export default AddUserForm;
