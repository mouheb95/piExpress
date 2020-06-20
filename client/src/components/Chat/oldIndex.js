import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer, Button } from 'antd';
import UserList from './UserList';
import ChatBox from './ChatBox';
import socketIOClient from "socket.io-client";
import ENDPOINT from 'util/GlobalURL';
import { putUserConversations } from '../../appRedux/actions/Auth';
import axios from 'axios';
const socket = socketIOClient(ENDPOINT);
class Chat extends Component {
    state = {

        visible: false,
        friends: [],
        selecteduser: null,
        chatid:null,
        chat: [],
        msgvalue:''
    };

    componentDidMount() {
        let userid = JSON.parse(localStorage.getItem("userid"));
        let data = {
            room: [userid, "5e81b539b76d560001a1122c"]
        };
        axios.get(ENDPOINT + "/friend/ByUserID/" + userid).then(async data => {
            if (data) {
                let tab = data.data;
                var list = [];
                await tab.forEach(async element => {
                    await axios.get(ENDPOINT + "/users/ByID/" + element.FriendWith).then(async friend => {
                        if (friend) {
                            // console.log("details user" + JSON.stringify(friend.data))
                            await list.push(friend.data);
                        }
                    })
                    this.setState({ friends: list })

                });
            }
        }
        );
        const socket = socketIOClient(ENDPOINT);
        // axios.post(ENDPOINT+"/chat/Conversation",data).then(async data=>
        //     { if(data){
        //           console.log("create"+JSON.stringify(data.data[0]) )

        //         await  this.props.putUserConversations(userid,data.data[0]._id);
        //         await  this.props.putUserConversations("5e81b539b76d560001a1122c",data.data[0]._id);
        //       }

        //   }
        // ) 
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        //      socket.on("connexionState", data => console.log("connexionState "+JSON.stringify (data)));
        //      socket.on("connect", data => {
        //         socket.emit("join", [userid,"5e81b539b76d560001a1122c"]);
        //       });
        //   socket.on("roomJoined", data => console.log("connexionState "+JSON.stringify (data))); 
        //   let pushmessage={
        //     conversationid:this.props.userconversationlist!==null? this.props.userconversationlist[0]: "5eaae2677f9bc03ee883f0ef",
        //    author:userid,
        //    message: "Bonjour Faten "  
        //   }
        //   socket.emit("message",pushmessage );
    }


    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    onSelectUser = async (user) => {
      
       await this.setState({ selecteduser: user });
        let userid = JSON.parse(localStorage.getItem("userid"));
        let data = {
            chat: [userid,user._id]
        };
        // console.log("onSelectUser" + JSON.stringify(data));
       await axios.post(ENDPOINT +"/chat/Conversation", data).then(async result => {
            if (result) {
                // console.log("create" + JSON.stringify(result.data._id))
                    this.setState({chatid:result.data._id});
                await this.props.putUserConversations(userid,result.data._id);
                await this.props.putUserConversations(user._id, result.data._id);
                await this.getAllMsg(result.data._id);
                
                socket.on("connexionState", data => console.log("connexionState "+JSON.stringify (data)));
                socket.on("connect", data => {
                socket.emit("join",result.data._id);
                socket.on("Joined",data => console.log("chatid "+JSON.stringify (data)));
               
               



              });
            }

        }
        )
    };
 async   getAllMsg (chatid){
     console.log("getAllMsg");
      await  axios.get(ENDPOINT +"/chat/Conversation/messages/"+chatid).then( result => {
            console.log("Conversations/" + JSON.stringify(result.data))
      this.setState({chat:result.data})
    })
    }
    selectedSectionId = () => {
        console.log("selectedSectionId");
       
    };
    onclickSendMsg= async(msg) => {
        let userid = JSON.parse(localStorage.getItem("userid"));
        let data={
            conversationid:this.state.chatid,
            author:userid,
            message:msg
        }
        socket.emit("message",data);
        document.getElementById("text-message").value ='';
        // console.log("onclickSendMsg"+msg);
        socket.on("newMessage",data =>
        { 
            // console.log("newMessage"+JSON.stringify(data.data))
            let list_msg=this.state.chat;
              list_msg.push(data);
            this.setState({chat:list_msg})
        }
        )
      
    };
       render() {

        let list = [{ id: 1, name: "test" }, { id: 2, name: "test" }, { id: 3, name: "test" }, { id: 4, name: "test" }, { id: 5, name: "test" }]
        let x = { id: 1, name: "test" }
        const { authUser, userconversationlist } = this.props;
        const { friends, selecteduser,chat,msgvalue } = this.state;
        // console.log("friends" + JSON.stringify(friends));
        return (
            <div style={{ marginBottom: '-25%' }}>
                <div className="gx-app-module gx-chat-module" style={{ bottom: 20 }}>
                    <div className="gx-chat-module-box">
                        <div className="gx-chat-sidenav gx-d-none gx-d-lg-flex">
                            <UserList authUser={authUser} friends={friends} selectedSectionId={this.selectedSectionId} onSelectUser={this.onSelectUser} />
                        </div>
                        <div className="gx-chat-box">
                            {selecteduser !== null ?
                                <ChatBox msgvalue={msgvalue}  chat={chat} onclickSendMsg={this.onclickSendMsg} selectedUser={selecteduser} showDrawer={this.showDrawer} />
                               

                                :
                                <div class="gx-comment-box">
                                    <div class="gx-fs-80">
                                        <i class="icon icon-chat gx-text-muted" />
                                    </div>
                                    <h1 class="gx-text-muted">
                                        <span>Sélectionnez un utilisateur pour démarrer le chat</span>
                                    </h1>
                                    <button type="button" class="ant-btn gx-d-block gx-d-lg-none ant-btn-primary" onClick={this.showDrawer}>
                                        <span>Sélectionnez un utilisateur pour démarrer le chat</span>
                                    </button>
                                </div>
                            }



                        </div>
                    </div>
                </div>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute', left: 0 }}
                >
                    <UserList authUser={authUser} friends={friends} selectedSectionId={this.selectedSectionId} onSelectUser={this.onSelectUser} />
                </Drawer>
            </div>
        )
    }

}
const mapStateToProps = ({ auth }) => {
    const { authUser, userconversationlist } = auth;
    return { authUser, userconversationlist }
};
export default connect(mapStateToProps, { putUserConversations })(Chat);;
