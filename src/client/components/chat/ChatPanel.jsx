import React, { Component, PropTypes } from 'react';
import {  Input, Container, Row, Col, Card, CardTitle, CardBody, CardText, CardFooter,  Button, Text, Alert } from 'reactstrap';
import ChatContainer from './ChatContainer.jsx'
import Messageinput from '../messages/Messageinput.jsx'
import { SEND_MESSAGE, VERIFY , CHATLOG, LOAD_MESSAGE } from '../../../common/Events.js'

const EMPTY = null;

class ChatPanel extends Component {

    constructor(args) {
        super(...args);
        // console.log(props);
        this.state = {
            chatlog : []
        }; 
        
        // this.createChat = this.createChat.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        // console.log(this.props);
        const { socket } = this.props;
        // const { user } = this.props;
        // socket.emit("RESET", this.resetChat);
        // socket.emit(VERIFY, user);
        socket.emit(LOAD_MESSAGE, {},(data)=>{
            console.log(LOAD_MESSAGE);
            console.log(data.chatlogs);
            let chatlogs = data.chatlogs;
            this.initMessage(chatlogs);
        });

        socket.on(CHATLOG, (data)=>{
            console.log(data);
            this.updateChatlog(data);
        });
        // console.log(socket);
    }

    // resetChat = (chat)=>{
	// 	return this.addChat(chat, true)
    // }
    
    updateChatlog(chat){
        console.log("in update func");
        const newchat = this.state.chatlog;
        newchat.push(chat);
        console.log(newchat);
        this.setState({chatlog : newchat});
    }

    initMessage(chatlogs){
        console.log("in initMessage func");
        console.log(chatlogs);

        this.setState({ chatlog : chatlogs});
    }
    
    sendMessage(options, message){
        const { socket } = this.props;   
        // const { user }  = this.props;    
        let user = !options.to ? this.props.user : options.to;
        socket.emit(options.msgEvent, user, message, (selfmsg)=>{
            let chatlog=this.state.chatlog;
            chatlog.push(selfmsg);
            this.setState({ 'chatlog' : chatlog});
        });
       
    }
  


    render() {
        const { user }  = this.props;   
        // console.log(user);
        return (
            <div>
                <Container>

                    <Row>
                        <Col>Message View</Col>
                    </Row>
                    <div>
                        {/* { JSON.stringify(this.state.chatlog) } */}
                        { (this.state.chatlog.length != 0) &&( this.state.chatlog.map((chat, i) => {
                                
                                return (<ChatContainer from={chat.from}
                                                    to={chat.to}
                                                    message={chat.message} time={chat.time} username={ user } />);

                            }) )}
                    </div>
                    
                </Container>
                <div>
                    <Messageinput sendMessage={(options, message)=>{this.sendMessage(options, message)} }/>
                        
                </div> 
            </div>
        );
    }
}

// ChatPanel.propTypes={
//     Socket: PropTypes.object.isRequired,
// };

export default ChatPanel;

