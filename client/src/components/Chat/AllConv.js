
import React, { useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'


const ALL_CONVERSATIONS = gql`
query conv($user_id: ID!) {
  allConversations(user_id: $user_id) {
    _id
    GroupName
    members {
      _id  
      FirstName
      LastName
    }
    ChatMessage {
      _id
      content
      owner
      createdAt
    }
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




  function AllConv ({ setConversations, setCurrentUser })  {
    const user_id = JSON.parse(localStorage.getItem("userid"))
    const { data, loading, error } = useQuery(ALL_CONVERSATIONS, {
      variables: { user_id },
    });
    const { data: dataUser, loading: loadingUser, error: errorUser } = useQuery(GET_CURRENT_USER, {
      variables: { user_id },
    });
  
  
    let dataConv = []
    let currentUser = ''
    if (data !== undefined) {
      dataConv = data.allConversations
    }
    if (dataUser !== undefined) {
      currentUser = dataUser.me
    }
    useEffect(
      () => {
        setConversations(dataConv)
        setCurrentUser(currentUser)
      },
      [dataConv, currentUser]
    )
  
    if (loading || loadingUser) {
      return <p>Loading</p>
    }
  
    if (error || errorUser) {
      return <p> error</p>
    }
    return (
      <div>
      </div>
  
    )
}

export default AllConv