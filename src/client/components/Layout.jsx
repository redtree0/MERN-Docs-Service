import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import HomePanel from './HomePanel.jsx';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    
    this.state ={
			requestID:'',
			requestPW:''
    };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.requestIDChange = this.requestIDChange.bind(this);
		this.requestPWChange = this.requestPWChange.bind(this);
   

  }


	onLogout(){
		this.setState({
			requestID:'',
			requestPW:''
		});
  }

  requestIDChange(event){
		this.setState({requestID: event.target.value});
	}
	requestPWChange(event){
		this.setState({requestPW: event.target.value});
  }

  onSubmit(){
    var params = {
      id : this.state.requestID,
      passwd : this.state.requestPW
    } ;

    console.log(params);
    axios.post('/login', params)
      .then(res => {
        if( res.status === 200 ){
          console.log(res);
        }
        
      })
      .catch( err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="loginId">ID</Label>
          <Input type="text" name="id" placeholder="email" onChange= { this.requestIDChange }/>
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input type="password" name="password"  placeholder="password" onChange={ this.requestPWChange } />
        </FormGroup>
       
        <Button onClick={ this.onSubmit } >Submit</Button>
      </Form>
    );
  }
}