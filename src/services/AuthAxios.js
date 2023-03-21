import {NonUserAxios} from "../common/Axios";

const ACTION_URL = '/sign';

const LOGIN_USER = ACTION_URL + '/in/media';
const LOGIN_ADMIN = ACTION_URL + '/in/admin';
const LOGOUT_USER = ACTION_URL + '/out/media';
const LOGOUT_ADMIN = ACTION_URL + '/out/admin';
const ADMIN_REFRESH_URL = '/refresh-token/admin';
const USER_REFRESH_URL = '/refresh-token/media';

/**
 * 유저 로그인 API
 * @param loginInfo
 * @returns {Promise<null>}
 */
export async function login(loginInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGIN_USER, loginInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
        localStorage.setItem("accessToken", returnVal.data.token.accessToken);
        localStorage.setItem("role", returnVal.data.role);
        localStorage.setItem("id", returnVal.data.id);
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal
}

/**
 * 사용자 로그아웃
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function logOutUser(userInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGOUT_USER, userInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
        returnVal = true
      } else {
        returnVal = false
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
  await NonUserAxios('POST', LOGIN_ADMIN, loginInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
        localStorage.setItem("accessToken", returnVal.data.token.accessToken);
        localStorage.setItem("role", returnVal.data.role);
        localStorage.setItem("id", returnVal.data.email);
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal
}

/**
 * 관리자 로그아웃
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function logOutAdmin(userInfo) {
  let returnVal = null;
  await NonUserAxios('POST', LOGOUT_ADMIN, userInfo)
    .then((response) => {
      returnVal = response.data
      if (returnVal.responseCode.statusCode === 200) {
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
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
  let returnVal = null;
  await NonUserAxios('POST', ADMIN_REFRESH_URL, param).then((response) => {
    returnVal = response.data
    if (returnVal.responseCode.statusCode === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("id")
      localStorage.removeItem("role")
      localStorage.setItem("refreshToken", returnVal.data.token.refreshToken);
      localStorage.setItem("accessToken", returnVal.data.token.accessToken);
      localStorage.setItem("role", returnVal.data.role);
      localStorage.setItem("id", returnVal.data.email);
      returnVal = true
    } else {
      returnVal = false
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 사용자 리프레쉬 토큰 api
 * @returns {Promise<*|null>}
 */
export async function refresh() {
  const param = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
  return await NonUserAxios('POST', USER_REFRESH_URL, param).then((responseUser) => {
    const {responseCode,data,message} = responseUser
    if (responseCode.statusCode === 200) {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("role")
      localStorage.removeItem("id")
      localStorage.setItem("refreshToken", data.token.refreshToken);
      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      return true
    } else {
      console.log(message)
    }
  }).catch((e) => false)
}
