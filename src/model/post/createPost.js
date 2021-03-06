import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

import { Form, Input, Button, Checkbox, Result } from 'antd';
import SuccessModal from "../../commonComponents/successModal";

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


const CREATE_POST_API = gql`
   mutation (  $payload:  post_input_payload!) {
   createPost(payload: $payload){
      id
        data {
            body
            title
            __typename
        }
        comment {
            id
            data {
                body
                __typename
            }
            __typename
        }
        __typename
    }
}

`;


function CreatePostForm() {
    const [loader, setLoader]=useState(false);
    const [createPost, {data:mutationRespons ,loading: mutationLoading, error: mutationError}]  = useMutation(CREATE_POST_API);
    const [form] = Form.useForm();


    const onReset = () => {
        form.resetFields();
    };

    const onFinish = values => {

        if(values.name.length>0 && values.address.length>0) {
            createPost({
                variables:
                    {
                        payload: {"title": values.name, "body": values.address}
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
                        message: 'Please input your post!',
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
                        message: 'Please input your  post body!',
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
            {mutationRespons && mutationRespons.createPost.data && <SuccessModal
            data={"Successfully User created"}/>
            }
        </div>


    );
}
export default CreatePostForm;
