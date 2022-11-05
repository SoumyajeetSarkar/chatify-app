import React, { useState } from "react";
import "./log-in.css";
import { Header } from "../Components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
const LogIn = () => {
  const navigateTo = useNavigate();
  
  const [loading, setLoading] = useState("Log In");
  const [error,setError] = useState('');
  const logInHandler = async(e) => {
    e.preventDefault();
    setLoading("loading");

    const email = e.target[0].value;
    const pass = e.target[1].value;
    console.log('here')
    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        setError(errorMessage);
      });
      navigateTo("/");
  };
  return (
    <div className="login-container-wrapper">
      <div className="header">
        <Header />
      </div>

      <div className="login-container">
        <h2>Log In</h2>
        <form onSubmit={logInHandler}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" className={loading}>
            <span>{loading}</span>
          </button>
        </form>
        {error && <p style={{color:'red' , fontSize: 'small'}}>{error}</p>}
        <h5>
          Do not have an account? <Link to="/signUp" className="link">Sign Up</Link>
        </h5>
      </div>
    </div>
  );
};

export default LogIn;
