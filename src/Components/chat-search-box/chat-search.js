import { BiSearchAlt } from "react-icons/bi";
import { useContext, useState } from "react";
import "./chat-search.css";
import { AuthContext } from "../../AuthContext";
import {
  collection,
  query as userQuery,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import defaultImg from "../../assets/default.png";
const ChatSearch = () => {
  const { currUser: user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const onSearch = (e) => {
    setLoading(true);
    setUsers([]);
    e.code === "Enter" && getChats(e.target.value);
  };
  //use firebase query to search
  const getChats = async (text) => {
    console.log(loading);
    try {
      const q = userQuery(
        collection(db, "users"),
        where("displayName", "==", text)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        if (doc.id != user.uid) {
          setUsers((prev) => {
            const newUser = {
              uid: doc.id,
              displayName: doc.data().displayName,
              email: doc.data().email,
              photoURL: doc.data().photoURL,
            };
            console.log("here", newUser);
            return [...prev, newUser];
          });
          setQuery("");
        }
      });
    } catch (error) {
      setQuery("");
      setLoading(false);
      console.log(error);
    }
  };

  const handleSelect = async (searchedUser) => {
    setUsers([]);
    //check whether chat with the searched user exists(combined id of both user and searched user)
    const combinedId = user.uid > searchedUser.uid ? user.uid + searchedUser.uid : searchedUser.uid + user.uid;
    console.log("here", combinedId)
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //if chat between user and searched user doesnt exist, create a chat between them (combined id)
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats for the user
        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId+".userInfo"] : {
             uid: searchedUser.uid,
             displayName: searchedUser.displayName,
             photoURL: searchedUser.photoURL,
          },
          [combinedId+".date"]:serverTimestamp()
        })

        //create user chats for the searched user
        await updateDoc(doc(db,"userChats", searchedUser.uid),{
          [combinedId+".userInfo"] : {
             uid: user.uid,
             displayName: user.displayName,
             photoURL: user.photoURL,
          },
          [combinedId+".date"]:serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-search-wrapper">
      <div className="chat-search_input_wrapper">
        <BiSearchAlt />
        <input
          className="chat-search_input"
          placeholder="Search"
          type="text"
          value={query}
          onKeyDown={onSearch}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      {users.map((user) => (
        <div className="searched-user" onClick={(e)=>{e.preventDefault();handleSelect(user)}}>
          <img src={user.photoURL || defaultImg} alt="profile" />
          <div className="user-content">
            <p className="name">{user.displayName}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSearch;
