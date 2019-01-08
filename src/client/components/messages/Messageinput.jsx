import React, { Component, PropTypes } from 'react';
import {  Input, Container, Row, Col, Card, CardTitle, CardBody, CardText, CardFooter,  Button, Text, Alert } from 'reactstrap';
import UserDropbox from './UserDropbox.jsx';

class MessageInput extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	message:"",
      };
      this.onChangeMessage = this.onChangeMessage.bind(this);

	}
    handleSubmit = (e)=>{
        e.preventDefault()
        this.sendMessage()
        this.setState({message:""})
    }

    sendMessage = ()=>{
        this.props.sendMessage(this.state.message)
    }

    onChangeMessage = (message)=>{
        this.setState({message : message});
    }

    render(){
        return (
            <div>
                <Container>
                    <form onSubmit={ this.handleSubmit }>
                        <Row>
                            <Col xs="2">
                                <UserDropbox />
                            </Col>
                            <Col  xs="7">
                                <Input placeholder="message" className="form-control" onChange={ e=> this.onChangeMessage(e.target.value) } />
                            </Col>
                            <Col>
                                <Button type="submit" >Send</Button>
                            </Col>
                        </Row>
                    </form>
                </Container>
               
            </div>
        )
    }

}

MessageInput.PropTypes = {

}

export default MessageInput;