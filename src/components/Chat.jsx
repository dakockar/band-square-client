// import ChatMessage from './ChatMessage'
// import ChatInput from './ChatInput'


//npm i socket.io@2.3.0
import { Button, Card, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import config from '../config';

let socket;
// const CONNECTION_PORT = "localhost:5005";
const CONNECTION_PORT = "https://band-square.herokuapp.com";

function Chat(props) {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  // const [recipientId, setRecipientId] = useState('');
  const [recipient, setRecipient] = useState('');



  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    socket = io(CONNECTION_PORT);
    // setRecipientId(props.match.params.recipientId)
    const { recipientId } = props.match.params;
    // console.log(recipientId);
    const { recipientType, user } = props;

    if (recipientType === "musician") {
      axios.get(`${config.API_URL}/api/musician/${recipientId}`)
        .then((response) => {
          setRecipient(response.data)
          setRoom(response.data._id)
          socket.emit("join_room", response.data._id);
          // connectToRoom();
        })
        .catch((err) => {
          console.log("cannot get musician from database", err);
        });
    }
    else if (recipientType === "venue") {
      axios.get(`${config.API_URL}/api/venue/${recipientId}`)
        .then((response) => {
          setRecipient(response.data);
          setRoom(response.data._id)
          socket.emit("join_room", response.data._id);
          // connectToRoom();
        })
        .catch((err) => {
          console.log("cannot get venue from database", err);
        });
    }

    setUser(user)

  }, [CONNECTION_PORT]);



  useEffect(() => {
    // console.log(room);

    socket.on("receive_message", (data) => {
      // console.log("inside socket.on", data);
      setMessageList([...messageList, data]);
    });
  });


  const connectToRoom = () => {

    // event.preventDefault();
    // console.log(event.target);

    // for venues, recipient id is the venue id, not the owner id
    // setRoom(recipient._id);
    // console.log(room);
    // get this room's messages from database
    axios.get(`${config.API_URL}/api/messages/${recipient._id}`)
      .then((response) => {
        console.log('----response room', response.data);
        setLoggedIn(true);
        // socket.emit("join_room", room);

        setMessageList(response.data);
      })
      .catch((err) => {
        console.log("can't get message list", err);
      });


    // console.log('rooms', rooms)
    // setLoggedIn(true);
    // socket.emit("join_room", room);
  };

  const sendMessage = async () => {

    let author = user.firstName || user.email

    let messageContent = {
      room: room,
      to: recipient._id,
      from: user._id,
      message: message,
      author: author
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent]);
    setMessage("");
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          {/* <form action="POST"> */}
          {/* <input type="text" placeholder="room #" /> */}
          <Button className="button" onClick={connectToRoom}>Connect</Button>
          {/* </form> */}
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, index) => {
              return (
                <div
                  key={index}
                  className="messageContainer"
                  id={val.author === user.firstName || val.author === user.email ? "me" : "other"}
                >
                  <div className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>

          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <InputGroup.Append>
              <Button onClick={sendMessage} variant="dark">Send</Button>
            </InputGroup.Append>
          </InputGroup>
          {/* <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
        </div> */}
        </div>
      )
      }
    </div>
  );
}

export default Chat;