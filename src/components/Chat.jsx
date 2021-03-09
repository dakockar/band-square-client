// import axios from 'axios';

// import ChatMessage from './ChatMessage'
// import ChatInput from './ChatInput'


//npm i socket.io@2.3.0

import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import config from '../config';

let socket;
// const CONNECTION_PORT = "localhost:3002/";
const CONNECTION_PORT = "localhost:5005/";

function Chat(props) {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [otherUserId, setOtherUserId] = useState('');



  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    socket = io(CONNECTION_PORT);
    setOtherUserId(props.match.params.userId)
    setUser(props.user)
    
    

  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    axios.get(`${config.API_URL}/api/chat/${user._id}`)
      .then((response) => {
         console.log('----data----',response.data)
        setMessageList(response.data)
        
      })
      .catch(() => {

      })

      console.log('--getblock---', messageList)
        const rooms = messageList.map((message) => {
          return message.room
        })
        if(rooms.includes((otherUserId).toString() + user._id.toString())){
          setRoom((otherUserId.toString() + user._id.toString()))
        }
        else{
          setRoom(user._id.toString() + otherUserId.toString())
        } 
    
        // axios.get(`${config.API_URL}/api/chats/${room}`)
        //   .then((response) => {
      
        //     setMessageList(response.data)
        //     console.log('--room chat---', response, messageList)
        //   })
        //   .catch(() => {
    
        //   })
    
        console.log('rooms',rooms)
        setLoggedIn(true);
        socket.emit("join_room", room);
    
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      to: otherUserId,
      from: user._id,
      content: {
        author: user.firstName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, index) => {
              return (
                <div
                  // key={index}
                  className="messageContainer"
                  id={val.author === user.firstName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;