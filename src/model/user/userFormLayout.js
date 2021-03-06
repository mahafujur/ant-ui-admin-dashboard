import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Tag, Typography} from 'antd';
import {BlockOutlined} from '@ant-design/icons';
import "../../styles/form.css";
import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import SuccessModal from "../../commonComponents/successModal";
import AutoCompleteComponent from "../../commonComponents/autocomplete";
import {Menu} from "antd/lib/menu";

const EDIT_USER_API = gql`
   mutation ($_id: String!, $payload:user_input_payload!) {
   updateUser(_id: $_id, payload: $payload){
        id
        data {
            name
            address
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


export default  function  UserFormLayout(props) {
    const [profileState, setProfileState] = useState(props);
    const [state,setState]=useState(false);
    const [updateTagPosts, setUpdateTagPosts]= useState([]);

    const {  data:post } = useQuery(POSTS_API,{});


    useEffect(() => {
        setProfileState(props)
        setName(props.user.data.name)
        setAddress(props.user.data.address)
        setId(props.user.id)
        setUpdateTagPosts([]);

    },[props]);


    const userInfo= profileState.user;
    const userName= profileState.user.data.name;
    const userAddress= profileState.user.data.address;
    const userId= profileState.user.id;

    const [name,setName]=useState(userName);
    const [address,setAddress]=useState(userAddress);
    const [idIs,setId]=useState(userId);

    const [updateUser, {data: mutationResult, loading: mutationLoading, error: mutationError}]  = useMutation(EDIT_USER_API);


    function handleNameChange(e) {

        setName(e.target.value);
    }
    function handleAddressChange(e) {
        setAddress(e.target.value);
    }

    function removeDuplicateDataFromArray(data) {
        return [... new Set(data)];
    }
    function handleSearchInput(post) {
        let oldPosts= [];
        oldPosts=updateTagPosts;
        oldPosts.push(post);
        let newArray= removeDuplicateDataFromArray(oldPosts);
        setUpdateTagPosts(newArray);
        // console.log(newArray);
    }

    function onClose(post){
        let old=[];
        old= updateTagPosts;
         let filtered = old.filter( value=> value.id != post.id);
        setUpdateTagPosts(filtered);
    }



    if(mutationResult && mutationResult.updateUser){
          props.callbackData (true);
    }



    if(userInfo===undefined) {
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
                    title="Edit a User"
                    bordered="false"
                    headStyle={{fontSize:24, color:"#686f74"}}
                    extra={ <Button  shape="round" icon={<BlockOutlined />} size={"large"}
                                     onClick={e => {
                                         e.preventDefault();
                                         setState(true)
                                         updateUser({ variables:
                                                 {
                                                     _id: idIs,
                                                     payload:{"name": name,"address": address }
                                                 }
                                         });
                                     } }
                    >
                        Update</Button>}
                >

                <Typography className="form-filed-title"> Name  </Typography>
                    <br/>
                <Input placeholder="Your name"
                       onChange={handleNameChange}
                       value={name}

                />

                    <br/> <br/>

                <Typography className="form-filed-title"> Address </Typography>
                    <br/>
                <Input placeholder="Your address"
                       value={address}
                       onChange={handleAddressChange}
                />

                    <br/><br/>

                <Typography className="form-filed-title"> Posts </Typography>
                    <Typography className="form-filed-subtitle">Search posts and tags </Typography>

                    {post && post.posts && < AutoCompleteComponent
                        data={post.posts}
                        selectFromSearch={handleSearchInput}
                    />}

                    {updateTagPosts && updateTagPosts.length > 0 && updateTagPosts.map(post => {
                        return (
                            <Tag closable onClose={() => onClose(post)} key={post.id} style={{ fontWeight:700, color:"black"}}>
                                 {post.data.title}
                             </Tag>
                        )
                    })}
                    <br/>

                </Card>

                {mutationResult && mutationResult.updateUser && <SuccessModal data={"Successfully User Edited"}/>}

            </div>

        );
    }

