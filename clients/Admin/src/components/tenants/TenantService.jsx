import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';

const apiUrl = `https://api.udveg.com/tenants`;
console.log(apiUrl);

const TenantService = () => {
  const { tokens,isAuthenticated } = useContext(AuthContext);
  console.log(tokens)
  const token = tokens ? 'Bearer' + ' ' + tokens.idToken : "dumyTocken";
  console.log(token);
  const getTenants = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: token
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tenants:', error);
      throw error;
    }
  };

  return { getTenants };
};

export default TenantService;
