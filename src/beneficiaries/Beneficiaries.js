import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Networking from '../utils/Networking';
import './Beneficiaries.css';

class Beneficiaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiaries: []
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    Networking.request("beneficiary/", 'GET', {}, true)
    .then(response => {
      this.setState({ beneficiaries: response.beneficiaries });
    });
  }

  render() {
    return (
      <Table responsive className="Beneficiaries-table-accounts">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Entity type</th>
            <th>Created On</th>
            <th>Updated On</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
            {this.state.beneficiaries.map(function(beneficiary, index) {
              return (
                <tr key={beneficiary.id}>
                  <td>{beneficiary.id}</td>
                  <td>{beneficiary.email}</td>
                  <td>{beneficiary.first_name}</td>
                  <td>{beneficiary.last_name}</td>
                  <td>{beneficiary.entity_type === 0 ? 'Private': 'Company'}</td>
                  <td>{beneficiary.created_on}</td>
                  <td>{beneficiary.updated_on}</td>
                  <td>{beneficiary.version}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    );
  }
}

export default Beneficiaries;
