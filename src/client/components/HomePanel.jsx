import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import  LoginPanel   from './LoginPanel.jsx';
// import axios from 'axios';

class HomePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId : ''
        }
    }
    
	componentWillMount(){
		this.setState({
			userId: ''
		});
		//adminId: cookie.load('adminId'),
	}

	onLogin(userId){
        console.log(userId);
		this.setState({
			userId:userId
		});
		//cookie.save('adminId',adminId, { path: '/'});
	}

	onLogout(){
		this.setState({
			userId:''
		});
		//cookie.remove('adminId', { path: '/'});
	}

	render(){
        if (!this.state.userId) {
            return <LoginPanel onSuccess={ this.onLogin.bind(this) }/>
        }
        return (
            <Alert color="primary">
            test
            </Alert>
        )
	}
}
module.exports = HomePanel;