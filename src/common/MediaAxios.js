import axios from "axios";
import {MEDIA_SERVER} from "../constants/GlobalConst";
import {refresh} from "../services/AuthAxios";

export const mediaAxios = axios.create({
  baseURL: MEDIA_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 401 && status <= 500;
  },
});

mediaAxios.interceptors.request.use(
  async (config) => {
    let token=''
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

mediaAxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const { config, response: {status}} = error;
    const originalRequest = config;

    if(status === 401) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(mediaAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing ) {
        isTokenRefreshing = true;
        refresh().then(response =>{
          if(response){
            console.log(response)
            onTokenRefreshed(localStorage.getItem("accessToken"));
          }else{
            refreshSubscribers = [];
            isTokenRefreshing = false;
            localStorage.removeItem("userId")
            // eslint-disable-next-line no-restricted-globals
            location.replace('/login')
          }
        })
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error)
  }
)
