import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './User'

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: Array().fill(null),
      table_header: Array().fill(null),
      user: null,
    }
    
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


    const script = document.createElement("script");
    script.src = `js/content.js`;
    script.async = true;
    document.body.appendChild(script);
  }

  callApi = async () => {
    const response = await fetch('/admin/users');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ doc: body.data })


    for (let index = 0; index < this.state.doc.length; index++) {
      this.setState({
        table_header: Object.keys(this.state.doc[index]).slice(1, 7),
      })
      break
    }
    this.setState({
      table_header: this.state.table_header.slice(0, this.state.table_header.length - 1)
    })
    this.state.table_header.push("Action");
    return body;

  }

  

  deleteRow() {
    console.log('this is:', this.state.user);

  }  

  render() {

    
    const objs = this.state.doc

    const Data = ({ objs }) => (
      <>

        {objs.map(station => (

          <tr>
            <td >{station.email}</td>
            <td >{station.firstName}</td>
            <td >{station.lastName}</td>
            <td >{station.password}</td>
            <td >{station.role}</td>
            <td>
              <div className="btn-group">
                <button 
                type="button" value={this.state.user = station._id} onClick={this.deleteRow.bind(this, station)}  className="btn btn-danger dropdown-toggle">Action</button>
              </div>
            </td>
          </tr>
        ))}
      </>
    );

    return (
      <div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Data Tables
            </h1>
            <ol className="breadcrumb">
              <li><a href="fake_link"><i className="fa fa-dashboard" /> Home</a></li>
              <li><a href="fake_link">Tables</a></li>
              <li className="active">Users table</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-xs-12">

                {/* /.box */}
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">Clients Data Table</h3>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          {this.state.table_header.map((value) => {
                            return (<th> {value} </th>)
                          })}
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Other browsers</td>
                          <td>All others</td>
                          <td>-</td>
                          <td>-</td>
                          <td>U</td>
                        </tr>
                        <Data objs={objs} />

                      </tbody>

                      <tfoot>
                        <tr>
                          {this.state.table_header.map((value) => {
                            return (<th> {value} </th>)
                          })}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </section>
          {/* /.content */}
        </div>

      </div>

    )
  }
}
