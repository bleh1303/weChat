import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [err,setErr]=useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    }  
    catch(err) {
      setErr(true);
    }
    
  }

  
  return (
    <section id='formPage'>
        <div className='formWrapper'>
            <h1 className='logo'>weChat</h1>
            <h7 className='title'>Login</h7>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password'/>
                <button>Sign In</button>
                {err && <h6>Something went wrong.</h6>}
            </form>
            <p>Do you not have an account? <Link to="/register">Register</Link></p>
        </div>
    </section>
  )
}

export default Login