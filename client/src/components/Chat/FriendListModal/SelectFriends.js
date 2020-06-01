import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks'

import { Form, Modal, Row, Button, Select, Checkbox } from 'antd'
import gql from 'graphql-tag'
import './style.scss'
import { element } from 'prop-types';

const { Option } = Select;

const ALL_CONVERSATIONS = gql`
query conv($user_id: ID!) {
  allConversations(user_id: $user_id) {
    _id
    GroupName
    Creator
    members {
      _id  
      FirstName
      LastName
      isActive
      ProfilePicture
    }
    ChatMessage {
      _id
      content
      owner
      createdAt(formatString: "MMMM DD, YYYY")
    }
  }
}
`
const CREATE_CONVERSATION = gql`
mutation createConv($addConversation: InputConversation){
    createConversation(input: $addConversation){
      _id
      members{
        _id
        FirstName
        LastName
        ProfilePicture
        isActive
      }
      GroupName
    }
  }
  `
const GET_CURRENT_USER = gql`
query getUser($user_id: ID!) {
  me(user_id: $user_id) {
    _id
    FirstName
    LastName
    isActive
  }
}
`

export default function SelectFriends({ showModalCreate, Friends, onCancel }) {
    const [FakeAllFriends, setFakeAllFriends] = useState(Friends)
    const [AllFriends, setAllFriends] = useState(Friends)
    const [search, setSearch] = useState()
    const [ListFriends, setListFriends] = useState([])
    const user_id = JSON.parse(localStorage.getItem("userid"))
    const { data: dataUser, loading: loadingUser, error: errorUser } = useQuery(GET_CURRENT_USER, {
        variables: { user_id },
    });

    const { data: d, loading: l, error: e } = useQuery(ALL_CONVERSATIONS, {
        variables: { user_id },
    });

    const [CreateConversation, addConversation] = useMutation(CREATE_CONVERSATION, {
        update(cache, { data: { newConversation } }) {
            const conv = cache.readQuery({ query: ALL_CONVERSATIONS });
            cache.writeQuery({
                query: ALL_CONVERSATIONS,
                data: { conv: conv.concat([CreateConversation]) },
            });
        }
    });
    useEffect(() => {
        if (dataUser !== null) {
            setListFriends([dataUser.me._id])
        }
    }, [dataUser])
    if (l || e) return <div>Loading</div>

    const onSubmit = (e, input) => {
        input = {
            "members": ListFriends,
            "GroupName": "first", // should be update in later version
            "Creator": user_id
        }
        console.log("input", input)
        CreateConversation({
            variables: { addConversation: input }
        })
        onCancel(e)
    }



    const handleClick = (e, friend, index) => {
        e.preventDefault(e)

        for (let i = 0; i < ListFriends.length; i++) {
            if (ListFriends[i] === friend.userId) {
                for (let j = i; j < ListFriends.length; j++) {
                    ListFriends[j] = ListFriends[j + 1]
                    ListFriends.length--
                }

                setListFriends(ListFriends)
            }
            else {
                setListFriends([...ListFriends, friend.userId])
            }
        }
    }

    const handleSearchFriends = value => {
        if (value === "") {
            setSearch("");
            setListFriends(Friends);
            setAllFriends(Friends)
        }
        else {

            let list = FakeAllFriends.filter(e => e.firstName.toUpperCase().match(value.toUpperCase()) ||
                e.lastName.toUpperCase().match(value.toUpperCase()));
            setAllFriends(list)
            setSearch(value)
        }
    };



    return (
        <Modal
            title="Sélectionner ami(e)s"
            visible={showModalCreate}
            onCancel={onCancel}
            footer={[
                <div className="Block-button">
                    <div></div>
                    <button key="back" className="btn-2" onClick={(e) => onCancel(e)}>
                        <span>Annuler</span>
                  </button>,
                <button key="submit" className="btn-2" onClick={(e) => onSubmit(e)} >
                        <span>Commencer</span>
                  </button>
                  <div></div>
                </div>
            ]}
        >
            <Form layout='horizontal'>
                <Row>
                    <Form.Item wrapperCol={{ xl: 24 }} style={{ width: "80%", marginRight: 0, marginLeft: "10%", display: "block", textAlign: "center" }}>
                        {Friends.length > 0 ?
                            <Select
                                placeholder={<div><i className="icon icon-search gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle" /> <span>  Rechercher...</span></div>}
                                showSearch
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}

                                onSearch={handleSearchFriends}
                                notFoundContent={null}>
                                {AllFriends.map((s, index) => (
                                    <Option key={s.userId} value={s.userId} >
                                        <span key={index} className="capitalize">{s.firstName} {s.lastName}</span>
                                    </Option>
                                ))}
                            </Select>
                            : null}
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item wrapperCol={{ xl: 24 }} style={{ width: "80%", marginRight: 0, marginLeft: "10%", display: "block" }}>
                        {AllFriends.map((friend, index) =>
                            <div key={index} >

                                <div className="gx-chat-user ">
                                    <div className={`gx-chat-user-item ${false ? 'active' : ''}`} //ListFriends.find(f => f === friend.userId) === undefined
                                        onClick={(e) => handleClick(e, friend, index)}
                                    >

                                        <div className="gx-chat-user-row">
                                            <div className="gx-chat-avatar">
                                                <div className="gx-status-pos">
                                                    <span className="ant-avatar gx-size-40 ant-avatar-circle ant-avatar-image">
                                                        {/* <img src={require('assets/images/widget/flying.png')} /> */}
                                                        {friend.profilePicture !== null && friend.profilePicture !== undefined ?
                                                            <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/' + friend.profilePicture} />
                                                            :
                                                            <img src={'https://e-businessuploads.s3.eu-west-3.amazonaws.com/ProfilePictures/default-user.png'} />
                                                        }
                                                    </span>
                                                    <span className="gx-status gx-small gx-online">
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="gx-chat-info flex-check-friend">

                                                <span >{friend.firstName} {friend.lastName}</span>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        )}
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    );
}
