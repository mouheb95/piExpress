import React, { Component } from "react";
import { Drawer } from 'antd';
import UserList from './UserList';
import ChatBox from './ChatBox';
import { graphql } from 'react-apollo'
import FriendList from './FriendListModal'
import gql from 'graphql-tag'
import AllConv from './Allconv'

import './styles/wieldy.less'
import './style.css'
const ALL_CONVERSATIONS = gql`
query conv($user_id: ID!) {
  allConversations(user_id: $user_id) {
    _id
    GroupName
    Creator
    members {
      _id  
      FirstName
      LastName
      ProfilePicture
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
const SUBS_MESSAGES = gql`
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
const SUBS_CONVERSATIONS = gql`
subscription {
    newConversation{
      _id
      GroupName
      Creator
      ChatMessage{
        _id
        owner
        content
      }
      members{
        _id
        FirstName
        LastName
        ProfilePicture
      }
    }
  }
`
class Chat extends Component {
    constructor(props) {
        super(props);

        this.onSelectUser = this.onSelectUser.bind(this)
        this.handleNewConversationPopUp = this.handleNewConversationPopUp.bind(this)
    }

    state = {
        visible: false,
        selectedUser: null,
        selectedSectionId: JSON.parse(localStorage.getItem("userid")),
        conversation: null,
        allConversations: '',
        conversation_id: null,
        owner: JSON.parse(localStorage.getItem("userid")),
        selectedConversation: [],
        currentUser: null,
        index: -1,
        addNewConversation: true,
        showModalCreate: true
    };

    componentDidMount() {

        this.props.allConversations.subscribeToMore({
            document: SUBS_MESSAGES
            ,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                let index = -1
                for (let i = 0; i < prev.allConversations.length; i++) {
                    if (prev.allConversations[i]._id === subscriptionData.data.newMessage.conversation_id) {
                        index = i
                    }
                }

                let newMessage = subscriptionData.data.newMessage;
                prev.allConversations[index].ChatMessage.push(newMessage)
                this.setState({
                    allConversations: prev.allConversations
                })
                return prev;
            }
        });
        this.props.allConversations.subscribeToMore({
            document: SUBS_CONVERSATIONS
            ,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                //console.log('subscriptionData', subscriptionData)
                if (subscriptionData.data.newConversation.Creator === this.state.owner) {
                    const update = subscriptionData.data.newConversation.members.find(res => res._id === this.state.owner)
                    if (update !== undefined) {
                        let newConversation = subscriptionData.data.newConversation;
                        prev.allConversations.push(newConversation)
                        this.setState({
                            allConversations: prev.allConversations
                        })
                    }
                    return prev;
                }
            }
        });
    }


    onSelectUser = async (conversation, selectedUser, index) => {
        await this.setState({
            selectedUser: selectedUser,
            conversation: conversation,
            conversation_id: conversation._id,
            index: index
        });
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

    handleNewConversationPopUp(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            addNewConversation: !prevState.addNewConversation,
            showModalCreate: prevState.showModalCreate
        }))
    }
    render() {

        const { conversation, friends, selectedUser, selectedSectionId,
            allConversations, conversation_id, owner, currentUser, addNewConversation, showModalCreate } = this.state;


        return (
            <div className="top">

                <AllConv setConversations={this.setConversations} allConversations={allConversations}
                    setCurrentUser={this.setCurrentUser} />
                <div className="gx-app-module gx-chat-module" style={{ bottom: 20 }}>
                    <div className="gx-chat-module-box">
                        <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">

                            {currentUser !== null ?
                                <UserList authUser={currentUser}
                                    conversations={allConversations} selectedSectionId={selectedSectionId}
                                    onSelectUser={this.onSelectUser}
                                    handleNewConversationPopUp={this.handleNewConversationPopUp}

                                /> : null}
                        </div>

                        {addNewConversation === true ?
                            <div className="gx-chat-box">
                                {selectedUser !== null ?

                                    <ChatBox
                                        selectedUser={selectedUser}
                                        conversation={conversation}
                                        authUser={currentUser}
                                        addNewConversation={addNewConversation}

                                        chat={allConversations}
                                        conversation_id={conversation_id}
                                        owner={owner}
                                        selectedSectionId={selectedSectionId}
                                        showDrawer={this.showDrawer}
                                    />


                                    :
                                    <div className="gx-comment-box">
                                        <div className="gx-fs-80">
                                            <i className="icon icon-chat gx-text-muted" />
                                        </div>
                                        <h1 className="gx-text-muted">
                                            <span>Sélectionnez un utilisateur pour démarrer le chat</span>
                                        </h1>
                                        <button type="button" className="ant-btn gx-d-block gx-d-lg-none ant-btn-primary" onClick={this.showDrawer}>
                                            <span>Sélectionnez un utilisateur pour démarrer le chat</span>
                                        </button>
                                    </div>
                                }



                            </div>
                            :

                            <div className="gx-comment-box">
                                <div className="gx-fs-80">
                                    <i className="icon icon-chat gx-text-muted" />
                                </div>
                                <FriendList handleNewConversationPopUp={this.handleNewConversationPopUp} showModalCreate={showModalCreate} />
                            </div>
                        }
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
                    {currentUser !== null ?
                        <UserList authUser={currentUser} friends={friends} selectedSectionId={selectedSectionId} onSelectUser={this.onSelectUser} />
                        : null}
                </Drawer>


            </div>
        )
    }


}

export default graphql(ALL_CONVERSATIONS, {
    name: 'allConversations',
    options: (props) => ({ variables: { user_id: JSON.parse(localStorage.getItem("userid")) } }
    )
}
)
    (Chat)




