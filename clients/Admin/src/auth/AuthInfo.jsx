// UserInfo.js
import React, { useContext } from 'react';
import { AuthContext } from '.././context/AuthContext';

const UserInfo = () => {
  const { userDetails, tokens, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h2>User Info</h2>
      {userDetails && (
        <div>
          <h3>User Details</h3>
          <p>Username: {userDetails.username}</p>
         
        </div>
      )}
      {tokens && (
        <div>
            <div>
      {isAuthenticated() ? (
        <p>User is authenticated. Render authenticated content here.</p>
      ) : (
        <p>User is not authenticated. Render login/signup form or other content here.</p>
      )}
    </div>
          <h3>Tokens</h3>
          <p>ID Token: {tokens.idToken}</p>
          <p>Access Token: {tokens.accessToken}</p>
          <p>Refresh Token: {tokens.refreshToken}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
