import React, { useState, useEffect } from 'react';
import { UserManager, WebStorageStateStore } from 'oidc-client';



const siteConfig = process.env.REACT_APP_SITE_CONFIG? JSON.parse(process.env.REACT_APP_SITE_CONFIG): null;

let userManager;

console.log(siteConfig);
if(siteConfig){

const userManagerConfig = {
  authority: siteConfig.issuer,
  client_id: siteConfig.clientId,
  redirect_uri: `${window.location.origin}`,
  post_logout_redirect_uri: `${window.location.origin}`,
  response_type: 'code',
  scope: 'openid profile email phone',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
 
  useRefreshToken: true,

};
console.log(userManagerConfig);
 userManager = new UserManager(userManagerConfig);
}

function OidcSignIn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    userManager.getUser().then((user) => {
      if (user) {
        console.log('User:', user); // Log the user object
        setUser(user);
      }
    });
  }, []);

  const login = () => {
    userManager.signinRedirect();
  };

  const logout = () => {
    userManager.signoutRedirect();
  };

  // Function to log Cognito tokens
  const logTokens = () => {
    console.log('ID Token:', user && user.id_token);
    console.log('Access Token:', user && user.access_token);
    console.log('Refresh Token:', user && user.refresh_token);
  };

  return (
    <div>
      <h1>Change password to continue</h1>
      {user ? (
        <div>
          <p>Welcome, {user.profile.name}!</p>
          <button onClick={logout}>Logout</button>
          <button onClick={logTokens}>Log Tokens</button> {/* Button to log tokens */}
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default OidcSignIn;
