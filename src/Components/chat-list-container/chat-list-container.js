import React, { useContext, useEffect } from "react";
import Chats from "./Chats";
import "./chat-list.css";
import { useState } from "react";
import {AuthContext} from "../../AuthContext";
import { onSnapshot,doc } from "firebase/firestore";
import {db} from "../../firebase";
// const chatList = [
//   { name: "User1", message: "Hello" },
//   {
//     name: "user2",
//     message: "Hi, I am User2",
//   },
// ];
const ChatList = () => {
  const {currUser:user} = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  console.log(chats)
  //fetch all user chats for display on sidebar
  //use firebase "get data realtime using firestore"
  useEffect(()=>{
    const getChats=()=>{
      const fetchChats = onSnapshot(doc(db,"userChats", user.uid), (doc)=>{
        setChats(doc.data());
      })
      return ()=>{fetchChats()}
    }

    user.uid && getChats();
  },[])
  return (
    <div className="chat-list-container">
      {Object.entries(chats)?.map((item) => (
        <Chats chatDetails={item} />
      ))}
    </div>
  );
};

export default ChatList;
