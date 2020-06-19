import React from "react";
import {Modal, Button, Result} from 'antd';

class SuccessModal extends React.Component {
    state = {
        visible: false,
    };

    componentDidMount(){
        if(this.props.data){
            this.setState({
                visible: true,
            });
            setTimeout(() => {
                this.setState({
                    visible: false,
                });
            }, 2000);
        }
    }

    handleOk = () => {

        this.setState({
            visible: false,
        });
    };

    render() {

        const {visible} = this.state;
        return (
            <div>

                <Modal
                    centered
                    visible={visible}
                    onOk={this.handleOk}
                >
                    <Result
                        status="success"
                        title={this.props.data}
                    />
                </Modal>
            </div>
        );
    }

}
export default SuccessModal;
