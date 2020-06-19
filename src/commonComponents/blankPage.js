import React from 'react';
import { Result, Button } from 'antd';
import "../styles/containerBody.css";


class BlankPage extends React.Component {

    render() {
        return (
            <Result
                title="Sorry,nothing to show."
                style={{ height:"90vh"}}
            />

        );
    }
}
export default BlankPage;
