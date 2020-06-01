import React, { useEffect } from "react";

const search = (value) => {
    console.log("value")
}
const FriendsList = ({ onSelectUser, selectedSectionId, conversation, index }) => {
    if (conversation.members === undefined) return <div>members ...</div>
    let listUsers = []
    conversation.members.map((item, index) =>
        item._id !== selectedSectionId ? listUsers.push(item) : null
    )
    if (conversation === null || conversation.ChatMessage === undefined) return <div>chat</div>
    return (
        <div>
            <div  className="gx-chat-user">
                <div className={`gx-chat-user-item ${selectedSectionId === conversation.id ? 'active' : ''}`} onClick={() => {
                    onSelectUser(conversation, listUsers, index);
                }}>

                    <div className="gx-chat-user-row">
                        <div className="gx-chat-avatar">
                            <div className="gx-status-pos">
                                <span className="ant-avatar gx-size-40 ant-avatar-circle ant-avatar-image">
                                    {/* <img src={require('assets/images/widget/flying.png')} /> */}
                                    {listUsers.map((user, index) =>
                                        user.ProfilePicture !== null && user.ProfilePicture !== undefined ?
                                            <img key={index} src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + user.ProfilePicture} />
                                            :
                                            <img key={index} src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
                                    )}
                                </span>
                                <span className="gx-status gx-small gx-online">
                                </span>
                            </div>
                        </div>
                        <div className="gx-chat-info">
                            {listUsers.map((user, index) =>
                                <span key={index} className="gx-name h4">{user.FirstName} {user.LastName}</span>
                            )}
                            <div className="gx-chat-info-des gx-text-truncate">{conversation.ChatMessage.length !== 0 ?
                                conversation.ChatMessage[conversation.ChatMessage.length - 1].content :
                                "send your first message <3"}</div>

                            <div className="gx-last-message-time">Aujourd'hui</div>

                        </div>
                        <div className="gx-chat-date">
                            <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">1</div>
                        </div>
                    </div>

                </div>

            </div>

        </div>



    )
}
export default FriendsList;