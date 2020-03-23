
import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from './dashboard/Dashboard';
import withAuth from './tools/withAuth';

class App extends Component {
  render() {
    return (
      <div>
 {/*       <ul>
          <li><Link to="/dashboard"></Link></li>
           <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/home">Home</Link></li>
        </ul>
 */}
    <BrowserRouter>
        <Switch>
        <Route path="/dashboard" component={DashBoard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import DashBoard from './dashboard/Dashboard';
// function App() {
//   return (<Router>
//     <div className="App">
//       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        
//       </nav>

//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           <Switch>
            
//             <Route path="/register" component={DashBoard} />
//           </Switch>
//         </div>
//       </div>
//     </div>
//     </Router>
//   );
// }

// export default App;






