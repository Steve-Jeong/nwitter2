import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";



const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')


  const onChange = (e) => {
    const { target: { name, value } } = e
    if (name === 'email') {
      setEmail(value)
      console.log(value)
    }
    if (name === 'password') {
      setPassword(value)
      console.log(value)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (newAccount) {
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
          setError(error.code + ' ' + error.message);
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
          setError(error.code + ' ' + error.message);
        });
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e) => {
    const { target: { name } } = e;
    const auth = getAuth();
    let provider=undefined;
    if(name === 'google') {
      provider = new GoogleAuthProvider()
      console.log(provider)
    } 
    if(name === 'github') {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data)
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
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create New Account"}</span>
      <div>
        <button onClick={onSocialClick} name='google'>Continue with Google</button>
        <button onClick={onSocialClick} name='github'>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth;