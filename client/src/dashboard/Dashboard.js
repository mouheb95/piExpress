import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'
import UserContent from './Content/users/ContentUsers';
import CarpoolingContent from './Content/carpooling/ContentCarpooling'


export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: localStorage.getItem("role") === "\"admin\"",
            redirect: false,
        };
        if (this.state.isAdmin === false) {
            this.state.redirect = true
        }
    }
    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div>
                    <Header />
                    <Menu />
                    <BrowserRouter>
                    <Switch>
                    <Route exact path="/users" component={UserContent} />
                    <Route exact path="/carpooling" component={CarpoolingContent} />
                   
                    </Switch>
                    </BrowserRouter>
                    <Footer />
                </div>
            )
        }
    }
}
