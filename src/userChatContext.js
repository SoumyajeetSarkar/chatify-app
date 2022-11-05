import { onAuthStateChanged } from "firebase/auth";
import { createContext, useReducer, useContext, useEffect, useState } from "react";

import {AuthContext} from "./AuthContext";

export const UserChatContext = createContext();

export const UserChatContextProvider = ({ children }) => {
  const {currUser} = useContext(AuthContext);
  
  const INITIAL_STATE = {
    chatID: 'null',
    user: {},
  }
  const chatReducer = (state,action)=>{
    switch(action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatID: currUser.uid > action.payload.uid ? currUser.uid + action.payload.uid : action.payload.uid + currUser.uid,
        }
      case "INIT":
        return {
          chatID: 'null',
          user: {},
        }
    default:
      return state;
    }
    
  }
  const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE);
  console.log(state);
  return (
    <UserChatContext.Provider value={{ userData:state, dispatch }}>{children}</UserChatContext.Provider>
  );
};