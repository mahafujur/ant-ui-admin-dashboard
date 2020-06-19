import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";

const GET_ALL_USER_API = gql`
  query getAllUser {
    users {
        id
        data {
            name
            address
        }
    }
}

`;


const EDIT_USER_API = gql`
   mutation ($id: String!, $payload:user_input_payload!,) {
   editUser(id: $id, payload: $payload){
        id
        data {
            name
            address
        }
    }
}

`;


function EditUserForm(props) {

    console.log('check mutation props',props);
    const [editUser]  = useMutation(EDIT_USER_API);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
            <div>
                {/*<Loader/>*/}
            </div>
    );
}
export default EditUserForm;
