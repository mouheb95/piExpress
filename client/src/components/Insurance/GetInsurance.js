import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class GetInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          insurance: []
        };
      }
    
      componentDidMount() {
        axios.get('/insurance/inscar/'+this.props.match.params.id)
          .then(res => {
            this.setState({ insurance: res.data });
            console.log(this.state.insurance.data);
          });
      }
    
    
      render() {
        return (
          <div >
            <div >
              <div >
                <h3 >
                  My Insurance
                </h3>
              </div>

              <table>
                  <thead >
                    <tr>
                      <th >Buying Price:</th>
                      <th >Real Price:</th>
                      <th >Age:</th>
                      <th >Categorie:</th>
                      <th >Proposed to pay:</th>

                    </tr>
                  </thead>
                  <tbody>

                    {this.state.insurance.map(data =>
                      <tr key={data._id}>
                        <td >{data.buyingprice}</td>
                        <td >{data.realprice}</td>
                        <td >{data.age}</td>
                        <td >{data.categorie}</td>
                        <td >{data.proposedtopay}</td> 
                      </tr>)
                    }
                  </tbody>
                </table>
            </div>
          </div>
        );
      }
    }
