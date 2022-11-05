import React from "react";
import "./home.css";
import { Sidebar, ChatContainer } from "../Components";
const Home = () => {
  return (
    <div className="home-container-wrapper">
      <div className="home-container">
        <Sidebar/>
        <ChatContainer/>
      </div>
    </div>
  );
};

export default Home;
