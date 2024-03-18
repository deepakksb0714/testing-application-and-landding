import React, { useState } from 'react';
import UserServices from './UserServices';

const UserCreate = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { createUser } = UserServices();

  const handleCreateUser = async () => {
    try {
      const userData = { email };
      const response = await createUser(userData);
      setSuccessMessage('User created successfully');
      console.log(response);
    } catch (error) {
      setErrorMessage('Error creating user');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Create User</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreateUser}>Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
