import React, { useContext, useState } from 'react'
import './Chat.css';
import {MdAddPhotoAlternate, MdAttachFile } from "react-icons/md";
import {FiSend} from "react-icons/fi";
import { AuthContext } from '../../AuthContext';
import { UserChatContext } from '../../userChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
const Input = () => {
  const {currUser} = useContext(AuthContext);
  const {userData} = useContext(UserChatContext); 
  const [text,setText] = useState('');
  const sendMessage = async(e)=>{
    e.preventDefault();
    await updateDoc(doc(db,"chats",userData.chatID), 
      {messages: arrayUnion({
        time: Timestamp.now(),
        message: text,
        sender: currUser.uid,
      })}
    )

    await updateDoc(doc(db,'userChats', currUser.uid),{
      [userData.chatID + ".lastMsg"]:
        text
      ,
      [userData.chatID+".date"]: serverTimestamp()
    })
    await updateDoc(doc(db,'userChats', userData.user.uid),{
      [userData.chatID + ".lastMsg"]:
        text
      ,
      [userData.chatID+".lastSeen"]: serverTimestamp()
    })
    setText('');
  }
  return userData.chatID!='null'?(
    <div className='chat-input-container'>
      <input placeholder='Type message' type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
      <div className='chat-input-actions'>
        <MdAttachFile size={30}/>
        <button onClick={sendMessage}><FiSend size={30} /></button>
      </div>
      </div>
  ): <div><h1>CLICK ON A CHAT TO START CHATTING</h1></div>
}

export default Input