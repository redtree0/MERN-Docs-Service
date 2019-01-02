import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Alert } from 'reactstrap';
// import ChatPanel from './ChatPanel.jsx';
import FileUploadPanel from './FileUploadPanel.jsx';
import FileTreePanel from './FileTreePanel.jsx';
import NavPanel from './NavPanel.jsx';
import FileEditorPanel from './FileEditorPanel.jsx';
// import NoMatch from './NoMatch.jsx';

class MainPanel extends Component {
    constructor(props) {
        super(...arguments);
    }

    initSocket = ()=>{
        const socket = io(socketUrl)
    
        socket.on('connect', ()=>{
          console.log("Connected");
        })
        
        this.setState({socket})
    }
      
    render() {
        return (
            <div>

            <Alert>test </Alert>
            {/* <NavPanel></NavPanel> */}
            <FileTreePanel></FileTreePanel>
            <FileUploadPanel></FileUploadPanel>
            <FileEditorPanel></FileEditorPanel>
            </div>
            
          );
    }
}

export default MainPanel;