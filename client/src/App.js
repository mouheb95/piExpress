
import React, { Component } from 'react';
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';


import Login from "./components/Login";
import Register from "./components/Register";
import AddInsurance from "./components/Insurance/AddInsurance";
import GetInsurance from "./components/Insurance/GetInsurance";
import EditInsurance from "./components/Insurance/EditInsurance";
import AddApp from "./components/Insurance/AddApp";
import GetApp from "./components/Insurance/GetApp";
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
import Test from "./components/Test";
import Child from './components/Child';
import Claimm from './components/Claimm';
import one from "./components/one";
import Onne from "./components/Onne";
import Posts from "./components/Posts";


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
            <Route path="/claim" component={Claim} />
            <Route path='/all' component={AllClaim} />
            <Route path='/addins' component={AddInsurance} />
            <Route path='/getins/:id' component={GetInsurance} />
            <Route path='/editins/:id' component={EditInsurance} />
            <Route path='/addapp' component={AddApp} />
            <Route path='/getapp/:idap' component={GetApp} />


            <Route path="/all" component={AllClaim} />
            <Route path="/test" component={Test} />
            <Route   path="/onne/:id" component={Onne} />
            <Route path="/liste" component={Child} />
            <Route exact path="/posts" component={Posts} />

            
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/services' component={Services} />
            
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/blog' component={Blog} />
            <Route Path='/contact' component={Contact} />
            <Route   path="/one/:id" component={one} />
           
          
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;