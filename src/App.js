
import './App.css';
import {LogIn , SignUp} from "./Pages";
import Home from './Pages/home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import {AuthContext} from './AuthContext';
function App() {
  const {currUser} = useContext(AuthContext);
  const ProtectedRoute = ({children})=>{
    if(!currUser){
      return <Navigate to="/logIn"/>
    } else {
      return children;
    }
  }
  return (
     <div className="app-wrapper">
      <Router>
        <Routes path="/">
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="logIn" element={<LogIn/>}/>
        <Route path='signUp' element={<SignUp/>}/>
        </Routes>
      </Router>
     </div>
  );
}

export default App;
