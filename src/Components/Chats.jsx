import React, { useState, useContext, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Chats() {

  const [chats, setChats] =useState([]);
  const {currentUser} = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);
  const ourUid = currentUser.uid;
  const theirUid = data.user.uid;
  useEffect(() => {
    const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
            setChats(doc.data());
        });
      
          return () => {
            unsub();
          };
    };
    currentUser.uid&&getChats(); //currentUser.uid&&getChats()
    console.log(Object.entries(chats));
  }, [currentUser.uid]);

  const handleSelect = ( user ) => {
    dispatch({type:"CHANGE_USER", payload:user })
  }

  return (
    <div className='chats'>
      { Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat=>(

        <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} >
        <img src={chat[1].userInfo.photoURL} alt="" /> 
        <div className='userChatInfo'>
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p> 
        </div>
      </div>
      ) ) }
    </div>
  )
}

export default Chats