import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import fbase from 'fbase'
import {getAuth} from 'firebase/auth'

function App() {
  const auth = getAuth();
  // console.log(auth)
  // console.log(auth.currentUser)

  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        console.log(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <div>
      {init? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing ..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
