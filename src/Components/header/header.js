import React from 'react'
import "./header.css";
import myPhoto from "../../assets/profile.jpg";
import {BiDownvote} from "react-icons/bi";
import {FaRegHandPointer} from 'react-icons/fa';
import {AiFillLinkedin, AiFillGithub} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-title'>
        <h2>Chatify</h2>
        <p>by, Soumyajeet Sarkar <img className='my-photo' src={myPhoto}></img></p>
      </div>
      <div className='header-about'><p>I made this chat app in order to practice real time database interaction with a web app. I used Firebase as the database for storing and fetching user information and chat information. I also used React Icons for the UI.</p></div>
      <div className='header-footer'>
        <a href='https://soumyajeet-sarkar-portfolio.netlify.app'>Check out my portfolio <FaRegHandPointer color='white' size={20}/></a>
        <p><BiDownvote size={20}/>Follow me on Social Media<BiDownvote size={20}/></p>
        <div className='header-socials'>
          <AiFillGithub href='https://github.com/heisenbrgwhite'/>
          <AiFillLinkedin href='https://www.linkedin.com/in/soumyajeet-sarkar-0aa39b217/'/>
          <BsTwitter href='https://twitter.com/SoumyajeetSark4'/>
        </div>
      </div>
      </div>
  )
}

export default Header