import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

import ChatPanel from './chat/ChatPanel.jsx';
import FilePanel from './file/FilePanel.jsx';

import LoginForm from './LoginForm.jsx';
import NavPanel from './NavPanel.jsx';
import SidebarPanel from './SidebarPanel.jsx';

import { VERIFY } from '../../common/Events.js';


class MainPanel extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:8080",
            socket : null,
            user : null,
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

    setUser = (user)=>{
		// const { socket } = this.state
        // socket.emit(USER_CONNECTED, user);
        console.log("set user");
        console.log(user);
        this.setState({'user' : user});
        
        const { socket } = this.state;

        socket.emit(VERIFY, user);

	}

    render(){
        const { socket } = this.state;
        const { user } = this.state;

        return (
            // <Router>
            <div>
                {
                !user ?
                <div><LoginForm socket={socket} setUser={this.setUser} ></LoginForm></div>
                :
                <div>
                    <h2>  { user } </h2>

                    <NavPanel />
                    
                    <hr />

                    <div style={{ display: "flex" }}>

                        <SidebarPanel />

                        <Router>
                            <div style={{ flex: 1, padding: "10px" }}>
                            <h2>{ this.state.endpoint }</h2>
                            <Route path="/home" render={(props) => <ChatPanel {...props} socket={socket} user={ user } /> }/>
                            {/* <Route exact path="/home" component={ChatPanel} socket={socket} /> */}
                            <Route exact path="/file"  render={(props) => <FilePanel {...props} socket={socket} user={ user } /> }/>
                            </div>
                        </Router>

                    </div>
                
                </div>
                }
            </div>

        );
    }
}


export default MainPanel;
