import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
			requestID:'',
      requestPW:'',
      redirect : false
    };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.requestIDChange = this.requestIDChange.bind(this);
		this.requestPWChange = this.requestPWChange.bind(this);
    this.setUser = this.setUser.bind(this);

  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
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

  setUser(user) {
    this.props.setUser(user);
  }

  onSubmit(e){
    e.preventDefault();

    var params = {
      userId : this.state.requestID,
      passwd : this.state.requestPW
    } ;

    console.log(params);
    axios.post('/authenticate', params)
    // axios.post('/login', params)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        }
        // console.log(res);
        // if(res.data.msg === "SUCCESS") {
        //   this.setUser(this.state.requestID);
        // } else {
        //   this.setUser(null);
        // }
        
      })
      .catch( err => {
        console.log(err);
      });
  }

  SignUp(e){
      e.preventDefault();
      var params = {
        userId : this.state.requestID,
        passwd : this.state.requestPW
      } ;

      console.log(params);
      axios.post('/addUser', params)
        .then(res => {
          if(res.data.msg === "SUCCESS") {

          } else {

          }
          // console.log(res);
          this.setRedirect();

        })
        .catch( err => {
          console.log(err);
        });
  }
  render() {
    return (
      <Form onSubmit ={ this.onSubmit.bind(this) }>
       {this.renderRedirect()}
        <FormGroup>
          <Label for="loginId">ID</Label>
          <Input type="text" name="userId" placeholder="userId" onChange= { this.requestIDChange }/>
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input type="password" name="password"  placeholder="password" onChange={ this.requestPWChange } />
        </FormGroup>
       
        <Button type="submit" >Login</Button>
        <Button onClick={ this.SignUp.bind(this) } >Sgin up</Button>
      </Form>
    );
  }


}

LoginForm.propTypes={
    // onSuccess: PropTypes.function,
};

export default LoginForm;