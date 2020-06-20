import React, { Component } from "react";

import axios from 'axios'
import SelectFriends from './SelectFriends'



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Friends: []
        }
    }

    componentDidMount() {
        
        axios.get("http://localhost:3000/users/friends").then(({ data }) => {
            this.setState({
                Friends: data.data
            })
        }).catch(function (error) {
            console.log("Error****:", error);
        });


    }
    onCancel = (e) => {
        //this.props.form.resetFields();
        this.props.handleNewConversationPopUp(e)
    }

    render() {
        const { showModalCreate } = this.props
        const { Friends } = this.state
        console.log("Friends", Friends)
        if (Friends !== undefined && Friends.length > 0) {
            return (

                <SelectFriends showModalCreate={showModalCreate} Friends={Friends} onCancel={this.onCancel} />

            )
        } else {
            return (
                <div>loading</div>
            )
        }


    }
}
export default index