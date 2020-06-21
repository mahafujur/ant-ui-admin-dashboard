import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Tag, Typography} from 'antd';
import {BlockOutlined} from '@ant-design/icons';
import "../../styles/form.css";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import SuccessModal from "../../commonComponents/successModal";
import AutoCompleteComponent from "../../commonComponents/autocompleteForPost";

const { TextArea } = Input;

const COMMENTS_API = gql`
  query Comments {
    comments{
       id
        data {
            body
        }
        post {
            id
            data {
                title
                body
            }
        }
    }
    }
`;


const EDIT_POST_API = gql`
  mutation ($_id: String!, $payload: post_input_payload!, $connect: post_input_connection_payload!) {
    updatePost(_id: $_id, payload: $payload, connect: $connect) {
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


const EDIT_NEW_POST_API = gql`
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
    const {  data:comments} = useQuery(COMMENTS_API,{});
    const [profileState, setProfileState] = useState(props);
    const [updateTagPosts, setUpdateTagPosts]= useState(props.comment[0]);

    const [state,setState]=useState(false);
    const [sabdhanModal, setSabdhanModal]= useState(false);

    useEffect(() => {
        setProfileState(props)
        setTitle(props.post.data.title)
        setBody(props.post.data.body)
        setPostId(props.post.id)
        setUpdateTagPosts(props.comment[0]);
    },[props]);

    const postInfo= profileState.post;
    const postTitle= profileState.post.data.title;
    const postBody= profileState.post.data.body;
    const postIdIs= profileState.post.id;

    const [title,setTitle]=useState(postTitle);
    const [body,setBody]=useState(postBody);
    const [postId,setPostId]=useState(postIdIs);

    const [updatePost, {data: mutationResult, loading: mutationLoading, error: mutationError}]  = useMutation(props.comment.length>0 ? EDIT_NEW_POST_API : EDIT_POST_API);


    function handleNameChange(e) {

        setTitle(e.target.value);
    }
    function handleAddressChange(e) {
        setBody(e.target.value);
    }

    function removeDuplicateDataFromArray(data) {

        return data.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
    }

    function handleSearchInput(comment) {
        let oldComment= [];
        oldComment=updateTagPosts;
        oldComment.push(comment);
        let newArray= removeDuplicateDataFromArray(oldComment);
        setUpdateTagPosts(newArray);
    }

    function onClose(post){
        let old=[];
        old= updateTagPosts;
        let filtered = old.filter(value=> value.id != post.id);
        setUpdateTagPosts(filtered);
    }
    function  updatePostApi() {
        if(props.comment && props.comment[0].length>0) {

            if(updateTagPosts.length>0){

                updatePost({ variables:
                        {
                            _id: postIdIs,
                            payload:{"title": title,"body": body },
                            connect:{"comment_ids":  [updateTagPosts[0].id ]},
                            disconnect:{"comment_ids":[props.comment[0][0].id]},
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

            updatePost({


                variables:
                    {
                        _id: postIdIs,
                        payload:{"title": title,"body": body },
                        connect:{"comment_ids": [updateTagPosts[0].id ]}
                        // disconnect:{"comment_ids": "disConnectedCommentId" },
                    }
            });
        }
    }

    if(mutationError){
        alert(console.log(mutationError));
    }
    if(mutationResult && mutationResult.updatePost){
        props.callbackData (true);
    }

    if(sabdhanModal===true){
        alert("You have to put at least one comment");
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
                                     onClick={updatePostApi}
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

                    {comments && comments.comments && < AutoCompleteComponent
                        data={comments.comments}
                        selectFromSearch={handleSearchInput}
                    />}


                    {updateTagPosts && updateTagPosts.length > 0 && updateTagPosts !==undefined && updateTagPosts.map(post => {
                        return (

                            <Tag closable onClose={() => onClose(post)} key={post.id} style={{fontWeight:700, color:"black"}} >
                                {post.data.body}
                            </Tag>

                        )
                    })}
                    <br/>
                </Card>

                {mutationResult && mutationResult.updatePost && <SuccessModal data={"Successfully Post Edited"}/>}

            </div>

        );
    }

