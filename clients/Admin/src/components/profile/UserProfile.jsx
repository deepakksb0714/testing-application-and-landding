import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import Header from '../Dashboard/Header'




const UserProfile = () => {
  const [editSuccessMessage, setEditSuccessMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found');
        }
         console.log(token)
        const response = await fetch('http://localhost:3000/member_details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });
        console.log('Headers:', {
          'Content-Type': 'application/json',
          'Authorization': token,
        });
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCloseEdit = () => {
    setEditing(false);
  };

  const handleEditSuccess = () => {
    setEditing(false);
    setEditSuccessMessage('Profile updated successfully');

    // Clear the success message after 3000 milliseconds (3 seconds)
    setTimeout(() => {
      setEditSuccessMessage('');
    }, 3000);
  };

  return (
    <>
      {editing ? (
        <EditProfile
          email={userData.email}
          firstName={userData.first_name}
          lastName={userData.last_name}
          companyName={userData.company_name}
          subdomain={userData.subdomain}
          onClose={handleCloseEdit}
          onEditSuccess={handleEditSuccess}
        />
      ) : (
        <>
          {/* Display the Bootstrap alert here */}
          {editSuccessMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {editSuccessMessage}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="userProfile1" >
           
              <h2 className="text-center">My Profile</h2>
              <ul className="list-group">
                <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
                <li className="list-group-item"><strong>First Name:</strong> {userData.first_name}</li>
                <li className="list-group-item"><strong>Last Name:</strong> {userData.last_name}</li>
                <li className="list-group-item"><strong>Company Name:</strong> {userData.company_name}</li>
                <li className="list-group-item"><strong>Subdomain:</strong> {userData.subdomain}</li>
              </ul>
              <div className="text-center mt-3">
            <button
              type="button"
              className="btn"
              onClick={handleEditClick} style={{marginLeft:'10%',width:'20%', marginTop:'20px' ,backgroundColor: 'rgb(250, 70, 22)',color:'#FFFFFF'}}
            >
              Edit
            </button>
         
          </div>
            </div>
            
          
        </>
      )}
    </>
  );
};

export default UserProfile;
