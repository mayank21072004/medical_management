/* eslint-disable no-unused-vars */
import React, { useContext,useEffect } from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddNewDoctor from './components/AddNewDoctor'
import AddNewAdmin from './components/AddNewAdmin'
import Messages from './components/Messages'
import Sidebar from './components/Sidebar'
import Doctors from './components/Doctors'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main'
import axios from 'axios'
// import app css
import './App.css'
const App = () => {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async ()=>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me", {withCredentials: true});
        console.log("user fetched")
        setIsAuthenticated(true);
        setUser(response.data.user);
      }catch(err){
        console.log("user not fetched")
        setIsAuthenticated(false);
        console.log(err.response.data.message)
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
    <Router>
    <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position='top-center' draggable="touch"/>
    </Router>
    </>
  )
}

export default App
