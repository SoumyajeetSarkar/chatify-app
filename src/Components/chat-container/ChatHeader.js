import React, { useContext } from 'react'
import { UserChatContext } from '../../userChatContext';
import './Chat.css';


const ChatHeader = () => {
  const {userData} = useContext(UserChatContext);
  console.log(userData);
  return (
    <div className='chat-header-container'>
      <div className='chat-header-content'>
        <img src={userData?.user.photoURL}/>
        <h2>{userData.user?.displayName}</h2>
      </div>
      </div>
  )
}

export default ChatHeader