import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Networking from '../utils/Networking';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    Networking.request("account/", 'GET', {}, true)
    .then(response => {
      this.setState({ accounts: response.accounts });
    });
  }

  render() {
    return (
      <Table responsive className="User-table-accounts">
        <thead>
          <tr>
            <th>#</th>
            <th>IBAN</th>
            <th>BIC / SWIFT</th>
            <th>Currency</th>
            <th>Country</th>
            <th>Created On</th>
            <th>Updated On</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
            {this.state.accounts.map(function(account, index) {
              return (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.iban}</td>
                  <td>{account.bic_swift}</td>
                  <td>{account.currency}</td>
                  <td>{account.country}</td>
                  <td>{account.created_on}</td>
                  <td>{account.updated_on}</td>
                  <td>{account.version}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default User;
