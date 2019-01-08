import React, { Component, PropTypes } from 'react';
import {  Input, Container, Row, Col, Card, CardTitle, CardBody, CardText, CardFooter,  Button, Text, Alert } from 'reactstrap';
import ChatContainer from './ChatContainer.jsx'
import Messageinput from '../messages/Messageinput.jsx'
import { SEND_MESSAGE, VERIFY , CHATLOG } from '../../../common/Events.js'

const EMPTY = null;

class ChatPanel extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            chatlog : []
        }; 
        
        // this.createChat = this.createChat.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        const { socket } = this.props;
        const { user } = this.props;
        // socket.emit("RESET", this.resetChat);
        socket.emit(VERIFY, user);
        socket.on(CHATLOG, (data)=>{
            console.log(data);
            this.updateChatlog(data);
        });
        // console.log(socket);
    }

    resetChat = (chat)=>{
		return this.addChat(chat, true)
    }
    
    updateChatlog(chat){
        console.log("in update func");
        const newchat = this.state.chatlog;
        newchat.push(chat);
        console.log(newchat);
        this.setState({chatlog : newchat});
    }

    addChat = (chat, reset)=>{
		const { socket } = this.props
		const { chats } = this.state

		const newChats = reset ? [chat] : [...chats, chat]
		// this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

		// const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		// const typingEvent = `${TYPING}-${chat.id}`

		// socket.on(typingEvent, this.updateTypingInChat(chat.id))
		// socket.on(messageEvent, this.addMessageToChat(chat.id))
    }
    
    sendMessage(message){

        const { socket } = this.props;   
        const { user }  = this.props;    
        socket.emit(SEND_MESSAGE, user, message);
       
    }
  


    render() {
        const { user }  = this.props;   
        return (
            <div>
                <Container>

                    <Row>
                        <Col>Message View</Col>
                    </Row>
                    <div>
                        {/* { JSON.stringify(this.state.chatlog) } */}
                        { (this.state.chatlog.length != 0) && ( this.state.chatlog.map((chat, i) => {
                                
                                return (<ChatContainer from={chat.from}
                                                    to={chat.to}
                                                    message={chat.message} time={chat.time} username={ user } />);

                            }) )}
                    </div>
                    
                </Container>
                <div>
                    <Messageinput sendMessage={(message)=>{this.sendMessage(message)} }/>
                        
                </div> 
            </div>
        );
    }
}

// ChatPanel.propTypes={
//     Socket: PropTypes.object.isRequired,
// };

export default ChatPanel;

