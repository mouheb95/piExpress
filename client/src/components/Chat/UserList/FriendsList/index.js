import React, { useEffect } from "react";

const search = (value) => {
    console.log("value")
}
const FriendsList = ({ onSelectUser, selectedSectionId, user }) => {
    if (user.members === undefined) return <div>members ...</div>
    let listUsers = []
    user.members.map((item, index) =>
        item._id !== selectedSectionId ? listUsers.push(item) : null
    )
    if(user=== null || user.ChatMessage === undefined ) return <div>chat</div>
    return (
        <div>
            <div className="gx-chat-user">
                <div className={`gx-chat-user-item ${selectedSectionId === user.id ? 'active' : ''}`} onClick={() => {
                    onSelectUser(user);
                }}>
                    <div className="gx-chat-user-row">
                        <div className="gx-chat-avatar">
                            <div className="gx-status-pos">
                                <span className="ant-avatar gx-size-40 ant-avatar-circle ant-avatar-image">
                                    {/* <img src={require('assets/images/widget/flying.png')} /> */}
                                    {user.ProfilePicture !== null && user.ProfilePicture !== undefined ?
                                        <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + user.ProfilePicture} />
                                        :
                                        <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
                                    }
                                </span>
                                <span className="gx-status gx-small gx-online">
                                </span>
                            </div>
                        </div>
                        <div className="gx-chat-info">
                            {listUsers.map((user, index) =>
                                <span key={index} className="gx-name h4">{user.FirstName} {user.LastName}</span>
                            )}
                            <div className="gx-chat-info-des gx-text-truncate">{user.ChatMessage.length !== 0? user.ChatMessage[user.ChatMessage.length-1].content: "send your first message <3"}</div>
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