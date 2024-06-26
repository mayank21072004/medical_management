/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Biography = ({imageURL}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageURL} alt="aboutimg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, provident earum aliquid nam tenetur accusamus eveniet. Harum iusto totam enim aut sint eaque minima non quo pariatur, adipisci aliquam id?
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, quis?</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum earum sapiente rem veniam molestiae vero, praesentium a commodi voluptatibus molestias dolor? Suscipit architecto fugiat quis ex consequuntur corrupti voluptates qui?
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, dolor!</p>
      </div>
    </div>
  )
}

export default Biography
