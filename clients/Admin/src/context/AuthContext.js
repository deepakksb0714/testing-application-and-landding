import React, { createContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const siteConfig = process.env.REACT_APP_SITE_CONFIG? JSON.parse(process.env.REACT_APP_SITE_CONFIG): null;
 

// const userPool = siteConfig?  new CognitoUserPool({
//   UserPoolId: siteConfig.userPoolId,
//   ClientId: siteConfig.clientId,
// }) : null;
const userPool =  new CognitoUserPool({
  UserPoolId: "us-east-1_QAV8eCRWD",
  ClientId: "7omtjasafsp764ba68j675rb14",
});

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userDetails')) || null);
  const [tokens, setTokens] = useState(JSON.parse(sessionStorage.getItem('tokens')) || null);
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('userEmail') || null);
  const navigate = useNavigate();

   // Add useEffect to set initial state from session storage
   useEffect(() => {
    const storedUserDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const storedTokens = JSON.parse(sessionStorage.getItem('tokens'));
    const storedUserEmail = sessionStorage.getItem('userEmail');

    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
    if (storedTokens) {
      setTokens(storedTokens);
    }
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

 

  const isAuthenticated = () => {
    return userDetails !== null && tokens !== null;
  };

  const signIn = (username, password) => {
    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = { Username: username, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    sessionStorage.setItem('userEmail', username);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const username = cognitoUser.getUsername();
        const userAttributes = session.getIdToken().payload;

        setUserDetails({ username, attributes: userAttributes });
        setTokens({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        });

        sessionStorage.setItem('userDetails', JSON.stringify(cognitoUser));
        sessionStorage.setItem('tokens', JSON.stringify({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        }));
        navigate('/');
      },
      
      onFailure: (err) => console.error('Authentication failed', err),

      newPasswordRequired: function(userAttributes, requiredAttributes) {
        delete userAttributes.email_verified;
        delete userAttributes.email;
        const newPassword = prompt('Please enter a new password:');
        
        cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
          onSuccess: (session) => {
            console.log('Password changed successfully');
            alert('Password changed successfully');
          },
          onFailure: (err) => {
            console.error('Failed to change password:', err);
          }
        });
      }
    });
  };

  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    sessionStorage.removeItem('userDetails'); 
    sessionStorage.removeItem('tokens');
    setUserDetails(null);
    setTokens(null);
    navigate('/signin');
  };

  const refreshTokens = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error('Error refreshing tokens:', err);
          return;
        }
        setTokens({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken()
        });

        sessionStorage.setItem('tokens', JSON.stringify({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        }));
      });
    }
  };

  return (
    <AuthContext.Provider value={{ userDetails, tokens, signIn, refreshTokens, signOut, isAuthenticated, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
