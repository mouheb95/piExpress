import React, { Component } from 'react'
import Notification from "../components/Notification/index";

export default class home extends Component {
    render() {
        return (
            <div style={{marginTop: "200px"}}>
                <h2>Comming soon </h2>
                hello regular user
                <Notification />
            </div>
        )
    }
}
