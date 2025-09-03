import {AdminAxios, AdverAxios, AxiosFile} from "../../common/Axios";
import {responseFormatMessage} from "../../common/StringUtils";
const isInit = false;

const ACTION_URL = '/user';
const USER_MANAGE_URL ='/adver/user'
const SLASH = '/';

const USER_LIST = USER_MANAGE_URL+'/list'
const USER_INFO = USER_MANAGE_URL+'/uuid'
const MY_PAGE_INFO =ACTION_URL+'/uuid'
const USER_KEYWORD_SEARCH = USER_MANAGE_URL + '/find/by-adver'
const BY_USER_INFO = ACTION_URL+'/username'

const TERMS_INFO = '/policy/latest-terms'
const SIGNUP_URL = ACTION_URL + '/sign-up'
const VALID_USERID = ACTION_URL + '/verify/username'
const FIND_USERID = ACTION_URL + '/find/my-id'
const CHANGE_PASSWORD = ACTION_URL + '/find/my-password'
const UPLOAD_URL = ACTION_URL + '/image' + SLASH;

/**
 * 사용자 리스트 가져오기 api
 * @param userParams
 * @returns {Promise<null>}
 */
export async function selUserList(userParams) {
  let returnVal = null;
  await AdminAxios('POST', USER_LIST, userParams)
    .then((response) => {
      const {data, statusCode} = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 사용자 단건 조회 api
 * @param userId
 * @returns {Promise<null>}
 */
export async function selUserInfo(id) {
  let returnVal = null;
  if(isInit){
    return {
      "id": "7461c622-aab6-4179-b167-1ce664b16697",
      "hostType": "INDEPENDENT_MALL",
      "status": "NORMAL",
      "username": "adpilot_advert",
      "managerName": "김용태",
      "managerPhone": "0101112222",
      "managerEmail": "nate@nate.com",
      "userCompanyProfile": {
        "id": 1,
        "companyName": "애드파일럿",
        "businessNumber": "12345678",
        "ceoName": "김용태",
        "address": {
          "location": "서울특별시 금천구 가산디지털 1로 1421",
          "locationDetail": "1503호",
          "postNumber": "08506"
        },
        "typeOfBusiness": "정보통신업 도매 및 소매업",
        "itemsOfBusiness": "소프트웨어 개발 및 공급업 전자상거래 소매업",
        "businessLicenseWebPath": "https://test",
        "taxInvoiceEmail": "ytkim@adpilot.co.kr"
      }
    }
  }
  await AdminAxios('GET', USER_INFO +SLASH + id)
    .then((response) => {
      const {data, statusCode} = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 사용자 정보 수정
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function updateUser(userInfo) {
  let returnVal = null;
  await AdminAxios('PUT', USER_MANAGE_URL, userInfo)
    .then((response) => {
      const { statusCode } = response;
      if(statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 최신 약관 정보 가져오기 api
 * @returns {Promise<null>}
 */
export async function selPolicyLatestTerms() {
  let returnVal = null;
  await AdverAxios('GET', TERMS_INFO, null)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = data;
      } else {
        returnVal = null;
      }
      // eslint-disable-next-line no-restricted-globals
    }).catch((e) => {location.replace('/500.js')})
  return returnVal;
}

/**
 * 회원 가입 api
 * @param userInfo
 * @returns {Promise<*>}
 */
export async function signUp(userInfo) {
  let returnVal = null;
  let param = {
    ...userInfo,
    isAgreedByOperationTerms: userInfo.isAgreedByOperationTerms ? 'Y' : 'N',
  isAgreedByPrivacyTerms: userInfo.isAgreedByPrivacyTerms ? 'Y' : 'N',
  isAgreedByServiceTerms: userInfo.isAgreedByServiceTerms ? 'Y' : 'N'
}
  await AdverAxios('POST', SIGNUP_URL, param)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200){
        returnVal = true;
      }else{
        returnVal = false;
      }
    }).catch((e) => returnVal = false)
  return responseFormatMessage(returnVal);
}

/**
 * 아이디 중복 검사 api
 * @param userId
 * @returns {Promise<null>}
 */
export async function selValidUserId(username) {
  let returnVal = null;
  await AdverAxios('GET', VALID_USERID+SLASH+username, null)
    .then((response) => {
      const { data, statusCode, message } = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = message
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 아이디 찾기 API
 * @param userId
 * @returns {Promise<null>}
 */
export async function selFindUserId(userInfo) {
  let returnVal = null;
  await AdverAxios('POST', FIND_USERID, userInfo)
    .then((response) => {
      const { data, statusCode, message } = response;
      if (statusCode === 200) {
        returnVal = data;
      } else {
        returnVal = message;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 비밀번호 변경
 * @param userInfo
 * @returns {Promise<null>}
 */
export async function selChangePassword(userInfo) {
  let returnVal = null;
  await AdverAxios('POST', CHANGE_PASSWORD, userInfo)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = true
      } else {
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 광고주 검색 api
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selKeywordUser(keyword) {
  let returnVal = null;
  if(isInit){
    return [{
      id:"1",
      adverName: "용태팡",
      username: "ytkim_advert",
      staffName: "김용태",
    }]
  }
  await AdminAxios('GET', USER_KEYWORD_SEARCH + '?keyword=' + keyword, null)
  .then((response) => {
    const { data, statusCode } = response;
    if(statusCode ===200){
      returnVal = data
    }else{
      returnVal = []
    }
  }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 사용자 정보 가져오기 by userId
 * @param userId
 * @returns {Promise<null>}
 */
export async function selUserByUserId(username) {
  let returnVal = null;
  await AdverAxios('GET', BY_USER_INFO + SLASH + username, null)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode ===200){
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 통장 사본 및 사업자 등록증 등록
 * @param resourceType
 * @returns {Promise<false>}
 */
export async function accountFileUpload(data,resourceType) {
  let returnVal = null;
  await AxiosFile('POST', UPLOAD_URL + resourceType, data).then(response => {
      const { data, statusCode } = response;
      if(statusCode === 200){
        returnVal = data;
      } else {
        returnVal = false;
      }
    })
    .catch((e) => returnVal = false)
  return returnVal;
}

export async function selUserMyPageInfo(id) {
  let returnVal = null;
  await AdverAxios('GET', MY_PAGE_INFO +SLASH + id)
    .then((response) => {
      const { data, statusCode } = response;
      if (statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function updateMyPageUser(userInfo) {
  let returnVal = null;
  await AdverAxios('PUT', ACTION_URL, userInfo)
    .then((response) => {
      const { data, statusCode } = response;
      if(statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 통장 사본 및 사업자 등록증 조회
 * @param filePath
 * @returns {Promise<false>}
 */




