import React, { Component } from 'react';
import {  Card, CardTitle, CardBody, CardText, CardFooter } from 'reactstrap';

export default class ChatContainer extends Component {
    
    render() {
            console.log("In ChatContainer");
            console.log(this.props);
            let background = "primary";
            let pos = "right";
            let test = "outline";
            if((this.props.to === this.props.username) ) {
                background = "light";
                pos = "left";
                test = "inverse";
            } 
            if ( (this.props.to == null)  || (this.props.to === "Others") ){
                background = "success";
                pos = "left";
                test = "inverse";
            }
            if ( (this.props.from === this.props.username) ){
                background = "primary";
                pos = "right";
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