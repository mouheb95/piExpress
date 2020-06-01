import React, { Component } from "react";
import { Drawer } from 'antd';
import UserList from './UserList';
import ChatBox from './ChatBox';
import { graphql } from 'react-apollo'

import gql from 'graphql-tag'
import AllConv from './AllConv'


const ALL_CONVERSATIONS = gql`
query conv($user_id: ID!) {
  allConversations(user_id: $user_id) {
    _id
    GroupName
    members {
      _id  
      FirstName
      LastName
    }
    ChatMessage {
      _id
      content
      owner
      createdAt
    }
  }
}
`


const SUBS_CONVERSATIONS = gql`
subscription {
    newMessage {
      _id
      owner
      content
        isDeleted
      createdAt
      conversation_id
      
    }
  }
  `

class Chat extends Component {
    constructor(props) {
        super(props);

        this.onSelectUser = this.onSelectUser.bind(this)
        this.selectConversation = this.selectConversation.bind(this)
    }

    state = {
        visible: false,
        selecteduser: JSON.parse(localStorage.getItem("userid")),
        selectedSectionId: JSON.parse(localStorage.getItem("userid")),
        Conversations: [],
        allConversations: '',
        conversation_id: "5ec7de96c38adf00205e2eac",
        owner: JSON.parse(localStorage.getItem("userid")),
        selectedConversation: [],
        currentUser: JSON.parse(localStorage.getItem("userid"))
    };

    componentDidMount() {
        this.props.allConversations.subscribeToMore({
            document: SUBS_CONVERSATIONS
            ,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                let newMessage = subscriptionData.data.newMessage;
                /*  prev.allConversations.forEach(element => {
                     if (element._id =  "5ec7a6b2b28c07001f6fa9d8") {
                         element.ChatMessage.push(newMessage)
                     } 
                 }); */
                prev.allConversations[0].ChatMessage.push(newMessage)
                this.setState({
                    allConversations: prev.allConversations
                })
                return prev;
            }
        });
    }


    onSelectUser = async (user) => {
        user._id = JSON.parse(localStorage.getItem("userid"));
        await this.setState({ selecteduser: user });
        console.log("selectedUser", this.state.selectedUser)
        let userid = JSON.parse(localStorage.getItem("userid"));
        let data = {
            chat: [userid, user._id]
        };


    }

    selectConversation = (conversation_id, owner) => {
        this.setState({
            conversation_id: conversation_id,
            owner: owner
        })
    }

    setConversations = (allConversations) => {
        this.setState({
            allConversations: allConversations
        })

    }
    setCurrentUser = currentUser => {
        this.setState({
            currentUser: currentUser
        })
    }

    render() {

        const { friends, selecteduser, selectedSectionId, allConversations, conversation_id, owner, currentUser } = this.state;


        return (
            <div style={{ marginBottom: '-25%' }}>

                <AllConv setConversations={this.setConversations} allConversations={allConversations}
                    setCurrentUser={this.setCurrentUser} />
                <div >
                    <div>
                        <div >
                            <UserList authUser={currentUser}
                                conversations={allConversations} selectedSectionId={selectedSectionId}
                                onSelectUser={this.onSelectUser}

                            />
                        </div>
                        <div >
                            {selecteduser !== null ?

                                <ChatBox chat={allConversations} conversation_id={conversation_id}
                                    owner={owner}
                                    selectedSectionId={selectedSectionId}
                                    selectedUser={selecteduser} showDrawer={this.showDrawer}
                                />


                                :
                                null
                            }



                        </div>
                    </div>
                </div>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute', left: 0 }}
                >
                    <UserList authUser={currentUser} friends={friends} selectedSectionId={selectedSectionId} onSelectUser={this.onSelectUser} />
                </Drawer>


            </div>
        )
    }


}


export default graphql(ALL_CONVERSATIONS, {
    name: 'allConversations',

    options: (props) => ({ variables: { user_id: JSON.parse(localStorage.getItem("userid")) } }
    )
})(Chat)
