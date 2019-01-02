import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class LoginPanel extends Component {
  constructor() {
    super(...arguments);
    
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
      userId : this.state.requestID,
      passwd : this.state.requestPW
    } ;

    console.log(params);
    axios.post('/login', params)
      .then(res => {
        
        console.log(res);
        console.log(this.props.onSuccess);
        this.props.onSuccess(this.state.requestID);
        
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
          <Input type="text" name="id" placeholder="userID" onChange= { this.requestIDChange }/>
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input type="password" name="password"  placeholder="password" onChange={ this.requestPWChange } />
        </FormGroup>
       
        <Button onClick={ this.onSubmit.bind(this) } >Submit</Button>
      </Form>
    );
  }


}

LoginPanel.propTypes={
    onSuccess: PropTypes.function,
};

export default LoginPanel;