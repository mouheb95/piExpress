import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './User'
import '../../style.css'

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

  addClient = () => {
    localStorage.removeItem("consultedUser")
    window.location.href = "users/" + undefined;
  }

  showUser = (user) => {
    console.log('this is:', user);
    localStorage.setItem("consultedUser", JSON.stringify(user));
    window.location.href = "users/" + user._id;
  }

  render() {


    const objs = this.state.doc

    const Data = ({ objs }) => (
      <>

        {objs.map((user, index) => (

          <tr>
            <td key={user.email} >{user.email}</td>
            <td key={user.password} >{user.password}</td>
            <td key={user.firstName} >{user.firstName}</td>
            <td key={user.lastName} >{user.lastName}</td>
            <td key={user.role} >{user.role}</td>
            <td>
              <div className="btn-group">
                <a onClick={() => this.showUser(user)} className="btn btn-info dropdown-toggle" >edit</a>
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
                  <div className="box-header xx">
                    <h3 className="box-title">Clients Data Table</h3>
                    <div className="btn-group ">
                      <a onClick={() => this.addClient()} className="btn btn-success dropdown-toggle" >Create client</a>
                    </div>
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
