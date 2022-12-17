import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { ChatContext } from '../context/ChatContext.js';
import { db } from '../firebase.js';
import Message from './Message.jsx';

function Messages() {

  const [messages,setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && console.log(doc.data().messages)
      doc.exists() && setMessages(doc.data().messages)
    }) 
    return()=>{
      unSub();
    }
  },[data.chatID])
  return (
    <div className='messages'>
      {messages.map((m) => (
        <div key={m.id}>
        <Message msg={m} />
        </div>
      ))}
    </div>
  )
}

export default Messages