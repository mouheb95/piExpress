
import React, { Component } from 'react';
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';


import Login from "./components/Login";
import Register from "./components/Register";
import AddInsurance from "./components/Insurance/AddInsurance";
import GetInsurance from "./components/Insurance/GetInsurance";
import DashBoard from './dashboard/Dashboard';
import Home from './template/home';
import withAuth from './tools/withAuth';
import Navbar from './components/Navbar';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import { Claim } from './components/Claim';
import AllClaim from './components/AllClaim';



class App extends Component {
  render() {
    return (
      <div>
       

        <Router>
        <Navbar />
        <div>
        
          <Switch>
            <Route path="/dashboard" component={DashBoard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
<<<<<<< HEAD
            <Route exact path="/addins" component={AddInsurance} />
            <Route exact path="/getins/:id" component={GetInsurance} />

=======
            <Route path="/claim" component={Claim} />
            <Route path='/all' component={AllClaim} />
             
>>>>>>> 49c6ade9169a80b7dd4e8f93431ff1437b77b960
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/services' component={Services} />
            
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/blog' component={Blog} />
            <Route Path='/contact' component={Contact} />
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;





