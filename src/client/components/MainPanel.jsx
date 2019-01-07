import React, { Component } from 'react';

// class MainPanel extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             response: false,
//             endpoint: "http://localhost:8080"
//         };
//     }
//     componentDidMount() {
//     //     initSocket();
//     // }

//     // initSocket = ()=>{
//         const { endpoint } = this.state;
//         const socket = socketIOClient(endpoint);
    
//         socket.on('connect', (data)=>{
//             console.log("Connected");
//             this.setState({ response: data })
//             socket.emit("SEND_MESSAGE", "dat");
//         })
        
//     }

      
//     render() {
//         return (
//             <div>

//             <Alert>test </Alert>
//             {/* <NavPanel></NavPanel> */}
//             <FileTreePanel></FileTreePanel>
//             <FileUploadPanel></FileUploadPanel>
//             <FileEditorPanel></FileEditorPanel>
//             </div>
            
//           );
//     }
// }
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ChatPanel from './ChatPanel.jsx';
import FileUploadPanel from './FileUploadPanel.jsx';
import FileTreePanel from './FileTreePanel.jsx';
import NavPanel from './NavPanel.jsx';
import SidebarPanel from './SidebarPanel.jsx';
import FileEditorPanel from './FileEditorPanel.jsx';
import socketIOClient from "socket.io-client";


class MainPanel extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://localhost:8080",
            socket : null,
            socket_id : null,
            once : true,
            chatlog : []
        };
        
       
        
    }
    componentDidMount() {

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        socket.on('connect', (data)=>{

            console.log("Connected");
            this.setState({socket : socket});

        });
        
    }


    render(){
        const { socket } = this.state;
        return (
            // <Router>
            <div>
                
                <NavPanel />
                
                <hr />

                <div style={{ display: "flex" }}>

                    <SidebarPanel />

                    <Router>
                        <div style={{ flex: 1, padding: "10px" }}>
                        <h2>{ this.state.chatlog }</h2>
                        <h2>{ this.state.socket_id }</h2>
                        <h2>{ this.state.response }</h2>
                        <h2>{ this.state.endpoint }</h2>
                        <Route exact path="/home" render={(props) => <ChatPanel {...props} socket={socket} /> }/>
                        {/* <Route exact path="/home" component={ChatPanel} socket={socket} /> */}
                        <Route path="/about" component={About} />
                        </div>
                    </Router>

                </div>
            
            </div>
        );
    }
}


// function Home(props) {
//         console.log(props);
//         const { socket } = this.props;
//         return (
//             <div>
//               <h2>Home</h2>
//               <ChatPanel socket={socket}></ChatPanel>
//             </div>
//           );
    
//   }
  
  function About() {
    return (
      <div>
        <h2>About</h2>
        <FileTreePanel></FileTreePanel>
        <FileEditorPanel></FileEditorPanel>
      </div>
    );
  }

export default MainPanel;

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }