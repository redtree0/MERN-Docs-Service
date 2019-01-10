import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";                                                
import {Treebeard} from 'react-treebeard';
  
class FilePanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // data : '',
        };
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {

        const { onLoaded } = this.props;
        onLoaded();
        // .then((data) => {
        //     this.setState({
        //         data: data,
        //         loading: 'false'
        //     });
        // });
      }  
  
    onToggle(node, toggled){
        const { onClickNode } = this.props;
        console.log(node);
        if(node.type === "file") {
            onClickNode(node.path);
        }

        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        // const { tree } = this.props;
        return (
            <div>
                {
                    !this.props.tree
                    ?
                    <div></div>
                    :
                    <Treebeard
                        data={ this.props.tree }
                        onToggle={this.onToggle}
                    />
                }
            </div>

        );
    }
}

FilePanel.PropTypes = {
    tree : PropTypes.object,
    onClickNode : PropTypes.func,
}

export default FilePanel;