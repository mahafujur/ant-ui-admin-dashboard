import React from "react";
import {Button, Modal} from 'antd';
import {PlusCircleTwoTone} from '@ant-design/icons';
import AddUserForm from "../model/user/createUser";
import CreatePostForm from "../model/post/createPost";
import CreateCommentForm from "../model/comments/createCommetForm";

class PopUpButton extends React.Component {
    state = {
        modal2Visible: false,
    };


    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    render() {
        return (
            <div>
                <Button type="primary" icon={<PlusCircleTwoTone/>} onClick={() => this.setModal2Visible(true)}>
                    {this.props.data}
                </Button>

                <Modal
                    title={this.props.data}
                    centered
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    {this.props.data==="Add User"  &&  <AddUserForm/> }

                    {this.props.data==="Create Post" &&  <CreatePostForm/>}

                    {this.props.data==="Create Comment" &&  <CreateCommentForm/>}


                </Modal>
            </div>
        )
    }
}
export default PopUpButton;
