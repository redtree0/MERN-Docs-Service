import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  Input, Container, Row, Col, Button } from 'reactstrap';
import UserDropbox from './UserDropbox.jsx';
import { BROADCAST, WHISPER } from '../../../common/Events.js';

class MessageInput extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
          message:"",
          to:""
      };
      this.onChangeMessage = this.onChangeMessage.bind(this);

	}
    handleSubmit = (e)=>{
        e.preventDefault()
        this.sendMessage()
        this.setState({message:""})
    }

    sendMessage = ()=>{
        let msgOptions = {
           msgEvent : this.state.to == "" ? BROADCAST : WHISPER,
           to : this.state.to
        }
        console.log(msgOptions);
        this.props.sendMessage(msgOptions,this.state.message)
    }

    onChangeMessage = (message)=>{
        this.setState({message : message});
    }

    onChangeTo = (to)=>{
        this.setState({to : to});
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
                            <Col xs="2">
                                <Input placeholder="To:" className="form-control" onChange={ e=> this.onChangeTo(e.target.value) } />
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
    sendMessage : PropTypes.func,
}

export default MessageInput;