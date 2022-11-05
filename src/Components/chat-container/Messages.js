import React, { useContext, useEffect, useState } from 'react'
import  Message  from './Message';
import './Chat.css';
import { UserChatContext } from '../../userChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {userData} = useContext(UserChatContext);
  console.log(messages,userData.chatID);
  useEffect(()=>{
    const getMessages = onSnapshot(doc(db,"chats",userData.chatID),(doc)=>{
      console.log(doc.data())
      if(doc.exists()){
        console.log('here')
        setMessages(doc.data().messages);
      }
    })
    return ()=>{
      getMessages();
    }
  },[userData.chatID])

  return (
    <div className='chat-message-container'>
      {messages.map((msg)=>(
        <Message data={msg} key={msg.id} senderPic={userData.user.photoURL}/>
      ))}
    </div>
  )
}

export default Messages