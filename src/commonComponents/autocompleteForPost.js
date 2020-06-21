import React from "react";
import {AutoComplete} from 'antd';

let options=[];

class AutoCompleteComponent extends  React.Component{

    constructor(props){
        super(props);

        this.state={
            postArray:[],
            posts:[]
        }

    }
    componentDidMount(){
        if(this.state.postArray.length<1){
            const propsData= this.props.data;

            this.setState({
                postArray:propsData,
                posts:propsData.map(obj => ({ value: obj.data.body}))

            })
            options.push(propsData.map(obj => ({ value: obj.data.body})));



        }
    }

    onSelect = data => {
        let getData= this.state.postArray.filter(obj=> obj.data.body.toUpperCase()===data.toUpperCase());
        this.props.selectFromSearch(getData[0]);
    };


    render() {

            return (
            <div>
                {this.state.posts && this.state.posts.length > 0 &&
                <AutoComplete
                    style={{
                        width: '100%',
                    }}
                    allowClear={true}
                    options={this.state.posts}
                    placeholder="Search posts"
                    onSelect={this.onSelect}
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
                }
                <br/> <br/>

            </div>


        )
    }
};

export default  AutoCompleteComponent;
