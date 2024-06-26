/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';

const MessageForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');


  const handleMessage = async (e) => {
    // console.log('Message sent')
    e.preventDefault()
    // console.log('Message sent')
    try{
      await axios.post(
        // console.log('Message senting'),
        "http://localhost:4000/api/v1/message/send",
        {
          firstName,
          lastName,
          email,
          phone,
          message
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        // console.log('Message again senting')
      )
      .then((res) => {
        console.log("i am inside success")
        toast.success(res.data.message);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      });
    } catch (error) {
      // console.log('inside error')
      // console.log('Message not sent')
      console.log(error.response.data.message)
      // console.log(error)
      // console.log(error.response.error)
      // console.log(error)
      toast.error(error.response.data.message);
    }
    
  }


  return (
    <div className="container form-component message-form">
      <h2>Send us a message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
          <input type="text" placeholder='last Name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
          
        </div>
        <div>
          <input type="text" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="number" placeholder='phone' value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
          
        </div>
        <textarea rows={7} placeholder='Message' value={message} onChange={(e)=>{setMessage(e.target.value)}} ></textarea>
        <div style={{justifyContent: "center" , alignItems:"center"}}>
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
