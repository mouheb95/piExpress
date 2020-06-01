import React, { Component } from "react";
import {Form } from 'antd'
//import { connect } from "react-redux";

//import { getFriends } from '../../../appRedux/actions/Auth';
import SelectFriends from './SelectFriends'



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //this.props.getFriends(JSON.parse(localStorage.getItem("userid")))

    }
    onCancel = (e) => {
        //this.props.form.resetFields();
        this.props.handleNewConversationPopUp(e)
      }

    render() {
        const { Friends, showModalCreate } = this.props
        console.log("Friends", Friends)
        if (Friends !== undefined && Friends.length > 0) {
            return (

                <SelectFriends showModalCreate={showModalCreate} Friends={Friends} onCancel={this.onCancel}/>

            )
        } else {
            return (
                <div>loading</div>
            )
        }


    }
}

/* const mapStateToProps = ({ auth }) => {
    const { Friends } = auth;
    return { Friends }
};
const FriendListForm = Form.create({ name: 'FriendList' })(index);
export default connect(mapStateToProps, { getFriends })(FriendListForm); */

export default index