/* eslint-disable no-unused-vars */
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { useState } from 'react'

// we are using hree use context
export const Context = createContext({isAuthenticated: false})

const Appwrapper = () =>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user , setUser] = useState({});
  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>,
)
