import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        password: '',
        confirmPassword: '',
      };
    }  
    
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }
    
    callApi = async () => {
      const response = await fetch('/');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      
      return body;
    };
    
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }  
    
    onSubmit = (event) => {
      event.preventDefault();
      const response = fetch('/users/register', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async res => {
        if (res.status === 200) {
            this.props.history.push('/login');
          
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch( err => {
        console.error(err);
        
        alert('Error logging in please try again');
      });
    }
    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Login Below!</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter password again"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            required
          />
         <input type="submit" value="Submit"/>
        </form>
      );
    }
  }

export default App;