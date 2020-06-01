import React from "react";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
const Conversation = ({ conversationData, selectedUser, authUser }) => {
  if (conversationData === null) return <div>Loading</div>


  //console.log("conversationData", conversationData) 

  return (
    <div className="gx-chat-main-content gx-flex-col-reverse">
      {conversationData.map((conversation, index) => selectedUser.find(res => res._id === conversation.owner) ?
        <ReceivedMessageCell key={index} conversation={conversation} selectedUser={selectedUser} /> :
        <SentMessageCell key={index} conversation={conversation} authUser={authUser} />
      )}
    </div>
  )
};

export default Conversation;
