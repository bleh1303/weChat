import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

function Message({msg}) {
  
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  
  const ref =useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({ behavior:"smooth"});
  }, [msg])
  return (
    <div ref={ref} className={`message ${msg.senderID === currentUser.uid && "owner"}`}> 
    
      <div className="messageInfo">
        <img src={msg.senderID === currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt="" />
        <span className="time">just now</span>
      </div>

      <div className="messageContent">
        <p>
          {msg.text}
        </p>
        {msg.img && <img src={msg.img} alt="" />}
      </div>

    </div>
  )
}

export default Message