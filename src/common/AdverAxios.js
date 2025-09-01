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

let consecutive403Errors = 0; // 변수를 추가하여 연속적인 403 또는 401 에러의 개수를 기록합니다.
const maxConsecutive403Errors = 10; // 에러 최대 임계값을 설정합니다.

adverAxios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const { config, response: {status}} = error;
    const originalRequest = config;

    if(status === 403 || status === 401) {
      consecutive403Errors++;
      // console.log("에러요청 임계치 테스트", consecutive403Errors)
      if(!config ){
        adverAxios.getMaxRPS()
        return Promise.reject(error)
      }
      if(consecutive403Errors >= maxConsecutive403Errors) {
        // console.log("에러요청 임계치 관리자 문의.");
        // eslint-disable-next-line no-restricted-globals
        location.replace('/404.js')
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
          if(!response) {
            refreshSubscribers = [];
            isTokenRefreshing = false;
            // eslint-disable-next-line no-restricted-globals
            location.replace('/')
          }
          const { data, statusCode } = response;
          if (statusCode === 200) {
              store.set(tokenResultAtom, {
                id: data.id,
                username: data.username,
                role: data.role,
                name: data.name,
                accessToken: data.token.accessToken
              })
              onTokenRefreshed(data.token.accessToken);
          } else {
            refreshSubscribers = [];
            isTokenRefreshing = false;
            return Promise.reject(error)
          }
        })
      }
      return retryOriginalRequest;
    }

    return Promise.reject(error)

  }
)
