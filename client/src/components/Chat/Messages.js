import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const ALL_MESSAGES = gql`
  {
    allMessages(conversation_id: "5ec2737d305b1824501bca82") {
   ChatMessage{
    content
    owner
  }
    
  }
}
`

const MESSAGE_SUBSCRIPTION = gql`
 subscription onMessageSent{
  subscription {
  newMessage{
    _id
    content
    owner
  }

  }
}
`
const SEND_MESSAGES = gql`
 mutation addMessage($newMessage: InputMessage!) {
  addMessage(input: $newMessage) {
    _id
    owner
    content
  }
}
`

class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allMessages: '',
      show: false
    }

  }

  componentDidMount() {

    console.log(`Chat - componentDidMount`)
    // Subscribe to `CREATED`-mutations
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
      document: gql`
        subscription {
          newMessage{
            _id
            content
            owner
          }
        }
      `,

      updateQuery: (previousState, { subscriptionData }) => {
        const newMessage = subscriptionData.data.newMessage
        newMessage._id = Math.floor(Math.random() * Math.floor(10000))
        //console.log("new message", newMessage)
        const messages = previousState.allMessages.concat([newMessage])
        //console.log("all messages", messages)
        this.setState({
          allMessages: messages
        })
        return {
          allMessages: messages
        }
      },
      onError: (err) => console.error(err),
    })

    /* setTimeout(() => {
      console.log("hello",this.props.allMessagesQuery.allMessages[0].ChatMessage)
     console.log(chat)
    }, 7000); */
    
  }

  /*   componentDidUpdate(prevProps) {
      if (prevProps.allMessagesQuery.allMessages !== this.props.allMessagesQuery.allMessages && this.endRef) {
        this.endRef.scrollIntoView()
      }
    } */


  render() {

    const { allMessages } = this.state

    return (
      <div>
        {allMessages !== null && allMessages !== '' ?
          allMessages.map((message, index) =>
            <p style={{ color: "red" }} key={index}> {message.content} </p>
          )
          : null
        }

      </div>
    );


  }
}



export default graphql(SEND_MESSAGES, { name: 'createMessageMutation' })(
  graphql(ALL_MESSAGES, { name: 'allMessagesQuery' })(Messages)
)
