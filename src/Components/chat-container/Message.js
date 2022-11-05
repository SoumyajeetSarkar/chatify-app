import React, { useContext, useEffect, useRef } from 'react'
import './Chat.css';
import defaultImg from '../../assets/default.png';
import { AuthContext } from '../../AuthContext';
const Message = (props) => {
  const {currUser} = useContext(AuthContext);
  const msg = props.data;
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[msg])
  return (
    <div className={`chat-message-box ${msg.sender==currUser.uid? 'owner' : ''}`} ref={ref}>
      <img src={msg.sender==currUser.uid? currUser.photoURL : props.senderPic || defaultImg}/>
      <div className={`chat-message-content ${msg.sender==currUser.uid? 'owner' : ''}`}>
        <h3>{msg.message}</h3>
      </div>
      <p>{Date(msg.time)}</p>
    </div>
  )
}

export default Message