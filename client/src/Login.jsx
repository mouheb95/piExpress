import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        password: '',
        confirmPassword: '',
      };
    }  
    
    
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }  
    
    onSubmit = (event) => {
      event.preventDefault();
      fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async res => {
        if (res.status === 200) {
            this.props.history.push('/home');
          
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch( err => {
        console.error(err);
        
        alert('email or password is incorrect');
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
         <input type="submit" value="Submit"/>
        </form>
      );
    }
  }

export default Login;