import React, { Component } from 'react';
import {  Input, Container, Row, Col, Card, CardTitle, CardBody, CardFooter,  Button } from 'reactstrap';
import io from 'socket.io-client'

class ChatPanel extends Component {
    constructor(props) {
        super(props);


        this.state = {
          socket:null,
          user:null
        };
    
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
        </Container>
          );
    }
}

export default ChatPanel;