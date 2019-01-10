import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default function SidebarPanel() {
    return(
        <div>

            <div
            style={{
                padding: "10px",
                // width: "20%",
                height: "100%",
                background: "#f0f0f0"
            }}
            
            >
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="{Link}" href="/home">Components</NavLink>
                </NavItem>
                <NavItem>
                    {/* <NavLink to="/file">About</NavLink> */}
                    <NavLink to="{Link}" href="/file">About</NavLink>
                </NavItem>
            </Nav>
            
            </div>
          
      </div>
    )
   
}
