
import React, { useContext } from 'react'
import "./sidebar.css";
import defaultImg from '../../assets/default.png';
import {ChatSearch , ChatList} from '../index';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import {AuthContext} from '../../AuthContext';
import { UserChatContext } from '../../userChatContext';
const Sidebar = () => {
  const {currUser: user} = useContext(AuthContext);
  const {dispatch} = useContext(UserChatContext);
  console.log(user);
  const logOut = ()=>{
    signOut(auth);
    dispatch({type:"INIT"});
  }
  const NavBar = ()=>(
    <div className='sidebar-navbar'>
      <h2>Chatifyy</h2>
      <img src={user.photoURL || defaultImg} alt='profile'/>
      <h3>{user.displayName}</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
  return (
    <div className='sidebar-container'>
      <NavBar/>
      <ChatSearch/>
      <ChatList/>
    </div>
  )
}

export default Sidebar