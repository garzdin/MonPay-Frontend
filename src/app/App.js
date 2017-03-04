import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import Login from '../login/Login';
import Home from '../home/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ authenticated: true });
    }
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.setState({ authenticated: false });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <span className="mon">Mon</span>
            <span className="pay">Pay</span>
          </h2>
          <h4>The easy way to transfer money</h4>
          {this.state.authenticated &&
            <Button
              className="App-button-logout"
              bsStyle="danger"
              onClick={this.handleLogout}
            >
              Logout
            </Button>}
        </div>
        {this.state.authenticated ? <Home app={this} /> : <Login app={this} />}
      </div>
    );
  }
}

export default App;
