import React from "react";
import { Link } from "react-router-dom";
import './style.scss'

const ConnectUser = ({ user, handleNewConversationPopUp, setSearch }) => {

    return (
        <div className="gx-chat-sidenav-header">
            <div className="gx-chat-user-hd">
                <div className="gx-chat-avatar gx-mr-3">
                    <div className="gx-status-pos">
                        <span id="avatar-button" className="ant-avatar gx-size-50 ant-avatar-circle ant-avatar-image">
                            <Link to={`/EditProfile`}>
                                {user.ProfilePicture !== undefined && user.ProfilePicture !== null ?
                                    <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + user.ProfilePicture} />
                                    :
                                    <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
                                }
                            </Link>
                        </span>
                        <span className="gx-status gx-online">
                        </span>
                    </div>
                </div>
                <div className="gx-module-user-info gx-flex-column gx-justify-content-center">
                    <div className="gx-module-title">
                        <h5 className="gx-mb-0"> {user.FirstName} {user.LastName}</h5>
                    </div>
                    <div className="gx-module-user-detail">
                        {/* <span className="gx-text-grey gx-link">robert@example.com</span> */}
                    </div></div></div><div className="gx-chat-search-wrapper">
                <button className='btn-2 btn-rotation' style={{ width: '100%' }} onClick={(e) => {
                    handleNewConversationPopUp(e);
                }}> <span>Nouvelle conversation</span>  </button>
                <div className="gx-search-bar gx-chat-search-bar gx-lt-icon-search-bar-lg">
                    <div className="gx-form-group">
                        <input className="ant-input" type="search" placeholder="Rechercher un contact" onChange={(e) => setSearch(e.target.value)} />

                        <span className="gx-search-icon gx-pointer"><i className="icon icon-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>



    )
}
export default ConnectUser;