import React from "react";
import { Avatar } from "antd";
import moment from 'moment';
const SentMessageCell = ({ conversation, authUser }) => {
  return (
    <div className="gx-chat-item gx-flex-row-reverse">

      {authUser.ProfilePicture !== null && authUser.ProfilePicture !== undefined ?
        <Avatar className="gx-size-40 gx-align-self-end" src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + authUser.ProfilePicture} />
        :
        <Avatar className="gx-size-40 gx-align-self-end" src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
      }

      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          <div className="gx-time gx-text-muted gx-text-left gx-mt-2"> {conversation.createdAt}</div>
        </div>
      </div>

    </div>
  )
};

export default SentMessageCell;
