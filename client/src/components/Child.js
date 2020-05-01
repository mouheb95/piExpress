import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: Array().fill(null),
      table_header: Array().fill(null),
      claim:null
      
 
    }
    
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

      console.log(this.callApi());
    const script = document.createElement("script");
    script.src = `js/content.js`;
    script.async = true;
    document.body.appendChild(script);
  }

  callApi = async () => {
    const response = await fetch('/claim/get/');
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
    console.log('this is:', this.state.claim);

  }  

  render() {

    
    const objs = this.state.doc

    console.log(this.objs);
    const Data = ({ objs }) => (
      <>

        {objs.map(promise => (

          <tr>
            <td key={promise._id} >{promise._id}</td>
            <td value={this.state.claim = promise.description} >{this.deleteRow.bind(this, promise)}</td>
            <td>
              <div className="btn-group">
                <button 
                type="button" value={this.state.claim = promise.description} onClick={this.deleteRow.bind(this, promise)}  className="btn btn-danger dropdown-toggle">Action</button>
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
