import React, { Component, PropTypes } from 'react';
import {  Input, Container, Row, Col, Card, CardTitle, CardBody, CardText, CardFooter,  Button, Text, Alert } from 'reactstrap';
import socketIOClient from 'socket.io-client'
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
const EMPTY = null;

class ChatPanel extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            response: false,
            endpoint: "http://localhost:8080",
            socket : EMPTY,
            socket_id : EMPTY,
            once : true,
            chats : [],
            name : EMPTY,
            to : EMPTY,
            chatlog : []
        }; 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        
        this.testSendEvent = this.testSendEvent.bind(this);
        this.testJoinEvent = this.testJoinEvent.bind(this);
        this.testCreateRoomEvent = this.testCreateRoomEvent.bind(this);
        // this.createChat = this.createChat.bind(this);
    }

    componentDidMount() {
        
    }

    testSendEvent(e){
        e.preventDefault();
       
        const { name } = this.state;
        const { to } = this.state;
        const { socket } = this.props;
        const timestamp = new Date(); 
        if( name && to  ){

            let form =  {
                name : name , 
                from : name ,
                to : to,
                message : makeid(),
                time : getTime(timestamp),
                timestamp : timestamp
            }

            socket.emit("send:message", form);
            socket.on('chatlog', (data)=>{
                // chatlog
                console.log(data);
                this.setState({chatlog : (data)});
                // this.createChat(data);
            });

        }
    }

    testJoinEvent(){
        
        console.log(this.props);
        const { socket } = this.props;
        const { name } = this.state;
        socket.emit("verify", name);

    }

    testCreateRoomEvent(){
        
        console.log(this.props);
        const { socket } = this.props;
        const { name } = this.state;
        socket.emit("createRoom", name);
        
    }

    onChangeUsername(value){
        this.setState({
            name: value
       });
    }
    
    onChangeTo(value){
        this.setState({
            to: value
       });
    }

    render() {
        return (
          <Container>
            <Row>
                <Col xs="4">
                    <Card>
                        <CardBody>
                            <CardTitle>Global Chat</CardTitle> 
                        </CardBody>
                        <CardFooter>
                            <Input placeholder="Username" className="form-control" onChange={ this.onChangeUsername } />
                            <Input placeholder="Message" className="form-control" onChange={ this.onChangeMessage }/>
                            <Button onClick={ this.sendMessage } color="primary" className="form-control"  >Send</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                <Input placeholder="Username" className="form-control" onChange={ e=> this.onChangeUsername(e.target.value) } />
                <Button onClick= { this.testJoinEvent }>test Join Event</Button>
                </Col>
            </Row>
            <Row>
                <Input placeholder="To" className="form-control" onChange={ e=> this.onChangeTo(e.target.value) } />
                <Button onClick= { this.testCreateRoomEvent }>test Create ChatRoom Event</Button>
            </Row>
            <Row>
                <Input placeholder="To" className="form-control" onChange={ e=> this.onChangeTo(e.target.value) } />
                <Button onClick= { this.testSendEvent }>test Send Event</Button>
            </Row> 
            <Row>
                <Col>Message View</Col>
            </Row>
            <div>
                 { (this.state.chatlog.length != 0) && ( this.state.chatlog.map((chat, i) => {
                        
                        return (<ChatContainer from={chat.from}
                                            to={chat.to}
                                              message={chat.message} time={chat.time} username={this.state.name} />);

                    }) )}
            </div>
            <Row>
                <Col>Data Log</Col>
                <Col>
                    <h2> { (this.state.chatlog.length != 0) && JSON.stringify(this.state.chatlog) }</h2>
                </Col>
            </Row>
            
        </Container>
          );
    }
}

// ChatPanel.propTypes={
//     Socket: PropTypes.object.isRequired,
// };

export default ChatPanel;

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

const getTime = (date)=>{
	return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`
}

class ChatContainer extends React.Component {
    
    render() {
            let background = "primary";
            let pos = "right";
            let test = "outline";
            if((this.props.to === this.props.username) ) {
                background = "light";
                pos = "left";
                test = "inverse";
            }
            return(
                <div>
                    <div align={ pos } >
                        
                        <Card body  color={ background } className={ "d-inline-flex " + test } >
                            { ( pos === "left" ) && <div><strong>{this.props.from}</strong></div>}
                            <CardText>{this.props.message}</CardText>
                        </Card>
                        <strong> { this.props.time } </strong>
                    </div>
                    
                </div>

            )
        } 
}