import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';


export default class Claimm extends Component {
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
       

    
            return (
                <div>
                   
                    <BrowserRouter>
                    <Switch>
                   
                   
                    </Switch>
                    </BrowserRouter>
                
                </div>
            )
        }
    }

