import { useState } from 'react';
import AppRouter from 'components/Router';
import fbase from 'fbase'
import {getAuth} from 'firebase/auth'

function App() {
  const auth = getAuth();
  console.log(auth)
  console.log(auth.currentUser)

  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
