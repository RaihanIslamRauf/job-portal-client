import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-phi-henna.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {

    const {signOutUser} = useAuth;
    const navigate = useNavigate();
    
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response;
        },error=>{
            console.log('error caught in interceptor', error);

            if(error.status === 401 || error.status === 403){
               console.log()
               signOutUser()
               .then(()=>{
                    console.log('logged out user');
                    navigate('/signIn');
               })
               .catch(error=> console.log(error));
            }
            return Promise.reject(error);
        })
    },[])

    return axiosInstance;
};

export default useAxiosSecure;

/**
 * axios: get, post, put/patch, delete --> easier
 * interceptor: client -------------|-----------> server
 * client <----------------|----------Server
 * in the interceptor for response == needs two function
 */