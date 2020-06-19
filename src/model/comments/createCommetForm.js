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
   mutation ( $payload: comment_input_payload!) {
   createComment(payload: $payload){
      id
        data {
            body
        }
        post {
            id
            data {
                title
            }
        }
    }
}

`;


function CreateCommentForm() {
    const [loader, setLoader]=useState(false);
    const [createComment, {data:mutationRespons ,loading: mutationLoading, error: mutationError}]  = useMutation(CREATE_POST_API);
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = values => {

        if(values.body.length>0) {
            createComment({
                variables:
                    {
                        payload: {"body": values.body}
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
            name="Comment"
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                label="Body"
                name="body"
                rules={[
                    {
                        required: true,
                        message: 'Please input your comment!',
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
            {mutationRespons && mutationRespons.createComment.data && <SuccessModal
            data={"Successfully Comment added"}/>
            }
        </div>


    );
}
export default CreateCommentForm;
