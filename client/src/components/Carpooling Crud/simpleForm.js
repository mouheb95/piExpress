import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import Review from './review';

export class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: true

    }
  }
  componentDidMount() {
    this.state.user_email = localStorage.getItem("user").split("\"")[7];
    console.log(this.state.user_email)
    }
    toggleFloating = ({ opened }) => {
      this.setState({ opened }); 
    }
  render() {
    const { opened } = this.state;

 
    this.state.user_email = localStorage.getItem("user").split("\"")[7];
    console.log(this.state.user_email)
    return (
      <div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ChatBot
      headerTitle="Speech Synthesis"
      speechSynthesis={{ enable: true, lang: 'en' }}
      floating={true}
        opened={opened}
        toggleFloating={this.toggleFloating}
        steps={[
          {
            id: '0',
            message: 'hi,'+this.state.user_email+', if you want to search for carpooling, i can help you ',
            trigger: 'Q',
          },
          {
            id: 'Q',
            options: [
              { value: 'Yes', label: 'Yes', trigger: '1' },
              { value: 'No', label: 'No', trigger: 'end-message2' },
            ],
          },
          {
            id: '1',
            message: ' where r u now ?',
            trigger: 'from',
          },
          {
            id: 'from',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'where u wanna go ?',
            trigger: 'to',
          },
          {
            id: 'to',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: 'Offer or Demand ?',
            trigger: 'offre_demand_Carpooling',
          },
          {
            id: 'offre_demand_Carpooling',
            options: [
              { value: 'Offer', label: 'Offer', trigger: '7' },
              { value: 'Demand', label: 'Demand', trigger: '7' },
            ],
          },
          {
            id: '7',
            message: 'People or Parcel ?',
            trigger: 'people_parcel_Carpooling',
          },
          {
            id: 'people_parcel_Carpooling',
            options: [
              { value: 'People', label: 'People', trigger: '9' },
              { value: 'Parcel', label: 'Parcel', trigger: '9' },
            ],
          },

          {
            id: '9',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'from', label: 'from', trigger: 'update-from' },
              { value: 'to', label: 'to', trigger: 'update-to' },
              { value: 'offre_demand_Carpooling', label: 'offre_demand_Carpooling', trigger: 'update-offre_demand_Carpooling' },
              { value: 'people_parcel_Carpooling', label: 'people_parcel_Carpooling', trigger: 'update-people_parcel_Carpooling' },

            ],
          },
          {
            id: 'update-from',
            update: 'from',
            trigger: '9',
          },
          {
            id: 'update-to',
            update: 'to',
            trigger: '9',
          },
          {
            id: 'update-offre_demand_Carpooling',
            update: 'offre_demand_Carpooling',
            trigger: '9',
          },
          {
            id: 'update-people_parcel_Carpooling',
            update: 'people_parcel_Carpooling',
            trigger: '9',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
          {
            id: 'end-message2',
            message: 'Thanks! ',
            end: true,
          },
          
        ]}
        
      />
      </div>
    );
  }
}

export default SimpleForm;