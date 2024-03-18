import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const siteConfig = process.env.REACT_APP_SITE_CONFIG? JSON.parse(process.env.REACT_APP_SITE_CONFIG) : null;
const apiUrl = siteConfig ? `${siteConfig.apiUrl}/users` : `https://api.udveg.com/users`;



const UserServices = () => {
 
  const { tokens, isAuthenticated } = useContext(AuthContext);

  const token = tokens ? 'Bearer' + ' ' + tokens.idToken : "dumyTocken";

  const getUsers = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post(apiUrl, userData, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  return { getUsers, createUser };
};

export default UserServices;
