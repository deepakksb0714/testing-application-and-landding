// app/javascript/components/EditProfile.jsx
import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = (props) => {
  const {
    email: initialEmail,
    firstName: initialFirstName,
    lastName: initialLastName,
    companyName: initialCompanyName,
    subdomain: initialSubdomain,
    onClose,
  } = props;

  const [email, setEmail] = useState(initialEmail);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [subdomain, setSubdomain] = useState(initialSubdomain);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPasswordNotMatch, setCurrentPasswordNotMatch] = useState('')
 


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSubdomainChange = (e) => {
    setSubdomain(e.target.value);
  };


  
  const handleSave = async (e) => {
    e.preventDefault();
  
    if (password !== passwordConfirmation) {
      setPasswordError("Passwords don't match");
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      console.log('Data to be sent:', { email, password, passwordConfirmation, firstName, lastName, companyName, subdomain });
      const response = await fetch('http://localhost:3000/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ user: { email, password, password_confirmation: passwordConfirmation, first_name: firstName, last_name: lastName, company_name: companyName, subdomain, current_password: currentPassword } }),
      });
  
      if (response.ok) {
        props.onEditSuccess();
        console.log('Profile updated successfully');
        // Reset the current password error state here
        setCurrentPasswordNotMatch('');
      } else {
        const data = await response.json();
        console.log('Invalid Current Password');
        // Set the current password error state here if needed
        setCurrentPasswordNotMatch('Invalid current password');
      }
    } catch (error) {
      console.log('Invalid Current Password');
      setCurrentPasswordNotMatch('Invalid current password');
    }
  };
  
  return (
    <>
    
    <div className="container11" >
    <div style={{backgroundColor:'#FFFFFF', paddingTop:'20px',paddingBottom:'200px', boxShadow:'2px 35px 50px  rgb(250, 70, 22)'}}>
    <h2 className="Form-1">Edit Profile</h2>
          <div style={{textAlign:'center',width:'50%',marginLeft:'25%',marginTop:'20px'}}><label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <form>
            
            <div className="form-group2">
              
              <label>First Name:</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Company Name:</label>
              <input
                type="text"
                className="form-control"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <label>Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Password"
                      autoComplete="new-password"
                      required
                    />
                    <label>Current Password:</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="form-control"
                      placeholder="Cuurent Password"
                      autoComplete="new-password"
                      required
                    />
                    {currentPasswordNotMatch && <div >{currentPasswordNotMatch}</div>}
            </div>
            
            <div className="form-group1">
              <label>Last Name:</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Subdomain:</label>
              <input
                type="text"
                className="form-control"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
              />
              <label>Password Confirmation:</label>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  placeholder="Password Confirmation"
                  autoComplete="new-password"
                  required
                />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
            <br />
          <br />
          <br />
          
          
          </form>
         
          </div>
          <div style={{textAlign:'center',backgroundColor:'#FFFFFF'}}>
          <button
            type="button"
            className="btn"
            onClick={handleSave} style={{width:'20%',marginBottom:'20px',backgroundColor: 'rgb(250, 70, 22)',color:'#FFFFFF'}}
           >
            Save
          </button>
          <button
            type="button"
            className="btn"
            onClick={onClose} style={{marginLeft:'10%',width:'20%',marginBottom:'20px',backgroundColor: 'rgb(250, 70, 22)',color:'#FFFFFF'}}
          >
            Cancel
           </button>
          </div>
      </div>
    
       
  
  </>
  );
 
};

export default EditProfile;
