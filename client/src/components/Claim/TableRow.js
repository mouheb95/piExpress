import React, { Component } from 'react';

export default class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.object}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td>
            {this.props.obj.etat}
          </td>
          <td>
            <button className="btn btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

