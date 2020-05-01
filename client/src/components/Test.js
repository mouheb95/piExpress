import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TableRow from './TableRow';

export  default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            claim:Array().fill(null)
        };
       
    }
    componentDidMount(){
      axios.get('/claim/get/')
        .then(res => {
          this.setState({ claim: res.data });
          console.log(this.state.claim.data);
        })
        
       
       
    }
    
   

    render() {
       
        return (
          <div>
            <h3 align="center">Business List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Business</th>
                  <th>GST Number</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
              ({ this.state.claim }) => (
              {this.state.claim.map(data =>
                      <tr key={data._id}>
                        <td >{data.buyingprice}</td>
                        
                      </tr>)
                    })
              </tbody>
            </table>
          </div>
        );
      }
    }