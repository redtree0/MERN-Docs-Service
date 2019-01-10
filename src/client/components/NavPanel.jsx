import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import {
  Container,
  ButtonDropdown,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import axios from 'axios';


function NavPanel(){
  return (
    <Navbar color="light" light expand="md">
  <NavbarBrand href="/">MERN-Docs-Service</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink to="{Link}" href="/">Components</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="{Link}" href="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <MyButtonDropdown />
      </NavItem>
      {/* <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          User
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            My Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown> */}
    </Nav>
  </Navbar>
  )
}
  
class MyButtonDropdown extends Component {
 
    constructor(props) {
      super(props);
      this.state = {
        dropdownOpen: false,
        value : "Selection"
      };

      this.toggle = this.toggle.bind(this);
      this.select = this.select.bind(this);
      this.logout = this.logout.bind(this);
    }
    
    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
      
    }
  
    select(event) {
      // const { value } = this.state;
      // console.log(value);
      if( event.target.innerText === "Logout" ){
        this.logout();
      }
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        value: event.target.innerText
      });
      
    }

    logout(){
      axios.post("/logout").then(res=>{
        window.location.replace('/');
      });
    }
    
    render() {
      return (
        <Container className="py-4">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle>{this.state.value}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>MyProfile</DropdownItem>
            <DropdownItem onClick={this.select}>Logout</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        </Container>
      );
    }
}

export default NavPanel;
