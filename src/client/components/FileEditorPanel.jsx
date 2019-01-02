import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

function onChange(newValue) {
  console.log('change',newValue);
}

class FileEditorPanel extends React.Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(newValue) {
        console.log('change',newValue);
    }

    render() {
        return (
            <AceEditor
            mode="javascript"
            theme="monokai"
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={`function onLoad(editor) {
            console.log("i've loaded");
          }`}
            setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            }}/>
        )
    }

}

export default FileEditorPanel;