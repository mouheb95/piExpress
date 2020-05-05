
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
import AddCarpooling from './components/Carpooling Crud/addCarpooling'
import CarpoolingList from './components/Carpooling Crud/carpoolingList'
import EditCarpooling from './components/Carpooling Crud/editCarrpooling'
import AddComment from './components/Carpooling Crud/addComment'
import ListComments from './components/Carpooling Crud/ListComments'



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
             
            <Route exact path='/' component={Home} />
            <Route path='/addCarpooling' component={AddCarpooling} />
            <Route path='/carpoolingList' component={CarpoolingList} />
            <Route path='/editCarpooling/:id' component={EditCarpooling} />
            <Route path='/addComment/:id' component={AddComment} />
            <Route path='/listComments/:id' component={ListComments} />

            <Route path='/about' component={About} />
            <Route path='/services' component={Services} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/blog' component={Blog} />
           
          </switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;





