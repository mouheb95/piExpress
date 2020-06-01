import React from "react";
import { Avatar } from "antd";
import moment from 'moment';
const ReceivedMessageCell = ({ conversation, selectedUser }) => {
  return (
    <div className="gx-chat-item">

     
      {selectedUser.ProfilePicture !== null && selectedUser.ProfilePicture !== undefined ?
        <Avatar className="gx-size-40 gx-align-self-end" src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + selectedUser.ProfilePicture} />
        :
        <Avatar className="gx-size-40 gx-align-self-end" src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
      }
      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{moment(conversation.created_at).format("hh:mm")}</div>
        </div>
      </div>

    </div>
  )
};

export default ReceivedMessageCell;
