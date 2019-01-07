import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import {
  Collapse,
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
      <UncontrolledDropdown nav inNavbar>
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
      </UncontrolledDropdown>
    </Nav>
  </Navbar>
  )
}
  
// class NavPanel extends Component{
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   render(){
//     <div>

//     <Navbar color="light" light expand="md">
//     <NavbarToggler onClick={this.toggle} />
//     <NavbarBrand href="/">MERN-Docs-Service</NavbarBrand>
//       <Nav className="ml-auto" navbar>
//         <NavItem>
//           <NavLink to="{Link}" href="/">Components</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink to="{Link}" href="/about">About</NavLink>
//         </NavItem>
//         <UncontrolledDropdown nav inNavbar>
//           <DropdownToggle nav caret>
//             User
//           </DropdownToggle>
//           <DropdownMenu right>
//             <DropdownItem>
//               My Profile
//             </DropdownItem>
//             <DropdownItem divider />
//             <DropdownItem>
//               Logout
//             </DropdownItem>
//           </DropdownMenu>
//         </UncontrolledDropdown>
//       </Nav>
//     </Navbar>
//     </div>

//   }

// }

export default NavPanel;
