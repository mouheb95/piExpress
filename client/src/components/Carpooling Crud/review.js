import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { Link } from 'react-router-dom';


export class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      offre_demand_Carpooling: '',
      people_parcel_Carpooling:''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { from, to, offre_demand_Carpooling , people_parcel_Carpooling} = steps;

    this.setState({ from, to, offre_demand_Carpooling , people_parcel_Carpooling });

    console.log(steps)

    
    
  }

  render() {

    const {from, to, offre_demand_Carpooling , people_parcel_Carpooling } = this.state;
    console.log(this.state)

     console.log(this.props.steps)
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>From :</td>
              <td>{from.value}</td>
            </tr>
            <tr>
              <td>To :</td>
              <td>{to.value}</td>
            </tr>
            <tr>
              <td>Offer or Demand ?</td>
              <td>{offre_demand_Carpooling.value}</td>
            </tr>
            <tr>
              <td>People or Parcel ?</td>
              <td>{people_parcel_Carpooling.value}</td>
            </tr>
            <tr>
              <td>Action</td>
              <td><Link
  to={{
    pathname: "/results",
    data: this.props.steps // your data array of objects
  }}
>Go to Results</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default Review;