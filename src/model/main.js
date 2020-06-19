import React from 'react';
import {Layout, Menu} from 'antd';
import "./styles/main.css";
import UserBody from "./components/userBody";
import CommentsBody from "./components/CommentsBody";
import PostBody from "./components/PostBody";

const { Sider } = Layout;


class Main extends React.Component {

    constructor(props){
        super(props);

        this.state={
            usersTabOpen:true,
            postsTabOpen:false,
            commentsTabOpen:false,
        }
        this.onClickSiderItem=this.onClickSiderItem.bind(this);
    }

    onClickSiderItem (value){

        if(value===1){
            this.setState({
                usersTabOpen:true,
                postsTabOpen:false,
                commentsTabOpen:false,
            })
        }
        if(value===2){
            this.setState({
                usersTabOpen:false,
                postsTabOpen:true,
                commentsTabOpen:false,
            })
        }
        if(value===3){
            this.setState({
                usersTabOpen:false,
                postsTabOpen:false,
                commentsTabOpen:true,
            })
        }
    }

    render() {
        return (

                <Layout  >
                    <Sider theme="light"
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                           className="main-sider"
                    >
                        <div className="sider-header " >
                                <div className="sider-title">
                                     Shikho Dashboard
                                </div>
                        </div>
                        <br/>
                        <Menu  mode="inline" defaultSelectedKeys={['1']} className="main-sider-menu" style={{height:"91vh"}}>

                            <Menu.Item key={'1'} onClick={()=>this.onClickSiderItem(1)}>
                               Users
                            </Menu.Item>

                            <Menu.Item key={'2'} onClick={()=>this.onClickSiderItem(2)} >
                               Posts
                            </Menu.Item>

                            <Menu.Item key={'3'} onClick={()=>this.onClickSiderItem(3)}>
                               Comments
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout>
                            <div className="site-layout-background" style={{minHeight: 360 }}>

                                { this.state.usersTabOpen===true &&  <UserBody/> }

                                { this.state.postsTabOpen===true  &&  <PostBody/> }

                                { this.state.commentsTabOpen===true  &&  <CommentsBody/> }

                            </div>
                    </Layout>
                </Layout>
        )
    }
}
export default Main;
