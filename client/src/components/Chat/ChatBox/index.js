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

const ChatBox = ({ selectedUser, chat, showDrawer, conversation_id, owner }) => {
    const user_id = JSON.parse(localStorage.getItem("userid"))
    const { data, loading, error } = useQuery(ALL_CONVERSATIONS, {
      variables: { user_id },
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
    if (selectedUser === null) return <div>Loading</div>
    if (selectedUser.ChatMessage === null) return <div>Loading</div>
    if (selectedUser.ChatMessage === undefined) return <div>Loading</div>
console.log("chat", chat[0])
console.log("selectedUser", selectedUser)
    let fakeChat = []
    if (chat[0].ChatMessage !== undefined && chat.ChatMessage !== null) {
        chat[0].ChatMessage.map((item, index) =>
            fakeChat.push(item)
        )

    }


    return (
        <div className="gx-chat-main">
            <HeaderChatBox selectedUser={selectedUser} showDrawer={showDrawer} />
            <div className="gx-chat-list-scroll" style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', top: '0px', left: '0px', right: ' 0px', bottom: '0px', overflow: 'scroll', marginRigth: '-17px', marginBottom: '-17px' }}>
                    <div className="gx-chat-main-content">

                        <Conversation conversationData={fakeChat} selectedUser={selectedUser} />

                    </div>
                </div>
            </div>
            <FooterChatBox conversation_id={conversation_id} owner={owner} onSubmit={onSubmit} />
        </div>




    )
}
export default ChatBox;