import axios from "axios";
import {ADVER_SERVER} from "../constants/GlobalConst";
import {refresh} from "../services/auth/AuthAxios";
import {tokenResultAtom} from "../pages/login/entity/Common";
import store from "../store";

export const adverAxios = axios.create({
  baseURL: ADVER_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 403 && status <= 500;
  },
});
adverAxios.interceptors.request.use(
  async (config) => {
    const tokenAtom =store.get(tokenResultAtom)
    console.log(tokenAtom)
    config.headers.Authorization = `Bearer ${tokenAtom.accessToken}`;
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

adverAxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const { config, response: {status}} = error;
    const originalRequest = config;

    if(status === 403) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          refreshSubscribers = [];
          isTokenRefreshing = false;
          resolve(adverAxios(originalRequest));
        });
      });
      if (!isTokenRefreshing ) {
        isTokenRefreshing = true;
        await refresh().then(response =>{
          if(response){
            if (response) {
              store.set(tokenResultAtom, {
                id: response.id,
                username: response.username,
                role: response.role,
                name: response.name,
                accessToken: response.token.accessToken,
                refreshToken: response.token.refreshToken
              })
              onTokenRefreshed(response.token.accessToken);
            } else {
              refreshSubscribers = [];
              isTokenRefreshing = false;
              // eslint-disable-next-line no-restricted-globals
              location.replace('/')
            }
          }
        })
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error)
  }
)
