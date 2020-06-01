import React from "react";
import ConnectUser from './ConnectUser';
import FriendsList from './FriendsList';
const UserList = ({ authUser, conversations, selectedSectionId, onSelectUser }) => {
    if (conversations == undefined || conversations.length < 0 || conversations === '' || conversations[0] == undefined) {
        console.log("conversations", conversations)
        return <div>UserList Loading</div>
    }
    
    return (
        <div className="gx-chat-sidenav-main">
            {<ConnectUser user={authUser} /> }
            <div className="gx-chat-sidenav-content">
                <div className="ant-tabs ant-tabs-top gx-tabs-half ant-tabs-line">
                    <div className="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content" >
                        <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
                            <div className="" > {/* gx-chat-sidenav-scroll-tab-1 */}
                                {conversations.map((friend, index) =>
                                    <FriendsList key={index} user={friend} selectedSectionId={selectedSectionId} onSelectUser={onSelectUser} />

                                )
                                }
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
};

export default UserList;