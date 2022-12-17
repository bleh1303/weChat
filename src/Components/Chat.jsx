import React, { useContext } from 'react'
import { HiVideoCamera } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";
import { HiDotsHorizontal } from "react-icons/hi";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

function Chat() {
  
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data? data.user.displayName : "weChat"}</span>
        <div className="chatIcons">
          <HiVideoCamera className='chatIcon'/>
          <HiUserAdd className='chatIcon'/>
          <HiDotsHorizontal className='chatIcon'/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat