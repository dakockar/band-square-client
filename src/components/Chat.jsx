import axios from 'axios';
import React, { Component } from 'react'
// import config from '../config';
// import ChatMessage from './ChatMessage'
// import ChatInput from './ChatInput'
// import io from 'socket.io-client'


function Chat(){
    return (
        <h1>Chat</h1>
    )
}

export default Chat


// class Chat extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             chat: [],
//             content: "",
//             name: this.props.loggedInUser.email,
//             band: '',
//             imageUrl: this.props.loggedInUser.imgUrl
//         }
//     }

//     socket = io.connect((config.SOCKET_URL));

//     componentDidMount(){
//         const room = this.props.bandId;

//         this.socket.on('connect', () => {
//             this.socket.emit('room', room);
//         })

//         let id = this.props.bandId;
//         axios
//             .get(`${config.API_URL}/band-messages/${id}`, { withCredentials: true})
//             .then((response) => {
//                 let msg = response.data
//                 this.setState(
//                     (state) => ({
//                         chat: [...state.chat, ...msg.reverse()]
//                     }),
//                     this.scrollToBottom
//                 );
//             })
//             .catch((err) => {
//                 console.log('error with chat', err)
//             })

//             this.socket.on('push', (msg) => {
//                 this.setState(
//                     (state) => ({
//                         chat: [...state.chat, msg]
//                     }),
//                     this.scrollToBottom
//                 )
//             })
//     }

//     handleContent= (event) => {
//         this.setState({
//             content: event.target.value
//         })
//     }

//     handleSumbit = (event) => {
//         event.preventDefault()

//         this.setState((state) => {
//             this.socket.emit('message', {
//                 name: state.name,
//                 content: state.content,
//                 band: this.props.bandId,
//                 imageUrl: state.imgUrl
//             })

//             return {
//                 chat: [...state.chat, {
//                     name:this.props.loggedInUser.email,
//                     content: state.content,
//                     band: state.band,
//                     imageUrl: imgUrl
//                 }],
//                 content: ''
//             }
//         }, this.scrollToBottom)
//     }

//     scrollToBottom(){
//         const chat = document.getElementById('chat');
//         chat.scrollTop = chat.scrollHeight
//     }


//     render(){
//         if(!this.props.loggedInUser){
//             return <Redirect to='/' />
//         }

//         return(
//             <div>
//                 <label>
//                     Hello
//                 </label>
//                 <div className="meddages-container" id="chat" elevation={3}>
//                     {this.state.chat.map((message, index) => (
//                         <ChatMessage 
//                             key={index}
//                             message={message.content}
//                             name={message.name}
//                             loggedInUser={this.props.loggedInUser}
//                             imageUrl={message.imageUrl}
//                             />
//                     ))}
//                 </div>
//                 <div className="chat-input">
//                     <ChatInput 
//                         ws={this.socket}
//                         content={this.state.content}
//                         handleContent={this.handleContent.bind(this)}
//                         onSubmitMessage={this.handleSumbit.bind(this)}
//                     />
//                 </div>
//             </div>
//         )
//     }
// }

// export default Chat