import React from "react";
import { Avatar } from "antd";
import moment from 'moment';
const ReceivedMessageCell = ({ conversation, selectedUser }) => {
  const user = selectedUser.find(res => res._id === conversation.owner)
  console.log("conversation", conversation)
  return (
    <div className="gx-chat-item">


      {user.ProfilePicture !== null && user.ProfilePicture !== undefined ?
        <Avatar className="gx-size-40 gx-align-self-end" src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + user.ProfilePicture} />
        :
        <Avatar className="gx-size-40 gx-align-self-end" src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
      }
      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{conversation.createdAt}</div>
        </div>
      </div>

    </div>
  )
};

export default ReceivedMessageCell;
