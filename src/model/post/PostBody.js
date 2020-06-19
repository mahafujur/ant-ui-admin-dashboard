import React from 'react';
import {Layout, Menu, Typography} from 'antd';
import "../../styles/containerBody.css";
import BlankPage from "../../commonComponents/blankPage";
import PostContainerBody from "./postContainerBody";


const { Content} = Layout;



class PostBody extends React.Component {
    constructor(props){
        super(props);

        this.state={
            firstPage:true,
            secondPage:false,

        }

    }
    onMenuItemOfHeaderClick(value){

        if(value===1){
            this.setState({
                firstPage:true,
                secondPage:false,

            })
        }
        if(value===2){
            this.setState({
                firstPage:false,
                secondPage:true,

            })
        }
    }
    render() {
        return (
            <Layout>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="container-body-header">

                    <Menu.Item key="1"  onClick={()=> this.onMenuItemOfHeaderClick(1)}>
                        <Typography className="container-body-sub-menu" style={{fontSize:16, color:"white"}}>
                            PAGE 1
                        </Typography>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={()=> this.onMenuItemOfHeaderClick(2)}>
                        <Typography className="container-body-sub-menu" style={{fontSize:16, color:"white"}} > PAGE 2 </Typography >
                    </Menu.Item>
                </Menu>
                <Content className="site-layout" >
                    <div className="site-layout-background" style={{  minHeight: 380 }}>

                        {this.state.firstPage===true &&  <PostContainerBody/> }
                        {this.state.secondPage===true &&  <BlankPage/> }

                    </div>
                </Content>
            </Layout>

        );
    }
}
export default PostBody;
