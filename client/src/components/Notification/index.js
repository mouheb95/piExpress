import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios';
//const ENDPOINT = "http://127.0.0.1:4001";
const ENDPOINT = "https://gatwayebusiness.expert-business-solutions.com/notifications/notifications";

function Notification() {
  const [response, setResponse] = useState("");
  //const [onldResponse, setOldResponse] = useState("");
  
  useEffect(() => {
    
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
       // console.log(data)
      setResponse(data);     
    });
    console.log("hello")
    //axios.get('http://127.0.0.1:4001').then(({data}) => {
    axios.get('https://gatwayebusiness.expert-business-solutions.com/notifications/notifications').then(({data}) => {
    console.log("data", data)
    })

  }, []);
  const user_id = localStorage.getItem("user_id");
 console.log("hello")
 console.log(response)
  if(response !== [] && response.length > 0 && user_id !== null && user_id === response[0].to){
    return (
      <div style={{
        backgroundColor:"black",
        color: "white",
        width: "1000px",
        height: "50px",
      }}>
       <h1>you have a new {response[0].content} from {response[0].from} </h1>
      </div>
     )   
  } else {
    return (
      <div>
      </div>
     )
   
  }
  
  
}

export default Notification;