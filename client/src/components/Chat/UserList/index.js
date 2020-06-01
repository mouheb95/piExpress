import React, { useState, useEffect } from "react";


import ConnectUser from './ConnectUser';
import FriendsList from './FriendsList';
const UserList = ({ authUser, conversations, selectedSectionId, onSelectUser, handleNewConversationPopUp, Friends }) => {
    /* const [FakeAllFriends, setFakeAllFriends] = useState(Friends)
    const [AllFriends, setAllFriends] = useState(Friends)
    const [search, setSearch] = useState() */
    if (conversations == undefined || conversations === '') {
        return (
            <div className="gx-chat-sidenav-main">
                {<ConnectUser user={authUser} handleNewConversationPopUp={handleNewConversationPopUp} />}

            </div>

        )
    }

    return (
        <div className="gx-chat-sidenav-main">
            {<ConnectUser user={authUser} handleNewConversationPopUp={handleNewConversationPopUp} />}
            <div className="gx-chat-sidenav-content">
                <div className="ant-tabs ant-tabs-top gx-tabs-half ant-tabs-line">
                    <div className="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content" >
                        <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
                            <div className="" > {/* gx-chat-sidenav-scroll-tab-1 */}
                                {conversations.map((friend, index) =>
                                    <FriendsList key={index} index={index} conversation={friend} selectedSectionId={selectedSectionId} onSelectUser={onSelectUser} />
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