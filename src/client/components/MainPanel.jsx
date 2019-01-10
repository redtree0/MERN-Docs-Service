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
            endpoint: "http://merndocsexpress.run.goorm.io",   //         endpoint: "http://localhost:8080",
            socket : null,
            user : null,
        };
        this.setUser = this.setUser.bind(this);
    }

    componentDidMount() {

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        socket.on('connect', (data)=>{

            console.log("Connected");
            this.setState({socket : socket});

        });
        socket.emit("CHECK_SESSION", {}, (err, user)=>{
            if(!err && user){
                this.setUser(user);
            }
        })
        
    }

    setUser = (user)=>{
		// const { socket } = this.state
        // socket.emit(USER_CONNECTED, user);
        console.log("set user");
        console.log(user);
        
        const { socket } = this.state;

        socket.emit(VERIFY, user);
        this.setState({user : user});

	}

    render(){
        const { socket } = this.state;
        const { user } = this.state;
        
        return (
            // <Router>
            <div>
                <Router>
                {
                (!user) ?
                <div><LoginForm socket={socket} setUser={this.setUser} ></LoginForm></div>
                :
                <div>
                    <h2>  { user } </h2>

                    <NavPanel />
                    
                    <hr />

                    <div style={{ display: "flex" }}>

                        <SidebarPanel />

                        
                            <div style={{ flex: 1, padding: "10px" }}>
                            <h2>{ this.state.endpoint }</h2>
                            <Route exact path="/home" render={(props) => <ChatPanel {...props} socket={socket} user={ user } /> }/>
                            {/* <Route exact path="/home" component={ChatPanel} socket={socket} /> */}
                            <Route  path="/file" render={(props) => <FilePanel {...props} socket={socket} user={ user }  /> }/>
                            </div>
                        

                    </div>
                
                </div>
                }
                </Router>
            </div>

        );
    }
}


export default MainPanel;
