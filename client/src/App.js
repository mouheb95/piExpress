
import React, { Component } from 'react';
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';


import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from './dashboard/Dashboard';
import withAuth from './tools/withAuth';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import { Claim } from './components/Claim';
import AllClaim from './components/AllClaim';
import Test from "./components/Test";
import Child from './components/Child';
import Claimm from './components/Claimm';
import one from "./components/one";
import Onne from './components/onne';



class App extends Component {
  render() {
    return (
      <div>
       

        <Router>
        <Navbar />
        <div>
        
          <switch>
            <Route path="/dashboard" component={DashBoard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/claim" component={Claim} />
            <Route path="/all" component={AllClaim} />
            <Route path="/test" component={Test} />
            
            <Route path="/liste" component={Child} />

            
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/services' component={Services} />
            
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/blog' component={Blog} />
            <Route Path='/contact' component={Contact} />
            <Route   path="/one/:id" component={one} />
            <Route   path="/onne/:id" component={Onne} />
          </switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;





