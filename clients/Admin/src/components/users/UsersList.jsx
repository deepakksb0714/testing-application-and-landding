import React, { useState, useEffect } from 'react';
import UserServices from './UserServices';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const { getUsers } = UserServices();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
       
        console.log(usersData);
      } catch (error) {
        // Handle error
        console.error('Error fetching users:', error);
       
      }
    };

    fetchUsersData();
  }, []);


  return (
    <div className="animated fadeIn">
      <div className="row mb-3">
        <div className="col-sm-12"></div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex">
              <span><i className="fa fa-align-justify"></i> All Users</span>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Created Date</th>
                    <th>Modified Date</th>
                    <th>Verified</th>
                    <th>Status</th>
                    <th>Enabled</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.userId}>
                      <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                      <td>{new Date(user.created).toLocaleDateString()}</td>
                      <td>{new Date(user.modified).toLocaleDateString()}</td>
                      <td>{user.verified.toString()}</td>
                      <td>{user.status}</td>
                      <td>{user.enabled.toString()}</td>
                      <td><span className={`badge badge-${user.enabled ? 'success' : 'danger'}`}>{user.enabled ? 'Active' : 'Inactive'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
