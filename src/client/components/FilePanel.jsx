import React from "react";
import axios from "axios";                                                
import {Treebeard} from 'react-treebeard';
  
class FilePanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : '',
            loading : 'initial'
        };
        this.onToggle = this.onToggle.bind(this);
    }

    loadData(){
        return axios.get('/file/test')
        .then((res)=>{
            console.log(res);
            return res.data;
        })  
    }
   
    componentDidMount() {

        console.log('This happens 3rd.');
    
        this.setState({ loading: 'true' });
        this.loadData()
        .then((data) => {
          console.log('This happens 7th.');
          this.setState({
            data: data,
            loading: 'false'
          });
        });
      }  
  
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
            <Treebeard
                data={this.state.data}
                onToggle={this.onToggle}
            />
        );
    }
}

export default FilePanel;