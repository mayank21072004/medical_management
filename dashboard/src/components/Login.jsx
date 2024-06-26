/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'


const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          confirmPassword,
          role: "Admin",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      navigateTo("/");
      setIsAuthenticated(true);
    } catch (err) {
      toast.error(err.response.data.message);
      // console.log(err);
    }
  };

  // if(isAuthenticated){
  //   navigateTo("/");
  // }
  return (
    isAuthenticated ? <Dashboard/> :

    <div className="container form-component">
      <img src="/logo.png" alt="logo" className='logo' />
      <h1 className='"form-title'>WelCome To ZeeCare</h1>
      <p>Only admins are allowed to access</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="ConfirmPassword"
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>



  )
}

export default Login
