import {AdminAxios} from "../../../common/Axios";

const POINTALL = '/adver/payments/point/histories';
const ADVERPOINTALL = '/payments/point/';
const ADDHISTORY = '/adver/payments/point/add-history';
/**
 * 전체 광고주 결제 정보 요청
 * @returns {Promise<null>}
 */
export async function pointAllListRequest( param ) {
  let returnVal = null;
  await AdminAxios('POST', POINTALL, param)
    .then((response) => {
      const {responseCode, data} = response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 특정 광고주 잔액 요청
 * @returns {Promise<null>}
 */
export async function adverPointeRquest( userId ) {
  let returnVal = null;
  await AdminAxios('GET', ADVERPOINTALL+userId, null)
    .then((response) => {
      const {responseCode, data} = response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

/**
 * 이력 추가
 * @returns {Promise<null>}
 */
export async function addHistory( param ) {
  let returnVal = null;
  await AdminAxios('POST', ADDHISTORY, param)
    .then((response) => {
      console.log("addHistory!!", response);
      const {responseCode, data} = response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}