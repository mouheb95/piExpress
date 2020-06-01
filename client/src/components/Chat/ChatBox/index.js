import React, { useEffect } from "react";
import HeaderChatBox from './HeaderChatBox';
import FooterChatBox from './FooterChatBox';
import Conversation from './Conversation'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'


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

const NEW_MESSAGE = gql`
mutation createMessage($newMessage: InputMessage)
{
    addMessage(input: $newMessage)
    {
        _id
        owner
        content
        isDeleted
        createdAt
        conversation_id
    }

}
`

const ChatBox = ({ selectedUser, conversation, chat, showDrawer, conversation_id, owner, addNewConversation, authUser }) => {
    const user_id = JSON.parse(localStorage.getItem("userid"))
    const { data, loading, error } = useQuery(ALL_CONVERSATIONS, {
        variables: { user_id }
    });
    const [CreateAMessage, newMessage] = useMutation(NEW_MESSAGE, {
        update(cache, { data: { addMessage } }) {
            const data = cache.readQuery({ query: ALL_CONVERSATIONS });
            cache.writeQuery({
                query: ALL_CONVERSATIONS,
                data: data
            });
        }
    }

    );

    const onSubmit = input => {
        console.log("input", input)
        CreateAMessage({
            variables: { newMessage: input }
        })
    }

    if (loading || error || newMessage.loading) return <div>Loading</div>
    if (chat === null) return <div>Loading</div>
    if (conversation === null) return <div>Loading</div>
    if (conversation.ChatMessage === null) return <div>Loading</div>
    if (conversation.ChatMessage === undefined) return <div>Loading</div>
    let fakeChat = []

    chat.map(conv => {
        if (conv._id === conversation_id) {
            conv.ChatMessage.map((item, index) =>
                fakeChat.push(item)
            )
        }
    })


    return (
        <div className="gx-chat-main">
            <HeaderChatBox selectedUsers={selectedUser} showDrawer={showDrawer} />
            <div className="gx-chat-list-scroll" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', top: '0px', left: '0px', right: ' 0px', bottom: '0px', overflow: 'scroll', marginRigth: '-17px', marginBottom: '-17px' }}>
                    <div className="gx-chat-main-content">

                        <Conversation conversationData={fakeChat} authUser={authUser} selectedUser={selectedUser} conversation={conversation} addNewConversation={addNewConversation} />

                    </div>
                </div>
            </div>
            <FooterChatBox conversation_id={conversation_id} owner={owner} onSubmit={onSubmit}  />
        </div>



    )
}
export default ChatBox;