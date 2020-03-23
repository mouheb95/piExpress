import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null
    };
  }

  render() {
    return (
      <BootstrapTable data={ this.state.products }>
      <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
    </BootstrapTable>
    );
  }
}