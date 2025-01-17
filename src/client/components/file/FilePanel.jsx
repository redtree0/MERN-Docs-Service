import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import FileEditorPanel from './FileEditorPanel.jsx';
import FileUploadPanel from './FileUploadPanel.jsx';
import FileTreePanel from './FileTreePanel.jsx';
import { Button, Row, Col } from 'reactstrap';
import { READFILE,  READBUFFER , WRITEFILE } from '../../../common/Events.js';

class FilePanel extends Component {

    constructor(props) {
        // console.log("Loaded FilePanel");
        super(props);

        this.state = {
            chatlog : [],
            context : "",
            path : "",
            tree : null,
        }; 
        this.readFile = this.readFile.bind(this);
        this.writeFile = this.writeFile.bind(this);
        this.onChangeContext = this.onChangeContext.bind(this);
        this.loadDirectoryTree = this.loadDirectoryTree.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        const { socket } = this.props;
        const { user } = this.props;
        // socket.emit("RESET", this.resetChat);
    }

    readFile(filepath){
        // console.log("Called ReadFile");
        const { socket } = this.props;

        const file = filepath;
        this.setState({ 'path' : filepath });
        
        socket.emit(READFILE, file);
        socket.on(READBUFFER, (payload)=>{
            this.readBuffer(payload.buffer);
        });
    }

    readBuffer(buffer){
        let uInt8Array = new Uint8Array(buffer);

        let blob = new Blob([uInt8Array], {type: "text/plain"});
        const reader = new FileReader();

        reader.addEventListener('loadend', (e) => {
            let context = e.srcElement.result;
            this.updateEditorContext(context);
        });

        reader.readAsText(blob);
    }

    updateEditorContext(context){
        this.setState({ context : context });
    }

    writeFile(){
        // console.log("Called WriteFile");

        const { socket } = this.props;
        const { context } = this.state;
        const { path } = this.state;
        
        let blob = new Blob([context], {type: "text/plain"});
        
        let arrayBuffer;
        let fileReader = new FileReader();
        fileReader.onload = function(event) {
            arrayBuffer = event.target.result;
            console.log(arrayBuffer);
            let payload = { 'buffer' : arrayBuffer};
            socket.emit(WRITEFILE, path, payload);
        };
        fileReader.readAsArrayBuffer(blob);
       
    }

    onChangeContext(newContext){
        console.log("onChangeContext");
        console.log(newContext);
        this.setState({context : newContext});

    }

    loadDirectoryTree(){
        console.log("loadDirectoryTree");
        return axios.get('/file/test')
                .then((res)=>{
                    console.log(res.data);
                    this.setState({ tree : res.data})
                    // return res.data;
                })  
    }

    render(){
        const { socket } = this.props;
        const { context } = this.state;
        const { tree } = this.state; 

        return (
            <div>
                <div>
                    <Button color="primary" onClick = { this.writeFile } > Save </Button>
                </div>
                <Row>
                    <Col xs="3"><FileTreePanel tree = { tree } onLoaded = {  this.loadDirectoryTree } onClickNode = { this.readFile } ></FileTreePanel></Col>
                    <Col xs="9"><FileEditorPanel socket = { socket } context = { context } onChangeContext = { this.onChangeContext }></FileEditorPanel></Col>
                </Row>
                <div>
                    <FileUploadPanel onUploaded = { this.loadDirectoryTree }  ></FileUploadPanel>
                </div>
            </div>
        )
    }
}

FilePanel.PropTypes = {
    socket : PropTypes.object,
    uesr : PropTypes.string,
}

export default FilePanel;