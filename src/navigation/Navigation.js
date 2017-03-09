import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <NavItem
            eventKey={1}
            onClick={(e) => this.props.app.setState({ component: this.props.app.components.home })}
          >
            Home
          </NavItem>
          <NavItem
            eventKey={2}
            onClick={(e) => this.props.app.setState({ component: this.props.app.components.transactions })}
          >
            Transactions
          </NavItem>
          <NavItem
            eventKey={3}
            onClick={(e) => this.props.app.setState({ component: this.props.app.components.beneficiaries })}
          >
            Beneficiaires
          </NavItem>
          <NavDropdown eventKey={4} title="Account" id="basic-nav-dropdown">
            <MenuItem
              eventKey={4.1}
              onClick={(e) => this.props.app.setState({ component: this.props.app.components.user })}
            >
              My Account
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey={4.2}
              onClick={(e) => this.props.app.handleLogout()}
            >
              Logout
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
