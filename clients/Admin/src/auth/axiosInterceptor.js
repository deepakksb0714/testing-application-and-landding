import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '.././context/AuthContext';

// Create a custom Axios instance
const axiosInstance = axios.create();

// Create a custom hook to handle token injection
const useAuthAxios = () => {
  const { tokens } = useContext(AuthContext);

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = tokens.idToken;
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAuthAxios;