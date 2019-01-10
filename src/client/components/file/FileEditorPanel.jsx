import React, { Component } from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import ss from 'socket.io-stream';
import 'brace/mode/java';
import 'brace/theme/github';

function onChange(newValue) {
  console.log('change',newValue);
}

class FileEditorPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            value : ""
        }
        this.onChange = this.onChange.bind(this);
        // this.readFile = this.readFile.bind(this);
        // this.updateEditorValue = this.updateEditorValue.bind(this);
    }

    componentDidMount(){
        const { socket } = this.props;
        const { context } = this.props;
        // this.readFile();
    }

    // updateEditorValue(value){
    //     this.setState({ value : value });
    // }

    // readFile(path){
    //     // path;
    //     console.log("Called ReadFile");

    //     const { socket } = this.props;
    //     const file = "/Users/computer/dev/mern-docs-service/src/server/ChatLogs.js";
    //     socket.emit("READFILE", file);
    //     socket.on("READBUFFER", (file)=>{
    //         // console.log("READBUFFER");
    //         // console.log(JSON.stringify(file));
    //         // console.log((file).context);
    //         let context = file.context;
    //         this.updateEditorValue(context);
    //     });
    // }

    onChange(newValue) {
        const { onChangeContext } = this.props;
        onChangeContext(newValue);
        // console.log('change',newValue);
    }

    render() {
        const { context } = this.props;
        return (
            <AceEditor
            mode="javascript"
            // theme="monokai"
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={ context }
            setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            }}/>
        )
    }

}

export default FileEditorPanel;