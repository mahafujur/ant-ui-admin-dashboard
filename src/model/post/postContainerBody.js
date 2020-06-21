import React, {useEffect, useState} from 'react';
import {Affix, Col, Layout, Menu, Row} from 'antd';
import "../../styles/menu.css";
import {PicRightOutlined} from '@ant-design/icons';
import PopUpButton from "../../commonComponents/popupButton";
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PostFormLayout from "./postFormLayout";


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

const {Sider} = Layout;


function PostContainerBody(){
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState();
    const [commentsOfPosts, setCommentsOfPosts]= useState([]);
    const [id,setId]=useState(null);
    const { loading,error,refetch, data } = useQuery(POSTS_API,{});

    function callbackMethod (value){
        if(value===true) {
            refetch()
        }
    }


    useEffect(() => {
    },[post]);

    function menuClick(post){

        setPost(post)
        let old=[];
        if(post.comment !==null) {
            old.push(post.comment);
            setCommentsOfPosts(old)
        }
        else {
            setCommentsOfPosts(old)
        }
        setId(post.id)
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
                                {data &&  data.posts.map(post => {
                                    return (
                                        <Menu.Item
                                            key={post.id}
                                            icon={<PicRightOutlined/>}
                                            onClick={()=>menuClick(post) }
                                        >

                                            {post.data.title}
                                        </Menu.Item>
                                    )
                                })
                                }
                            </Menu>
                        </div>

                    </Col>

                    <Col xs={24} sm={0} md={0} lg={19} xl={19} style={{height: "90vh"}}>
                        {post &&  <PostFormLayout
                            post={post}
                            comment={commentsOfPosts}
                            callbackData ={callbackMethod}
                        /> }
                        <Affix style={{ position: 'absolute', bottom: 10, left: "2%" }}>
                            <PopUpButton data={"Create Post"}/>
                        </Affix>
                    </Col>

                </Row>
            </Layout>

        );
}

export default PostContainerBody;
