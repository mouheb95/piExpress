import React, { Component } from 'react'

export default class ContentCarpooling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: Array().fill(null),
      table_header: Array().fill(null),
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
    const response = await fetch('/admin/carpooling');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ doc: body.data })

console.log(this.state.doc)
    for (let index = 0; index < this.state.doc.length; index++) {
      this.setState({
        table_header: Object.keys(this.state.doc[index]),
      })
      break
    }
    this.setState({
      table_header: this.state.table_header.slice(1,this.state.table_header.length-2)
    })
    console.log(this.state.table_header)

    return body;
  }


  render() {

    const objs = this.state.doc

    const Data = ({ objs }) => (
      <>

        {objs.map(station => (

          <tr>
            <td >{station.date}</td>
            <td >{station.trage.passage}</td>
            <td key={station.parcel.type}>{station.parcel.type}</td>
            <td >{station.comments.description}</td>
            <td >{station.user.username}</td>
            <td key={station.createdAt}>{station.createdAt}</td>
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
