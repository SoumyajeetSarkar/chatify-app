import React from 'react'
import "./Chat.css";
import ChatHeader from './ChatHeader';
import Input from './Input';
import Messages from './Messages';
const ChatContainer = () => {
  return (
    <div className='chat-container'>
      <ChatHeader/>
      <Messages/>
      <Input/>
      </div>
  )
}

export default ChatContainer