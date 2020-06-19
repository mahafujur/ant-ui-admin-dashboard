import React, {useState} from 'react';
import {Button, Card, Input, Typography} from 'antd';
import {BlockOutlined} from '@ant-design/icons';
import "../styles/form.css";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import SuccessModal from "./successModal";

const EDIT_USER_API = gql`
   mutation ($_id: String!, $payload:user_input_payload!,) {
   updateUser(_id: $_id, payload: $payload){
        id
        data {
            name
            address
        }
    }
}

`;

export default  function  UserFormLayout(props) {
    console.log(props);
    const userInfo= props.data;
    const userName= props.data.data.name;
    const userAddress= props.data.data.address;
    const userId= props.data.id;

    const [name,setName]=useState(userName);
    const [address,setAddress]=useState(userAddress);
    const [idIs,setId]=useState(userId);
    const [userEditedDataSubmit,setUserEditedDataSubmit]=useState(false);

    const [updateUser, {data: mutationResult, loading: mutationLoading, error: mutationError}]  = useMutation(EDIT_USER_API);

    function handleNameChange(e) {

        setName(e.target.value);
    }
    function handleAddressChange(e) {
        setAddress(e.target.value);
    }
    const handleInputValueChanges = event => {
        console.log(event);
        const { name, value } = event.target;
        setName({
            ...name,
            [name]: value,
        });
    };


    if(mutationResult && mutationResult.updateUser){
        props.callbackData (true)
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
                <Input placeholder="Your posts here"
                       value=""
                       // onChange={(event)=>this.handleInputValueChanges('', event.target.value)}
                />
                    <br/>
                </Card>

                {mutationResult && mutationResult.updateUser && <SuccessModal data={"Successfully User Edited"}/>}

            </div>

        );
    }

