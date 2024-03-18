import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FormStyle from './FormStyle';


const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn(username, password);
  };
  return (
 
    <FormStyle title="Sign in to continue" subtitle = "" >
            <div className="card-body">
             
                <div className="form-group">
                  <label>Username:</label>
                  <input
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="form-control form-control-sm"
                  placeholder="Username"
                  />
                  <div className="form-group" style={{marginTop:"15px"}}>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-sm"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                />
              </div>
                  
                </div>
                {/* ... rest of the form elements ... */}
                <div className="text-center mt-3" >
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: 'rgb(250, 70, 22)',
                      color: 'white',marginTop:"15px"
                    }}
                    id="send-confirmation-btn"
                    onClick={handleSignIn} 
                  >
                    Sign In
                  </button>
                </div>
              
            </div>
            </FormStyle> 
  );
};


export default SignIn;
