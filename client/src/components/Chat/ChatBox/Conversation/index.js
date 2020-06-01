import React from "react";

import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";

const Conversation = ({conversationData, selectedUser}) => {
  if(conversationData === null) return <div>Loading</div>
  return (
    <div className="gx-chat-main-content">
      {conversationData.map((conversation, index) => conversation.owner !== selectedUser._id ?
        <SentMessageCell key={index} conversation={conversation} /> :
        <ReceivedMessageCell key={index} conversation={conversation}selectedUser={selectedUser}/>
      )}
    </div>
  )
};

export default Conversation;
