import { Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import config from '../config';

let socket;

function Chat(props) {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [recipient, setRecipient] = useState('');

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(config.API_URL);
    const { recipientId } = props.match.params;
    const { recipientType, user } = props;

    if (recipientType === "musician") {
      axios.get(`${config.API_URL}/api/musician/${recipientId}`)
        .then((response) => {
          setRecipient(response.data);
          setRoom(response.data._id);
          socket.emit("join_room", response.data._id);
        })
        .catch((err) => {
          console.log("cannot get musician from database", err);
        });
    }
    else if (recipientType === "venue") {
      axios.get(`${config.API_URL}/api/venue/${recipientId}`)
        .then((response) => {
          setRecipient(response.data);
          setRoom(response.data._id);
          socket.emit("join_room", response.data._id);
        })
        .catch((err) => {
          console.log("cannot get venue from database", err);
        });
    }
    setUser(user);
  }, [config.API_URL]);

  useEffect(() => {

    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    // for venues, recipient id is the venue id, not the owner id
    // get this room's messages from database
    axios.get(`${config.API_URL}/api/messages/${recipient._id}`)
      .then((response) => {
        setLoggedIn(true);

        setMessageList(response.data);
      })
      .catch((err) => {
        console.log("can't get message list", err);
      });
  };

  const sendMessage = async () => {
    let author = user.firstName || user.email;

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
        <Button className="button connect-btn" onClick={connectToRoom}>Connect</Button>
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
        </div>
      )
      }
    </div>
  );
}

export default Chat;