import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Tag, Typography} from 'antd';
import {BlockOutlined} from '@ant-design/icons';
import "../../styles/form.css";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import SuccessModal from "../../commonComponents/successModal";
import AutoCompleteComponent from "../../commonComponents/autocomplete";

const { TextArea } = Input;

const EDIT_COMMENT_API = gql`
 mutation ($_id: String!, $payload: comment_input_payload!, $connect: comment_input_connection_payload!) {
    updateComment(_id: $_id, payload: $payload, connect: $connect) {
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

const EDIT_NEW_COMMENT_API = gql`
 mutation ($_id: String!, $payload: comment_input_payload!, $connect: comment_input_connection_payload!,$disconnect: comment_input_disconnection_payload!) {
    updateComment(_id: $_id, payload: $payload, connect: $connect,disconnect: $disconnect) {
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

const POSTS_API = gql`
  query Posts {
    posts{
        id
        data {
            body
            title
       
        }
        comment {
            id
            data {
                body
                
            }
          
        }
        
    }
    }

`;

export default  function  PostFormLayout(props) {
    const {  data:post } = useQuery(POSTS_API,{});
    const [profileState, setProfileState] = useState(props);
    const [updateTagPosts, setUpdateTagPosts]= useState(props.post);

    const [sabdhanModal, setSabdhanModal]= useState(false);
    const postFromComment = props.post;

    useEffect(() => {
        setProfileState(props)
        setBody(props.comment.data.body)
        setCommentId(props.comment.id)
        setUpdateTagPosts(props.post);
        },[props]);



    const commentInfo= profileState.comment;
    const commentBody= profileState.comment.data.body;
    const commentIdIs= profileState.comment.id;

    const [body,setBody]=useState(commentBody);
    const [commentId,setCommentId]=useState(commentIdIs);


    const [updateComment, {data: mutationResult, loading: mutationLoading, error: mutationError}]  = useMutation(props.post.length>0 ? EDIT_NEW_COMMENT_API : EDIT_COMMENT_API   );

    function handleCommentChange(e) {
        setBody(e.target.value);
    }

    function removeDuplicateDataFromArray(data) {
        return [... new Set(data)];
    }
    function handleSearchInput(post) {
        let oldPosts= [];
        // oldPosts=updateTagPosts;
        oldPosts.push(post);
        let newArray= removeDuplicateDataFromArray(oldPosts);
        setUpdateTagPosts(newArray);
    }

    function onClose(post){
        let old=[];
        old= updateTagPosts;
        let filtered = old.filter(value=> value.id != post.id);
        setUpdateTagPosts(filtered);
    }
    function  updateCommmentApi() {
        if(props.post && props.post.length>0) {
            if(updateTagPosts.length>0){
                updateComment({
                    variables:
                        {
                            _id: commentIdIs,
                            payload: {"body": body},
                            connect: {"post_id": updateTagPosts[0].id},
                            disconnect: {"post_id": props.post[0].id},

                        }
                });
            }
            else
            {
                setSabdhanModal(true)
                setTimeout(() => {
                    setSabdhanModal(false)
                }, 2000);
            }
        }
        else {
            updateComment({
                variables:
                    {
                        _id: commentIdIs,
                        payload: {"body": body},
                        connect: {"post_id": updateTagPosts[0].id},
                    }
            });
        }
    }

    // console.log(updateTagPosts);

    if(mutationResult && mutationResult.updateComment){
        props.callbackData (true);
    }

    if(sabdhanModal===true){
        alert("You have to put at least one comment");
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
                                     onClick={updateCommmentApi}
                    >
                        Update</Button>}
                >

                <Typography className="form-filed-title"> Body </Typography>
                    <br/>
                    <TextArea placeholder="Comment here"
                       onChange={ handleCommentChange}
                       value={body}
                       allowClear
                              autoSize={{minRows: 6}}



                />

                    <br/> <br/>

                <Typography className="form-filed-title"> Posts </Typography>
                    <Typography className="form-filed-subtitle">Search posts  and assign it to the post </Typography>

                    {post && post.posts && < AutoCompleteComponent
                        data={post.posts}
                        selectFromSearch={handleSearchInput}
                    />}


                    {updateTagPosts && updateTagPosts.length > 0 && updateTagPosts !==undefined && updateTagPosts.map(post => {
                        return (

                            <Tag closable onClose={() => onClose(post)} key={post.id} style={{fontWeight:700, color:"black"}} >
                                {post.data.title}
                            </Tag>

                        )
                    })}
                    <br/>

                </Card>

                {mutationResult && mutationResult.updateComment && <SuccessModal data={"Successfully Comment Edited"}/>}

            </div>

        );
    }

