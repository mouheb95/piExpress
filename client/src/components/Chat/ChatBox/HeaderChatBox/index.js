import React from "react";
import { Link } from "react-router-dom";
const HeaderChatBox = ({ selectedUser, showDrawer }) => {
    if (selectedUser === null) return <div>Loading</div>
    let listUsers = []
    selectedUser.members.map((item, index) =>
        item._id !== selectedUser._id ? listUsers.push(item) : null
    )
    console.log(selectedUser.members)
    return (
        <div className="gx-chat-main-header">
            <span className="gx-d-block gx-d-lg-none gx-chat-btn" onClick={showDrawer}>
                <i className="gx-icon-btn icon icon-chat"></i>
            </span>
            {selectedUser !== null && selectedUser !== undefined ?
                <div className="gx-chat-main-header-info">
                    <div className="gx-chat-avatar gx-mr-2">
                        <div className="gx-status-pos">
                            <span className="ant-avatar gx-rounded-circle gx-size-60 ant-avatar-circle ant-avatar-image">
                                {selectedUser !== undefined && selectedUser.ProfilePicture !== null && selectedUser.ProfilePicture !== undefined ?
                                    <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + selectedUser.ProfilePicture} />
                                    :
                                    <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
                                }
                            </span>
                            <span className="gx-status gx-online">
                            </span>
                        </div>
                    </div>
                    <div className="gx-chat-contact-name">
                        {listUsers.map((user, index) =>
                            <span key={index} className="gx-name h4">{user.FirstName} {user.LastName}</span>
                        )}
                    </div>

                </div>
                :
                null
            }
        </div>



    )
}
export default HeaderChatBox;