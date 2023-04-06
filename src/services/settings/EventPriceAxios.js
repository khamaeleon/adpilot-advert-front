import {AdminAxios} from "../../common/Axios";

const ACTION_URL = '/adver/setting'
const PRICE_EVENT = '/price'
const PRICE_LIST= '/price/list'


/**
 * 이벤트 단가 관리 광고주 리스트
 * @param keyword
 * @returns {Promise<null>}
 */
export async function selAdverPriceEventList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + PRICE_LIST ,keyword)
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

/**
 * 이벤트 단가 관리 상세 리스트
 * @param username
 * @returns {Promise<null>}
 */
export async function selPriceEventList(userId) {
  let returnVal = null;
  await AdminAxios('GET', ACTION_URL + PRICE_EVENT +'/'+userId)
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

/**
 * 이벤트 단가 관리 등록
 * @param priceEventInfo
 * @returns {Promise<null>}
 */
export async function resistPriceEvent(priceEventInfo) {
  let returnVal = null;
  await AdminAxios('POST', ACTION_URL + PRICE_EVENT ,priceEventInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===201){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 이벤트 단가 관리 수정
 * @param priceEventInfo
 * @returns {Promise<null>}
 */
export async function updatePriceEvent(priceEventInfo) {
  let returnVal = null;
  await AdminAxios('PUT', ACTION_URL + PRICE_EVENT ,priceEventInfo)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = true
      }else{
        returnVal = false
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
