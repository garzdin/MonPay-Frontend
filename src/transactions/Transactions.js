import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Networking from '../utils/Networking';
import './Transactions.css';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    Networking.request("transaction/", 'GET', {}, true)
    .then(response => {
      this.setState({ transactions: response.transactions });
    });
  }

  render() {
    return (
      <Table responsive className="Transactions-table-accounts">
        <thead>
          <tr>
            <th>#</th>
            <th>Created On</th>
            <th>Updated On</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
            {this.state.transactions.map(function(transaction, index) {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.created_on}</td>
                  <td>{transaction.updated_on}</td>
                  <td>{transaction.version}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default Transactions;
