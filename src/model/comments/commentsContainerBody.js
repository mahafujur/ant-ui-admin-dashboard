import React, {useEffect, useState} from 'react';
import {Affix, Col, Layout, Menu, Row} from 'antd';
import "../../styles/menu.css";
import {PicRightOutlined} from '@ant-design/icons';
import PopUpButton from "../../commonComponents/popupButton";
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CommentFormLayout from "./commentFormLayout";


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
            }
        }
    }
    }
`;

const {Sider} = Layout;


function CommentsContainerBody(){
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();
    const [id,setId]=useState(null);
    const { loading,error,refetch, data } = useQuery(COMMENTS_API,{});

    function callbackMethod (value){
        if(value===true) {
            refetch()
        }
    }


    useEffect(() => {
    },[comment]);

    function menuClick(comment){
        setComment(comment)
        setId(comment.id)
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
                                {data &&  data.comments.map(comment => {
                                    return (
                                        <Menu.Item
                                            key={comment.id}
                                            icon={<PicRightOutlined/>}
                                            onClick={()=>menuClick(comment) }
                                        >
                                            {comment.data.body}
                                        </Menu.Item>
                                    )
                                })
                                }
                            </Menu>
                        </div>

                    </Col>

                    <Col xs={24} sm={0} md={0} lg={19} xl={19} style={{height: "90vh"}}>
                        {comment &&  <CommentFormLayout
                            comment={comment}
                            callbackData ={callbackMethod}
                        /> }
                        <Affix style={{ position: 'absolute', bottom: 10, left: "2%" }}>
                            <PopUpButton data={"Create Comment"}/>
                        </Affix>
                    </Col>

                </Row>
            </Layout>

        );
}

export default CommentsContainerBody;
