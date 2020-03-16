import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './tools/withAuth';
import Home from './Home';
import Guest from './Guest';
import Register from './Register';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">no auth needed</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/home">Home</Link></li>
        </ul>

        <Switch>
          <Route exact path="/" component={Guest} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={withAuth(Home)} />
        </Switch>
      </div>
    );
  }
}

export default App;