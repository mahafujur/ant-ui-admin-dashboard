import React, {useState} from 'react';
import {Affix, Col, Layout, Menu, Row} from 'antd';
import "../../styles/menu.css";
import {PicRightOutlined} from '@ant-design/icons';
import FormLayout from "../../commonComponents/formLayout";
import PopUpButton from "../../commonComponents/popupButton";
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';


const USER_API = gql`
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

const {Sider} = Layout;


function UserContainerBody(){
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [fetchApi,setFetchApi]= useState(false);
    const { loading,error,refetch, data } = useQuery(USER_API,{});


    function callbackMethod (value){
        console.log(value);
        if(value===true) {
            refetch()
        }
    }

    function menuClick(user){
        setUser(user)
    }

    if (loading) return <p>Loading ...</p>;
    if(error) return <p>error!</p>;

    return (
            <Layout>
                <Row  >
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} style={{height: "93vh"}}>
                        <div className="menu-style">
                            <Menu
                                defaultSelectedKeys={['1']}
                                mode="inline"
                                style={{height: "90vh"}}
                            >
                                {data &&  data.users.map(user => {
                                    return (
                                        <Menu.Item key={user.id} icon={<PicRightOutlined/>} onClick={()=>menuClick(user)}>
                                            {user.data.name}
                                        </Menu.Item>
                                    )
                                })
                                }
                            </Menu>
                        </div>

                    </Col>

                    <Col xs={24} sm={0} md={0} lg={19} xl={19} style={{height: "90vh"}}>
                        {user &&  <FormLayout
                            data={user}
                            callbackData ={callbackMethod}
                        /> }
                        <Affix style={{ position: 'absolute', bottom: 10, left: "1%" }}>
                            <PopUpButton data={"Add User"}/>
                        </Affix>
                    </Col>

                </Row>
            </Layout>

        );
}

export default UserContainerBody;
