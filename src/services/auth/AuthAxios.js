import {NonUserAxios} from "../../common/Axios";

const isInit = false
const ACTION_URL = '/sign';

const LOGIN_USER = ACTION_URL + '/in/adver';
const LOGIN_ADMIN = ACTION_URL + '/in/admin';
const LOGOUT_USER = ACTION_URL + '/out/adver';
const LOGOUT_ADMIN = ACTION_URL + '/out/admin';
const ADMIN_REFRESH_URL = '/admin/refresh-token/1';
const USER_REFRESH_URL = '/adver/refresh-token/1';


/**
 * 유저 로그인 API
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function login(loginInfo) {
  let returnVal = null;
  if(isInit){
    return {
      email: loginInfo.email,
      role: 'NORMAL',
      name: '김용태',
      token: {
        accessToken: '3298dsfh8ds9hfsdfs',
        refreshToken: '3298dsfh8ds9hfsdfs'
      }
    };
  }
  await NonUserAxios('POST', LOGIN_USER, loginInfo)
    .then((response) => {
      const { data, statusCode } = response.data
      if (statusCode === 200) {
        returnVal = data
        localStorage.removeItem("refreshToken")
        localStorage.setItem("refreshToken", data.token.refreshToken);
      } else {
        returnVal = false;
      }
    }).catch((e) =>{
      if(e.response.data.status.code === 'C007') {
        returnVal = "disabled";
      } else {
        returnVal = false;
      }
  })
  return returnVal
}

/**
 * 사용자 로그아웃
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function logOutUser(userInfo) {
  let returnVal = null;
  if(isInit){
    return true;
  }
  await NonUserAxios('POST', LOGOUT_USER, userInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.status === 200) {
        returnVal = true;
      } else {
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 관리자 로그인
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function loginAdmin(loginInfo) {
  let returnVal = null;
  if(isInit){
    return {
      email: loginInfo.email,
      role: 'ADMIN',
      name: '김용태',
      token: {
        accessToken: '3298dsfh8ds9hfsdfs',
        refreshToken: '3298dsfh8ds9hfsdfs'
      }
    };
  }
  await NonUserAxios('POST', LOGIN_ADMIN, loginInfo)
    .then((response) => {
      const {data,status} = response
      returnVal = data.data
      console.log(returnVal.token?.refreshToken)
      if (status === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.setItem("refreshToken", returnVal.token.refreshToken);
      } else {
        returnVal = false
      }
    }).catch((e) => console.log(e))
  return returnVal
}

/**
 * 관리자 로그아웃
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function logOutAdmin(userInfo) {
  let returnVal = null;
  if(isInit){
    return true;
  }
  await NonUserAxios('POST', LOGOUT_ADMIN, userInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.status === 200) {
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal
}


/**
 * 어드민 리프레쉬 토큰 api
 * @returns {Promise<null>}
 */
export async function refreshAdmin() {
  const param = {
    accessToken: '',
    refreshToken: localStorage.getItem("refreshToken"),
  }
  if(isInit){
    return false;
  }
  let returnVal = null;
  await NonUserAxios('POST', ADMIN_REFRESH_URL, param).then((response) => {
    const {data,status} =response.data
    returnVal = response.data
    if (status === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.setItem("refreshToken", data.token.refreshToken);
    }else if(status === 401 || status === 403){
      // eslint-disable-next-line no-restricted-globals
      location.replace('/')
    }
  }).catch((e) => returnVal = false)
  return returnVal ;
}

/**
 * 사용자 리프레쉬 토큰 api
 * @returns {Promise<*|null>}
 */
export async function refresh() {
  const param = {
    accessToken: '',
    refreshToken: localStorage.getItem("refreshToken"),
  }
  let returnVal = null;
  await NonUserAxios('POST', USER_REFRESH_URL, param).then((responseUser) => {
    const {data,status} =responseUser.data
    returnVal = responseUser.data
    if (status === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.setItem("refreshToken", data.token.refreshToken);
    }else if(status === 401 || status === 403){
      // eslint-disable-next-line no-restricted-globals
      location.replace('/')
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}
