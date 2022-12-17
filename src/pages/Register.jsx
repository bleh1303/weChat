import React from 'react';
import add from "../images/profile.png";
import { auth, storage,db } from "../firebase.js";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from"firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

function Register() {

  const [err,setErr]=useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(res.user, {
              displayName:username,
              photoURL:downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid : res.user.uid,
              displayName:username,
              email,
              photoURL:downloadURL,
            });

            await setDoc(doc(db, "userChat", res.user.uid), {});
            navigate("/");
          });
        }
      );
    }  
    catch(err) {
      setErr(true);
    }
    
  }

  return (
    <section id='formPage'>
        <div className='formWrapper'>
            <h1 className='logo'>weChat</h1>
            <h7 className='title'>Register</h7>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username'/>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}} type="file" id="file" />
                <label htmlFor="file">
                <img className="label"
                src={add} alt=""/>
                <span>Add a profile pic</span>
                </label>
                <button>Sign Up</button>
                {err && <h6>Something went wrong.</h6>}
            </form>
            <p>Do you already have an account? <Link to="/login">Login</Link></p>
        </div>
    </section>
  )
}

export default Register