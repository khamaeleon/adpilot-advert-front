import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/pixel'
const ADVER_LIST ='/manage'

/**
 * 광고주 리스트 픽셀 관리
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selAdverPixelList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + ADVER_LIST ,keyword)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selAdverPixelDetailList(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + ADVER_LIST +'/'+userId ,null)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}

export async function selPixelInfoList(pixelId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL +'/'+pixelId ,null)
    .then((response) => {
      const {data, responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};