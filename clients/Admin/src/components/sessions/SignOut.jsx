import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const SignOut = () => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
