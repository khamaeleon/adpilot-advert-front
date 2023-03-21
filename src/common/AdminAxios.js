import axios from "axios";
import {ADMIN_SERVER} from "../constants/GlobalConst";
import {refreshAdmin} from "../services/AuthAxios";

export const adminAxios = axios.create({
  baseURL: ADMIN_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 401 && status <= 500;
  },
});

adminAxios.interceptors.request.use(
  async (config) => {
    let token ='';
    const accessToken = localStorage.getItem("accessToken");

    if(accessToken !==''){
      token = accessToken
    }
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  async (error) => {
    return Promise.reject(error)
  }
)

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

adminAxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const { config, response: {status}} = error;
    const originalRequest = config;


    if(status === 401) {
      console.log("expire")
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(adminAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing ) {
        isTokenRefreshing = true;
        refreshAdmin().then(response =>{
          if(response){
            onTokenRefreshed(localStorage.getItem("accessToken"));
          }else{
            refreshSubscribers = [];
            isTokenRefreshing = false;
            // eslint-disable-next-line no-restricted-globals
            location.replace('/login')
          }
        });
      }

      return retryOriginalRequest;
    }
    return Promise.reject(error)
  }
)
