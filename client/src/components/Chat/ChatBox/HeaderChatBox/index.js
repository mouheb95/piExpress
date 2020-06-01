import React from "react";
const HeaderChatBox = ({ selectedUsers, showDrawer }) => {
    if (selectedUsers === null) return <div>Loading</div>
    return (
        <div className="gx-chat-main-header">
            <span className="gx-d-block gx-d-lg-none gx-chat-btn" onClick={showDrawer}>
                <i className="gx-icon-btn icon icon-chat"></i>
            </span>
            <div className="gx-chat-main-header-info">
                <div className="gx-chat-avatar gx-mr-2">
                    <div className="gx-status-pos">
                        <span className="ant-avatar gx-rounded-circle gx-size-60 ant-avatar-circle ant-avatar-image">
                            {selectedUsers[0] !== undefined && selectedUsers[0].ProfilePicture !== null && selectedUsers[0].ProfilePicture !== undefined ?
                                <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + selectedUsers[0].ProfilePicture} />
                                :
                                <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
                            }
                        </span>
                        <span className="gx-status gx-online">
                        </span>
                    </div>
                </div>
                <div className="gx-chat-contact-name">
                    {selectedUsers.map((selectedUser, index) =>
                        <span key={index} className="gx-name h4">{selectedUser.FirstName} ,</span>
                    )}


                </div>

            </div>
        </div>



    )
}
export default HeaderChatBox;