/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <>
    <Hero title={"Welcome to ZeeCare Medical Institute | Your Trusted Healthcare provider"} imageUrl={"/hero.png"}/>
    <Biography imageURL={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    </>
  )
}

export default Home
