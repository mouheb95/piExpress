import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class One extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          claim: {}
        };
      }
    
      componentDidMount() {
        axios.get('/claim/get/'+this.props.match.params.id)
          .then(res => {
            this.setState({ claim: res.data });
            console.log(this.state.claim.data);
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
              <div >
                <dl>
                  <dt>Buying Price:</dt>
                 
                  <dt>Real Price:</dt>
                  <dd>{this.state.claim.object}</dd>
                  
                </dl>
              </div>
            </div>
          </div>
        );
      }
    }
