/* eslint-disable no-unused-vars */
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Aboutus from './pages/Aboutus'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import { Context } from './main'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Footer from './components/Footer'

const App = () => {
    const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);
    useEffect(() => {
      const fetchUser = async ()=>{
        try{
          const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", {withCredentials: true});
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
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/appointment' element={<Appointment/>} />
          <Route path='/about' element={<Aboutus/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position='top-center' draggable="mouse" />
      </Router>
    </>
  )
}

export default App
