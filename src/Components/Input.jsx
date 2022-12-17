import React, { useState, useContext } from 'react'
import { IoSend } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsCameraFill } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, Timestamp,arrayUnion, updateDoc, serverTimestamp } from "firebase/firestore"; 
import { storage,db } from "../firebase.js";

function Input() {
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if(img){
      console.log("Img is present");
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderID: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
          }),
        });
    });
  });
  } else{
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(), //cant user server timestamp(morte accurate) with array union
        }),
    });
    }

    await updateDoc(doc(db,"userChat",currentUser.uid),{
      [data.chatID+".lastMessage"]:{
        text
      },
      [data.chatID+".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db,"userChat",data.user.uid),{
      [data.chatID+".lastMessage"]:{
        text
      },
      [data.chatID+".date"]: serverTimestamp(),
    })

    setText("");
    setImg(null);
  };
  return (
    <div className='input_page'>
      <input type="text" placeholder='Type something..' onChange={e=>setText(e.target.value)} value={text} />

      <div className='inputIcons'>
      <input style={{display:"none"}} type="file" id="inputfile" onChange={e=>setImg(e.target.files[0])}  />

                <label htmlFor="inputfile">

        <MdOutlineAttachFile className='inputIcon'/>
        </label>
        <BsCameraFill className='inputIcon'/>
        <button className="send" onClick={handleSend}><IoSend className='inputIcon cam'/></button>
      </div>
    </div>
  )
}

export default Input