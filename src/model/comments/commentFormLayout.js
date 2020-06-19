import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Typography} from 'antd';
import {BlockOutlined} from '@ant-design/icons';
import "../../styles/form.css";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import SuccessModal from "../../commonComponents/successModal";

const { TextArea } = Input;


const EDIT_COMMENT_API = gql`
 mutation ($_id: String!, $payload: comment_input_payload!, $connect: comment_input_connection_payload!, $disconnect: comment_input_disconnection_payload!) {
    updateComment(_id: $_id, payload: $payload, connect: $connect, disconnect: $disconnect) {
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

export default  function  PostFormLayout(props) {
    const [profileState, setProfileState] = useState(props);
    const [state,setState]=useState(false);

    useEffect(() => {
        setProfileState(props)
        setBody(props.comment.data.body)
        setCommentId(props.comment.id)

    },[props]);

    const commentInfo= profileState.comment;
    const commentBody= profileState.comment.data.body;
    const commentIdIs= profileState.comment.id;

    const [body,setBody]=useState(commentBody);
    const [commentId,setCommentId]=useState(commentIdIs);

    const [updateComment, {data: mutationResult, loading: mutationLoading, error: mutationError}]  = useMutation(EDIT_COMMENT_API);


    function handleCommentChange(e) {
        setBody(e.target.value);
    }

    if(mutationResult && mutationResult.updateComment){
          props.callbackData (true);
    }


    if(commentInfo===undefined) {
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
                                         updateComment({ variables:
                                                 {
                                                     _id: commentIdIs,
                                                     payload:{"body": body },
                                                     connect:{"comment_ids": "connectedCommentId" },
                                                     disconnect:{"comment_ids": "disConnectedCommentId" },

                                                 }

                                         });
                                     } }
                    >
                        Update</Button>}
                >

                <Typography className="form-filed-title"> BOdy </Typography>
                    <br/>
                    <TextArea placeholder="Comment here"
                       onChange={ handleCommentChange}
                       value={body}
                       allowClear
                              autoSize={{minRows: 6}}



                />

                    <br/> <br/>

                <Typography className="form-filed-title"> Posts </Typography>
                    <Typography className="form-filed-subtitle">Search comments  and assign it to the post </Typography>
                <Input placeholder="Your posts here"
                       value=""

                />
                    <br/>
                </Card>

                {mutationResult && mutationResult.updateComment && <SuccessModal data={"Successfully Comment Edited"}/>}

            </div>

        );
    }

