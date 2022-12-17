import React,{ useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

function Navbar() {

  const {currentUser} = useContext(AuthContext)
  console.log("current=" + currentUser.username);
  return (
    <div className='navbar'>
      <span className="logo">weChat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>LogOut</button>
      </div>
    </div>
  )
}

export default Navbar