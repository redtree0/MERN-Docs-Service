import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class UserDropbox extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown  direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
            선택
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>모두에게</DropdownItem>
          <DropdownItem>귓속말</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}