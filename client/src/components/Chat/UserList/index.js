import React, { useState, useEffect } from "react";


import ConnectUser from './ConnectUser';
import FriendsList from './FriendsList';
const UserList = ({ authUser, conversations, selectedSectionId, onSelectUser, handleNewConversationPopUp, Friends }) => {
    const [FakeConversations, setFakeConversations] = useState(conversations)
    const [AllConversations, setAllConversations] = useState(conversations)
    const [search, setSearch] = useState("")

    console.log("search", search)

    useEffect(() => {
        if (conversations !== undefined) {
            setFakeConversations(conversations);
            setAllConversations(conversations)
        }
        handleSearchFriends(search)
    }, [search, conversations])

    const handleSearchFriends = value => {
        if (value === "") {
            setSearch("");
            setFakeConversations(conversations);
            setAllConversations(conversations)
        }
        else {
            let x = []
            let list = FakeConversations.map(
                e => e.members.map(c => {
                    if (c.FirstName.toUpperCase().match(value.toUpperCase())) {
                        x.push(e)
                    }
                }
                )
            )
            setAllConversations(x)
            setSearch(value)
        }
    };
    console.log("AllConversations", AllConversations)
    if (conversations == undefined || AllConversations === undefined || FakeConversations == undefined || conversations === '') {
        return (
            <div className="gx-chat-sidenav-main">
                {<ConnectUser user={authUser} handleNewConversationPopUp={handleNewConversationPopUp} />}

            </div>

        )
    }


    return (
        <div className="gx-chat-sidenav-main">
            {<ConnectUser user={authUser} handleNewConversationPopUp={handleNewConversationPopUp} setSearch={setSearch} />}
            <div className="gx-chat-sidenav-content">
                <div className="ant-tabs ant-tabs-top gx-tabs-half ant-tabs-line">
                    <div className="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content" >
                        <div role="tabpanel" aria-hidden="false" className="ant-tabs-tabpane ant-tabs-tabpane-active">
                            <div className="" style={{ overflow: "scroll", height: 400 }}> {/* gx-chat-sidenav-scroll-tab-1 */}
                                {AllConversations.map((friend, index) =>
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