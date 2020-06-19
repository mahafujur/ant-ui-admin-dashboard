import React from 'react';
import {Layout, Menu, Typography} from 'antd';
import "../styles/containerBody.css";


const { Content} = Layout;



class CommentsBody extends React.Component {

    render() {
        return (
            <Layout>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="container-body-header">
                    <Menu.Item key="1" >
                        <Typography className="container-body-sub-menu" style={{fontSize:16, color:"white"}}>
                            Page 1
                        </Typography >
                    </Menu.Item>
                    <Menu.Item key="2" >
                        <Typography className="container-body-sub-menu" style={{fontSize:16, color:"white"}} >Page 2 </Typography >
                    </Menu.Item>
                </Menu>

                <Content className="site-layout" >
                    <div className="site-layout-background" style={{  minHeight: 380 }}>
                        Content
                    </div>
                </Content>
            </Layout>

        );
    }
}
export default CommentsBody;
