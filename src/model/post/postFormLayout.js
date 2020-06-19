import React, {useEffect, useState} from 'react';
import {Button, Card, Input ,Typography} from 'antd';
import {BlockOutlined} from '@ant-design/icons';
import "../../styles/form.css";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import SuccessModal from "../../commonComponents/successModal";

const { TextArea } = Input;

const EDIT_POST_API = gql`
  mutation ($_id: String!, $payload: post_input_payload!, $connect: post_input_connection_payload!, $disconnect: post_input_disconnection_payload!) {
    updatePost(_id: $_id, payload: $payload,
        connect: $connect, disconnect: $disconnect) {
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

export default  function  PostFormLayout(props) {
    const [profileState, setProfileState] = useState(props);
    const [state,setState]=useState(false);

    useEffect(() => {
        setProfileState(props)
        setTitle(props.post.data.title)
        setBody(props.post.data.body)
        setPostId(props.post.id)

    },[props]);

    const postInfo= profileState.post;
    const postTitle= profileState.post.data.title;
    const postBody= profileState.post.data.body;
    const postIdIs= profileState.post.id;

    const [title,setTitle]=useState(postTitle);
    const [body,setBody]=useState(postBody);
    const [postId,setPostId]=useState(postIdIs);

    const [updatePost, {data: mutationResult, loading: mutationLoading, error: mutationError}]  = useMutation(EDIT_POST_API);
    console.log(">>>",setProfileState);

    function handleNameChange(e) {

        setTitle(e.target.value);
    }
    function handleAddressChange(e) {
        setBody(e.target.value);
    }

    if(mutationResult && mutationResult.updatePost){
          props.callbackData (true);
    }


    if(postInfo===undefined) {
            return   (<div>
                <Card
                    style={{ width: '100%' , height:"93vh"}}
                    bordered="false"
                    headStyle={{fontSize:24, color:"#686f74"}}
                >
                </Card>
            </div>)
        }

        else return (
            <div>
                <Card
                    style={{ width: '100%' , height:"93vh"}}
                    title="Edit a post"
                    bordered="false"
                    headStyle={{fontSize:24, color:"#686f74"}}
                    extra={ <Button  shape="round" icon={<BlockOutlined />} size={"large"}
                                     onClick={e => {
                                         e.preventDefault();
                                         setState(true)
                                         updatePost({ variables:
                                                 {
                                                     _id: postIdIs,
                                                     payload:{"title": title,"body": body },
                                                     connect:{"comment_ids": "connectedCommentId" },
                                                     disconnect:{"comment_ids": "disConnectedCommentId" },

                                                 }

                                         });
                                     } }
                    >
                        Update</Button>}
                >

                <Typography className="form-filed-title"> Title </Typography>
                    <br/>
                <Input placeholder="Your name"
                       onChange={handleNameChange}
                       value={title}

                />

                    <br/> <br/>

                <Typography className="form-filed-title"> Body </Typography>
                    <br/>
                <TextArea  placeholder="Your address"
                       value={body}
                       onChange={handleAddressChange}
                           autoSize={{minRows: 6, }}
                />

                    <br/><br/>

                <Typography className="form-filed-title"> Comments </Typography>
                    <Typography className="form-filed-subtitle">Search comments  and assign it to the post </Typography>
                <Input placeholder="Your posts here"
                       value=""

                />
                    <br/>
                </Card>

                {mutationResult && mutationResult.updatePost && <SuccessModal data={"Successfully Post Edited"}/>}

            </div>

        );
    }

