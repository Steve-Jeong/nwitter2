import { getAuth, signOut } from 'firebase/auth';
import React from 'react';

const Profile = () => {
  const auth = getAuth();
  const onLogOutClick = async () => await signOut(auth);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}
export default Profile;