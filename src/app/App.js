import React, { Component } from 'react';
import './App.css';
import Navigation from '../navigation/Navigation';
import Login from '../login/Login';
import Home from '../home/Home';
import Transactions from '../transactions/Transactions';
import Beneficiaries from '../beneficiaries/Beneficiaries';
import User from '../user/User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      component: null
    };
    this.components = {
      login: <Login app={this} />,
      home: <Home app={this} />,
      transactions: <Transactions app={this} />,
      beneficiaries: <Beneficiaries app={this} />,
      user: <User app={this} />
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ authenticated: true, component: this.components.home });
    } else {
      this.setState({ component: this.components.login });
    }
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this.setState({ authenticated: false, component: this.components.login });
  }

  render() {
    return (
      <div className="App">
        <Navigation app={this} />
        <div className="App-header">
          <h2>
            <span className="mon">Mon</span>
            <span className="pay">Pay</span>
          </h2>
          <h4>The easy way to transfer money</h4>
        </div>
        {this.state.component}
      </div>
    );
  }
}

export default App;
