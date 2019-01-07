import React, { Component, PropTypes } from 'react';
import {  Input, Container, Row, Col, Card, CardTitle, CardBody, CardFooter,  Button, Text } from 'reactstrap';
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
        }; 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        
        this.testSendEvent = this.testSendEvent.bind(this);
        this.testJoinEvent = this.testJoinEvent.bind(this);
        this.testCreateRoomEvent = this.testCreateRoomEvent.bind(this);
    }

    componentDidMount() {
        // const { socket } = this.props;
       
        // if(this.state.socket != EMPTY){
        //     this.state.socket.on('chatlog', (data)=>{
        //         // chatlog
        //         this.setState({chatlog : data});
        //     });
        // }
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // // const { endpoint } = this.state;
        // // const socket = socketIOClient(endpoint);
        // if(this.state.socket === EMPTY) {
        //     socket.on('connect', (data)=>{
            
        //         this.setState({socket : socket});
        //         console.log("Connected");
                
        //     });
        // }
        
        // if(this.state.socket) {
        //     this.state.socket.on('chatlog', (data)=>{
        //         // chatlog
        //         console.log(data);
        //         this.setState({chatlog : JSON.stringify(data)});
        //     });
        // }
        

    }

    testSendEvent(e){
        e.preventDefault();
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // if(this.state.name === EMPTY && this.state.to === EMPTY){
        //    return ; 
        // }
        // if(this.state.socket === EMPTY ){
        //     return ;
        // }
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
                this.setState({chatlog : JSON.stringify(data)});
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
                <Col>
                    <h2> { this.state.chatlog }</h2>
                    {/* <Text>{ this.state.chatlog }</Text> */}
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