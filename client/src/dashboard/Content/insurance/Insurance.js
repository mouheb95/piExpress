import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'history';
// User from './User'
import '../../style.css'

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: Array().fill(null),
      table_header: Array().fill(null),
      insurance: null,
      price: null,
      idins: null
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
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};
  offer(id) { 
    const insurance = {
      insuranceprice: this.state.price
  };

  console.log(insurance)

    axios.put('/insurance/ins/'+id, insurance)
    .then(async res => {
      if (res.status === 200) {
          console.log('treated')
          this.forceUpdate();
        } else {
          console.log(' none ')
      }
  })
 }
  callApi = async () => {
    const response = await fetch('/insurance/totreat');
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
            <td key={station.buyingprice} >{station.buyingprice}</td>          
            <td key={station.realprice} >{station.realprice}</td>
            <td key={station.age} >{station.age}</td>
            <td key={station.categorie} >{station.categorie}</td>
            <td key={station.proposedtopay} >{station.proposedtopay}</td>
            <td><input type="number" step="0.01" name="price"  placeholder="Price" value={this.state.price} onChange={this.handleChange} /></td>
            <td>
              <div className="btn-group">
                {/* <button 
                type="button" value={this.state.user = station._id} onClick={this.deleteRow.bind(this, station)}  className="btn btn-danger dropdown-toggle">Action</button> */}
                <button onClick={() => this.offer(station._id)} className="btn btn-info dropdown-toggle" >Offer</button>
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
              Insurance Tables
            </h1>
            <ol className="breadcrumb">
              <li><a href="fake_link"><i className="fa fa-dashboard" /> Home</a></li>
              <li><a href="fake_link">Tables</a></li>
              <li className="active">Insurance table</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-xs-12">

                {/* /.box */}
                <div className="box">
                  <div className="box-header xx">
                    <h3 className="box-title">Insurances to treat</h3>
                    <div className="btn-group ">
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
