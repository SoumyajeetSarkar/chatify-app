import React from "react";
import "./sign-up.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Header } from "../Components";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import defaultImg from "../assets/default.png";
const SignUp = () => {
  const navigateTo = useNavigate();
  const [passError, setPassError] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState("");
  const signupHandler = async (e) => {
    e.preventDefault();
    setError("");
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirm_password = e.target[3].value;
    const imageFile = e.target[4].files[0] || null;
    var downloadURL = null;
    if (password !== confirm_password || password.length < 8) {
      setPassError(true);
      e.target[2].value = null;
      e.target[3].value = null;
    } else {
      setPassError(false);
    }

    if (!passError) {
      //console.log({ name: username, userEmail: email, pass: password });

      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        //upload profile picture and get url
        if(imageFile!=null){
          try {
            const storageRef = ref(storage, username);
        await uploadBytesResumable(storageRef, imageFile).then((snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(`'Upload is '${progress}'% done'`);
          console.log("Upload is " + progress + "% done");

          downloadURL = getDownloadURL(storageRef);
        })
          } catch (error) {
            setError(error);
            console.log(error);
            setSuccess(false);
          }
        }
        
              //update user profile
              await updateProfile(res.user, {
                displayName: username,
                photoURL: downloadURL || 'https://firebasestorage.googleapis.com/v0/b/chatifyy-e84dd.appspot.com/o/testuser1?alt=media&token=e6a1612f-de7e-40ef-80ae-a12eed4b9ca6',
              });
              // // Add a new document(user) in collection "users"
              const data = {
                displayName: username,
                photoURL: downloadURL || 'https://firebasestorage.googleapis.com/v0/b/chatifyy-e84dd.appspot.com/o/testuser1?alt=media&token=e6a1612f-de7e-40ef-80ae-a12eed4b9ca6',
                email: email,
              };
              await setDoc(doc(db, "users", res.user.uid), data);
              //create user chats for the user
              await setDoc(doc(db, "userChats", res.user.uid), {});

              //add myself as default chat friend of every user
              const devId='GhQI6WvriQfkPuZZfOZUsd18lhQ2';
              const combinedId = res.user.uid > devId ? res.user.uid + devId : devId + res.user.uid;
              await setDoc(doc(db, "chats", combinedId), { messages: [] });
              await updateDoc(doc(db, "userChats", res.user.uid), {
                [combinedId + ".userInfo"]: {
                  uid: devId,
                  displayName: 'Sarkar Soumyajeet',
                  photoURL: 'https://firebasestorage.googleapis.com/v0/b/chatifyy-e84dd.appspot.com/o/Sarkar%20Soumyajeet?alt=media&token=0b7b1c81-fc77-45c3-91b3-cbdcc2156be7',
                },
                [combinedId + ".date"]: serverTimestamp(),
              });

              //add new user to my chats by default
              await updateDoc(doc(db, "userChats", devId), {
                [combinedId + ".userInfo"]: {
                  uid: res.user.uid,
                  displayName: res.user.displayName,
                  photoURL: res.user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
              });
              setSuccess(true);
              navigateTo("/");
            // } catch (error) {
            //   setError(error);
            //   console.log(error);
            //   setSuccess(false);
            // }


        console.log(res.user);
        // ...
      } catch (err) {
        setError(err);
        console.log(err);
        setSuccess(false);
        // ..
      }
    }
  };

  return (
    <div className="signup-container-wrapper">
      <div className="header">
        <Header />
      </div>

      <div className="signup-container">
        <h2>SignUp</h2>
        <form onSubmit={signupHandler}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input
            type="password"
            placeholder="Password"
            className={passError ? "error" : ""}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={passError ? "error" : ""}
          />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <MdAddPhotoAlternate size={40} color="lightblue" />
            <p>{progress.length > 0 ? progress : "Add profile pic"}</p>
          </label>

          {success ? (
            <span style={{ color: "green" }}> Registered </span>
          ) : (
            <button type="submit">
              <span>Register</span>
            </button>
          )}

          {passError ? (
            <p style={{ color: "red", fontSize: "small" }}>
              Password should be 8 characters long and same as 'Confirm
              Password'. Try again
            </p>
          ) : (
            ""
          )}
          {error.length > 0 ? (
            <p
              style={{
                color: "red",
                fontSize: "small",
                margin: "0",
                padding: "0",
              }}
            >
              {error}
            </p>
          ) : (
            ""
          )}
        </form>
        <h5 style={{ margin: "0", padding: "0" }}>
          Already have an account?{" "}
          <Link to="/logIn" className="link">
            Log In
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
