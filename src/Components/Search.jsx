import React,{ useState, useContext } from 'react'
import { IoSearch } from "react-icons/io5";
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, serverTimestamp,doc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

function Search() {
  const [username,setUsername] =useState("");
  const [user,setUser] =useState(null);
  const [err,setErr] =useState(false);

  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
     where("displayName", "==", username
     ))
          const querySnapshot = await getDocs(q);
          if(querySnapshot!=null) {
            setUser(null);
            setErr(true);} 
          querySnapshot.forEach((doc) => {
          setErr(false);
          setUser(doc.data())
      });

  }


  const emptySearch = (e) => {
    setUser(null);
    setErr(false);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
    e.code === "Backspace" && emptySearch();
  };

  const handleSelect = async () => {

    const combinedID = 
    currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid;
    
    try{
      //check whether chats btwn them exists
      const res= await getDoc(doc(db,"chats",combinedID));
      if(!res.exists())
      {
        await setDoc(doc(db,"chats",combinedID),{messages:[]});
        
        await updateDoc(doc(db,"userChat", currentUser.uid),{
          [combinedID + ".userInfo"]: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp()
        });
        
        await updateDoc(doc(db,"userChat", user.uid),{
          [combinedID + ".userInfo"]: {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedID + ".date"]: serverTimestamp()
        });

    }} catch(err) {}
  
    setUser(null);
    setUsername("");
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <IoSearch className='searchIcon'/>
        <input 
        type="text" 
        placeholder='Find a user' 
        onKeyDown={ handleKey } 
        onChange={(e) => setUsername(e.target.value)}
        value={username} 
        />
      </div>
      {err && <span className='searchError'>User not found</span>}
      {user && <div className='userChat' onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search