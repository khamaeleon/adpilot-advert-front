import axios from "axios";
import {ADVER_SERVER} from "../constants/GlobalConst";
import {refresh} from "../services/auth/AuthAxios";
import {tokenResultAtom} from "../pages/login/entity/Common";
import store from "../store";
import rateLimit from 'axios-rate-limit';

export const adverAxios = rateLimit(axios.create({
  baseURL: ADVER_SERVER,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  validateStatus: function (status) {
    return status !== 403 && status !==401 && status <= 500;
  }
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 }
);
adverAxios.interceptors.request.use(
  async (config) => {
    const tokenAtom =store.get(tokenResultAtom)
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

    if(status === 403 || status === 401) {
      console.log(config)
      if(!config ){
        adverAxios.getMaxRPS()
        return Promise.reject(error)
      }
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
          const {data,responseCode} =response
          if (responseCode.statusCode === 200) {
              store.set(tokenResultAtom, {
                id: data.id,
                username: data.username,
                role: data.role,
                name: data.name,
                accessToken: data.token.accessToken
              })
              onTokenRefreshed(data.token.accessToken);
          } else if (responseCode.statusCode === 401 || responseCode.statusCode === 403) {
              refreshSubscribers = [];
              isTokenRefreshing = false;
              // eslint-disable-next-line no-restricted-globals
              location.replace('/')
          } else {
            return Promise.reject(error)
          }
        })
      }
      return retryOriginalRequest;
    }

    return Promise.reject(error)

  }
)
