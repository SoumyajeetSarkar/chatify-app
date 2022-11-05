import React, { useContext } from "react";
import "./chat.css";
import defaultImg from '../../assets/default.png';
import { UserChatContext } from "../../userChatContext";
const Chats = (props) => {
  const user = props.chatDetails[1].userInfo; //props.chatDetails send us an array [combinedID(for our mutual shared chat), {date: xxx ,userInfo: {diplayName, uid, photoURL}]
  const lastMsg = props.chatDetails[1].lastMsg;
  console.log(user); 
  //{diplayName, uid, photoURL}
  const {dispatch} = useContext(UserChatContext);
  const handleSelect = (e)=>{
    e.preventDefault();
    dispatch({type: "CHANGE_USER", payload: user})
  }
  return (
    <div className="chats-container" onClick={handleSelect}>
      <img src={user.photoURL || defaultImg} alt='profile'/>
      <div className="chats-content">
        <p className="name">{user.displayName}</p>
        <p className="message">{lastMsg || ""}</p>
      </div>
    </div>
  );
};

export default Chats;
