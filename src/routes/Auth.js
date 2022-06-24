import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";



const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(false)


  const onChange = (e) => {
    const {target : {name, value}} = e
    if(name === 'email') {
      setEmail(value)
      console.log(value)
    }
    if(name === 'password') {
      setPassword(value)
      console.log(value)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if(newAccount) {
      // create account
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      // log in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name='email' 
          type='email' 
          placeholder='Email' 
          required 
          value={email}
          onChange={onChange}
        />
        <input 
          name='password' 
          type='password' 
          placeholder='Password' 
          required 
          value={password}
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth;